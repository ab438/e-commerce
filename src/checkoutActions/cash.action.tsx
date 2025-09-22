"use client";

import React, { useContext, useState, useEffect, useCallback } from "react";
import { cartcontext } from "@/context/CartContext";
import getloggedusercart from "@/CartActions/getUserCart.action";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import loading from './../app/products/loading';

interface CartProduct {
  count: number;
  // أضف أي خصائص أخرى موجودة في المنتج
}

interface CartData {
  _id: string;
  products: CartProduct[];
}

export default function CashCheckout() {
  const context = useContext(cartcontext);
  if (!context) throw new Error("Not Exist");
  const { setnumbercartitem } = context;

  const [cartId, setCartId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // جلب بيانات الكارت
  const getUserCart = useCallback(async () => {
    try {
      const res = await getloggedusercart();
      if (res.status === "success") {
        const data: CartData = res.data;
        setCartId(data._id);
        const totalItems = data.products.reduce(
          (sum, p) => sum + p.count,
          0
        );
        setnumbercartitem(totalItems);
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء جلب الكارت");
    } finally {
      setLoading(false);
    }
  }, [setnumbercartitem]);

  useEffect(() => {
    getUserCart();
  }, [getUserCart]);

  const handleCashCheckout = async () => {
    if (!cartId) return toast.error("لا يوجد كارت صالح للدفع");

    setCheckoutLoading(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout/cash`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: cartId,
            shippingAddress: {
              details: "عنوانك هنا",
              city: "Cairo",
              phone: "010XXXXXXX",
            },
          }),
        }
      );
      const data = await res.json();
      console.log("Cash order created:", data);
      toast.success(
        "تم إنشاء الطلب بنجاح، سيتم الدفع كاش عند الاستلام"
      );
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء إنشاء الطلب");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <Link href="/allorders">
        <Button
          onClick={handleCashCheckout}
          disabled={checkoutLoading}
          className="bg-green-600 text-white w-[100%] p-4 hover:bg-green-700"
        >
          {checkoutLoading ? "loading" : "Pay Cash"}
        </Button>
      </Link>
    </div>
  );
}
