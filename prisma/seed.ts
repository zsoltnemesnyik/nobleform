import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!, // direkt (5432), nem pooler
});

const prisma = new PrismaClient({ adapter });

// ... a többi marad ugyanúgy

async function main() {
  // törlés (újrafuttatható seedhez)
  await prisma.inquiryItem.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // kategóriák
  const chairs = await prisma.category.create({
    data: {
      name: "Chairs",
      slug: "chairs",
    },
  });

  const tables = await prisma.category.create({
    data: {
      name: "Tables",
      slug: "tables",
    },
  });

  const lighting = await prisma.category.create({
    data: {
      name: "Lighting",
      slug: "lighting",
    },
  });

  // termékek
  await prisma.product.createMany({
    data: [
      {
        name: "Oak Lounge Chair",
        slug: "oak-lounge-chair",
        description: "Solid oak lounge chair with premium wool upholstery.",
        price: 890,
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        material: "Oak, Wool",
        dimensions: "72 × 82 × 78 cm",
        categoryId: chairs.id,
      },
      {
        name: "Walnut Dining Chair",
        slug: "walnut-dining-chair",
        description: "Elegant walnut dining chair with soft leather seat.",
        price: 520,
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800",
        material: "Walnut, Leather",
        dimensions: "48 × 52 × 90 cm",
        categoryId: chairs.id,
      },
      {
        name: "Minimal Coffee Table",
        slug: "minimal-coffee-table",
        description: "Low-profile oak coffee table with clean lines.",
        price: 640,
        imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
        material: "Oak",
        dimensions: "120 × 60 × 35 cm",
        categoryId: tables.id,
      },
      {
        name: "Stone Dining Table",
        slug: "stone-dining-table",
        description: "Premium stone dining table with steel base.",
        price: 1800,
        imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800",
        material: "Stone, Steel",
        dimensions: "200 × 100 × 75 cm",
        categoryId: tables.id,
      },
      {
        name: "Pendant Light",
        slug: "pendant-light",
        description: "Modern pendant light with soft ambient glow.",
        price: 220,
        imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a35068dab?w=800",
        material: "Glass, Metal",
        dimensions: "Ø 40 cm",
        categoryId: lighting.id,
      },
      {
        name: "Floor Lamp",
        slug: "floor-lamp",
        description: "Minimal floor lamp for warm interior lighting.",
        price: 310,
        imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
        material: "Steel",
        dimensions: "160 cm height",
        categoryId: lighting.id,
      },
    ],
  });

  console.log("🌱 Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });