import { Product } from "@/generated/prisma/client";

export type CartItem = Pick<Product, "id" | "name" | "price" | "imageUrl"> & {
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
};