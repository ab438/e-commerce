"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: number;
  imageCover: string;
  category: { name: string };
}

interface CartItem {
  _id: string;
  product: Product;
  count: number;
  price: number;
}

interface Order {
  _id: string;
  cartItems: CartItem[];
  totalOrderPrice: number;
  createdAt: string;
  user: { _id: string; name: string };
}

interface OrdersResponse {
  results: number;
  metadata: { currentPage: number; numberOfPages: number; limit: number; nextPage: number | null };
  data: Order[];
}

export default function AllOrders() {
  const userId = "68bfc1122710881fd4445f5e"; // حط هنا الـ userId الصحيح
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (page: number) => {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/?page=${page}`);
      if (!res.ok) throw new Error("حدث خطأ أثناء جلب الطلبات");
      const json: OrdersResponse = await res.json();

      const userOrders = json.data.filter((order) => order.user?._id === userId);
      setOrders((prev) => [...prev, ...userOrders]);
      setTotalPages(json.metadata.numberOfPages);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("حدث خطأ غير معروف");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading && orders.length === 0)
    return <p className="text-center my-20 text-emerald-600 animate-pulse">جارٍ التحميل...</p>;
  if (error) return <p className="text-center my-20 text-red-500">{error}</p>;
  if (orders.length === 0) return <p className="text-center my-20 text-gray-500">لا توجد طلبات حتى الآن</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-600">All Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-6 rounded shadow-md bg-white">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <p><strong>Num Order:</strong> {order._id}</p>
            <p><strong>Date Order:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total Price:</strong> {order.totalOrderPrice?.toFixed(2) ?? "0.00"} EGP</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.cartItems.map((item) => (
              <div key={item._id} className="border rounded p-4 flex flex-col items-center">
                {item.product.imageCover ? (
                  <Image
                    width={150}
                    height={150}
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-[150px] h-[150px] bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <p className="font-bold mt-2">{item.product.title}</p>
                <p className="text-gray-500">{item.product.category?.name ?? "No Category"}</p>
                <p className="mt-1">{item.count} × {item.price} EGP</p>
                <p className="font-semibold mt-1">
                  المجموع: {(item.count * item.price).toFixed(2)} EGP
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {currentPage < totalPages && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
