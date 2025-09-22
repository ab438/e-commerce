"use client";
import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  interface WishlistProduct {
  id: string;
  title: string;
  price: number;
  imageCover: string;
  // أي خصائص إضافية لو موجودة
}

  const { wishlist, setWishlist } = useWishlist();

  const handleRemove = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    // هنا لو عايز تعمل remove من API كمان، ممكن تنادي removeFromWishlist(id, token)
  };

  if (wishlist.length === 0) {
    return <div className="text-center mt-10">No products in your wishlist.</div>;
  }

  return (
   <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlist.map((product: WishlistProduct) => (
        <div key={product.id} className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
          <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
            <div className="w-full h-48 relative">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h2 className="font-semibold text-md line-clamp-2">{product.title}</h2>
              <p className="text-emerald-600 font-bold mt-2">{product.price} EGP</p>
            </div>
          </Link>
          <Button
            className="m-3 w-[calc(100%-0.75rem)] bg-red-500 hover:bg-red-600 text-white"
            onClick={() => handleRemove(product.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>


  );
}
