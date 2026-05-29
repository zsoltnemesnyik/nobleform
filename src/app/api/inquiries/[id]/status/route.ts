// src/app/api/inquiries/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

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

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();

    if (!["NEW", "REPLIED", "CLOSED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      status: updatedInquiry.status,
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
