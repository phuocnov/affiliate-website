'use client';
import useProduct from "@/hooks/admin/useProduct";
import { ItemCard } from "./components/ItemCard";


export default function Home() {
  const { products } = useProduct();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Product</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ItemCard item={product} />
        ))}
      </div>
    </main>
  );
}
