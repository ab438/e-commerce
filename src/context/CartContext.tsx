"use client";

import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
import getloggedusercart from "@/CartActions/getUserCart.action";

// النوع اللي هيتحط في الـ context
interface CartContextType {
  numbercartitem: number;
  setnumbercartitem: Dispatch<SetStateAction<number>>;
}

// إنشاء الـ context
export const cartcontext = createContext<CartContextType | undefined>(undefined);

// Props للـ Provider
interface CartContextProviderProps {
  children: ReactNode;
}

// الـ Provider
export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numbercartitem, setnumbercartitem] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getloggedusercart();
      console.log("cart response", res);

      if (res.status === "success") {
        let sum = 0;
        // هنا تأكد إن المسار صحيح
        const products = res.data?.products || res.data?.data?.products || [];
        products.forEach((item: { count: number }) => {
          sum += item.count;
        });
        setnumbercartitem(sum);
      }
    } catch (err) {
      console.log("error in getUserCart", err);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <cartcontext.Provider value={{ numbercartitem, setnumbercartitem }}>
      {children}
    </cartcontext.Provider>
  );
}
