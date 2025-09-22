"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getWishlist } from "@/utils/wishlistApi";
import { ProductType } from "@/types/product.types";

interface WishlistContextType {
  wishlist: ProductType[];
  setWishlist: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  setWishlist: () => {},
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [wishlist, setWishlist] = useState<ProductType[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    }
    return [];
  });

  useEffect(() => {
    const token = (session?.user as { token?: string })?.token;
    if (status !== "authenticated" || !token) return;

    const fetchWishlist = async () => {
      try {
        const data = await getWishlist(token);
        if (data?.wishlist) {
          setWishlist(data.wishlist);
          localStorage.setItem("wishlist", JSON.stringify(data.wishlist));
        }
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };

    fetchWishlist();
  }, [session, status]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
