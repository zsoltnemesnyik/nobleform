import Link from "next/link";
import Image from "next/image";
import { Category, Product } from "@prisma/client";

type ProductWithCategory = Product & { category: Category };

export function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="aspect-4/5 bg-[#f5f0eb] overflow-hidden mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-[#9a8c7e] uppercase tracking-widest">
          {product.category.name}
        </p>
        <h3 className="font-serif text-lg text-[#2c2420] group-hover:text-[#8b6914] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-[#6b5e52]">
          From €{product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
