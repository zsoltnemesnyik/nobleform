import { getProductBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/products/AddToCartButton";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function PageProductDetail({ params }: Props) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) return notFound();

    return (
        <main className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-12 md:grid-cols-2">
                {/* image */}
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={400}
                    className="aspect-square w-full rounded-lg object-cover"
                />

                {/* content */}
                <div className="space-y-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                        {product.category.name}
                    </p>

                    <h1 className="text-4xl font-semibold">{product.name}</h1>

                    <p className="text-2xl font-medium">€{product.price}</p>

                    <p className="text-neutral-600 leading-7">{product.description}</p>

                    <div className="space-y-2 text-sm text-neutral-600">
                        <p>
                            <span className="font-medium text-black">Material:</span>{" "}
                            {product.material}
                        </p>

                        <p>
                            <span className="font-medium text-black">Dimensions:</span>{" "}
                            {product.dimensions}
                        </p>
                    </div>

                    <AddToCartButton
                        product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            imageUrl: product.imageUrl,
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
