"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { items, removeItem } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-semibold">Your Inquiry Cart</h1>

        <p className="mt-4 text-neutral-600">Your cart is currently empty.</p>

        <Button asChild className="mt-8">
          <Link href="/products">Browse Products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Inquiry Cart</h1>

        <p className="text-sm text-neutral-500">{totalItems} items</p>
      </div>

      <div className="mt-12 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 rounded-2xl border p-4"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={120}
              height={120}
              className="rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="text-xl font-medium">{item.name}</h2>

              <p className="mt-1 text-neutral-500">€{item.price}</p>

              <p className="mt-2 text-sm text-neutral-400">
                Quantity: {item.quantity}
              </p>
            </div>

            <Button variant="outline" onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <Button asChild size="lg">
          <Link href="/inquiry">Proceed to Inquiry</Link>
        </Button>
      </div>
    </main>
  );
}
