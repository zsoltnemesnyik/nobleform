"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { CartItem } from "@/models/types";

type Props = {
  product: Omit<CartItem, "quantity">;
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();

  function handleClick() {
    addItem(product);
    console.log("Added to cart:", product);
  }

  return (
    <Button
      onClick={handleClick}
      className="rounded-full bg-black px-6 py-3 text-white hover:opacity-90"
    >
      Add to Inquiry Cart
    </Button>
  );
}