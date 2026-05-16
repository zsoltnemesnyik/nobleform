"use client";

import { useCart } from "@/context/cart-context";

export default function CartCount() {
  const { items, mounted } = useCart();

  if (!mounted) return <>0</>;

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return <>{totalItems}</>;
}