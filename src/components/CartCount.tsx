"use client";

import { useCart } from "@/context/cart-context";

export default function CartCount() {
  const { items } = useCart();

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return <>{totalItems}</>;
}