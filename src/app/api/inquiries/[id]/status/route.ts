// src/app/api/inquiries/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateInquiryStatus } from "@/lib/queries";
import { createClient } from "@/utils/supabase/server";
import { INQUIRY_STATUSES } from "@/lib/constants";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing inquiry ID" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();

    if (!INQUIRY_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await updateInquiryStatus(id, status);

    return NextResponse.json({ 
      success: true, 
      status 
    });

  } catch (error) {
    console.error("Update status error:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error occurred";

    return NextResponse.json({ 
      error: "Failed to update status",
      details: errorMessage 
    }, { status: 500 });
  }
}