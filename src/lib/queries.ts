import prisma from "@/lib/prisma";
import { InquiryStatus } from "@/lib/constants";

export async function getProducts() {
  return prisma.product.findMany({
    where: { isAvailable: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isFeatured: true, isAvailable: true },
    include: { category: true },
  });
}

export async function getInquiries() {
  return prisma.inquiry.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getInquiryById(id: string) {
  return prisma.inquiry.findUnique({
    where: {
      id,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  return prisma.inquiry.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
  });
}