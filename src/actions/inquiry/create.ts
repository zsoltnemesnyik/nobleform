"use server";

import prisma from "@/lib/prisma";

import { inquirySchema } from "@/lib/validations/inquiry";
import { InquiryPayload } from "@/models/types";

export async function createInquiry(
    payload: InquiryPayload
) {
    // zod validation
    const validated = inquirySchema.safeParse(
        payload.customer
    );

    if (!validated.success) {
        return {
            success: false,
            error: "Invalid form data",
        };
    }

    // empty cart check
    if (payload.items.length === 0) {
        return {
            success: false,
            error: "Cart is empty",
        };
    }

    try {
        const inquiry = await prisma.inquiry.create({
            data: {
                customerName: validated.data.name,
                customerEmail: validated.data.email,
                customerPhone: validated.data.phone,
                message: validated.data.message,

                items: {
                    create: payload.items.map((item) => ({
                        quantity: item.quantity,

                        product: {
                            connect: {
                                id: item.id,
                            },
                        },
                    })),
                },
            },

            include: {
                items: true,
            },
        });

        return {
            success: true,
            inquiry,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Something went wrong",
        };
    }
}