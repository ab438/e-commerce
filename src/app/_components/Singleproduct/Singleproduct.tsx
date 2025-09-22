"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/product.types";
import AddBtn from "../AddBtn/AddBtn";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/context/WishlistContext";
import { addToWishlist, removeFromWishlist } from "@/utils/wishlistApi";
import { toast } from "sonner";

interface ExtendedUser {
  name?: string;
  email?: string;
  role?: string;
  token?: string;
}

interface ExtendedSession {
  user?: ExtendedUser;
  accessToken?: string;
}

export default function Singleproduct({ product }: { product: ProductType }) {
  const { data: rawSession } = useSession();
  const session = rawSession as ExtendedSession | null;

  const { wishlist, setWishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  async function handleWishlist() {
    if (!session?.user || !session.accessToken) {
      toast.error("You must be logged in to modify your wishlist");
      return;
    }

    const token = session.accessToken;

    try {
      if (isInWishlist) {
        await removeFromWishlist(product.id, token);
        setWishlist(wishlist.filter((item) => item.id !== product.id));
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(product.id, token);
        setWishlist([...wishlist, product]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="xl:w-1/5 lg:w-1/4 md:w-1/2 w-full">
      <div className="prod p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg bg-white dark:bg-gray-900">
        <Card className="gap-2 p-2 border border-gray-100 hover:border-emerald-500 transition-colors duration-300 rounded-lg overflow-hidden">
          <div className="relative overflow-hidden group rounded-md cursor-pointer">
            <Link href={`/products/${product.id}`}>
              <Image
                width={500}
                height={500}
                src={product.imageCover}
                alt={product.title}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
              />
            </Link>
            <Button
              onClick={handleWishlist}
              className={`absolute top-2 right-2 rounded-full p-2 text-white transition-all duration-300 ${
                isInWishlist ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              <i className="fas fa-heart"></i>
            </Button>
          </div>

          <CardContent className="py-2">
            <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">{product.title}</p>
            <p className="text-emerald-600 font-bold">{product.price} EGP</p>
            <p className="text-yellow-500">
              {product.ratingsAverage} <i className="fas fa-star"></i>
            </p>
          </CardContent>

          <CardFooter className="pt-2">
            <AddBtn
              id={product.id}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-400 hover:from-green-400 hover:to-emerald-500 transition-all duration-500"
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
