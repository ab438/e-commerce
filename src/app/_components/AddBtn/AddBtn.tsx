"use client";
import AddToCart from '@/CartActions/addToCart.actions';
import { Button } from '@/components/ui/button';
import { cartcontext } from '@/context/CartContext';
import React, { useContext } from 'react';
import { toast } from 'sonner';

interface AddBtnProps {
  id: string;
  className?: string; // أضفناها هنا
}

export default function AddBtn({ id, className }: {id: string,className?:string}) {
  const context = useContext(cartcontext);
  if (!context) throw new Error("CartContext not provided");

  const { numbercartitem, setnumbercartitem } = context;

  async function checkAddProduct(id: string) {
    const res = await AddToCart(id);
    if (res.status === "success") {
      toast.success("Product Added Successfully", {
        position: "top-center",
        duration: 2000,
      });
      setnumbercartitem(prev => prev + 1); // الآمن
    } else {
      toast.error(res.message || "Something went wrong", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <Button 
      className={`cursor-pointer ${className}`} // استخدم الـ className هنا
      onClick={() => checkAddProduct(id)}
    >
      Add To Cart
    </Button>
  );
}
