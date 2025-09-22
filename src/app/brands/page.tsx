"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

type Brand = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
};

export default function BrandsList() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true);
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(res.data.data || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching brands:", err);
      }
    }
    fetchBrands();
  }, []);

  if (loading) return <div className="spinner h-screen flex justify-center items-center"></div>;
  if (brands.length === 0) return <p className="text-center my-4 text-red-500 font-semibold">لا توجد ماركات متاحة</p>;

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600">Brands</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group relative block border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            {brand.image && (
              <div className="overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  className="h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  width={300}
                  height={200}
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                {brand.name}
              </h3>
              {brand.description && (
                <p className="text-gray-600 mt-1 text-sm line-clamp-2">{brand.description}</p>
              )}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
