import { getProducts } from "@/lib/queries";
import { ProductCard } from "@/components/products/productCard";

export const metadata = {
  title: "Products — NobleForm",
};

export default async function PageProducts() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#faf7f4]">
      {/* Header */}
      <section className="px-6 pt-24 pb-16 max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#9a8c7e] mb-4">
          Collection
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-[#2c2420] leading-tight">
          Handcrafted
          <br />
          <em className="not-italic text-[#8b6914]">for the discerning.</em>
        </h1>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
