"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";

type BrandType = {
  name: string;
  description: string;
  image?: string;
  images?: string[];
};

export default function BrandDetails() {
  const params = useParams();
  const { id } = params;
  const [brand, setBrand] = useState<BrandType | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => setBrand(res.data.data))
      .catch((err) => console.error("Error fetching brand:", err));
  }, [id]);

  if (!brand) return <p className="text-center mt-10">Loading...</p>;

  // نجيب الصورة بشكل ديناميكي
  const brandImage = brand.image || (brand.images && brand.images[0]) || "";

  return (
    <div className="max-w-md mx-auto p-4">
      {brandImage && (
    <div className="relative h-60 w-full mb-4 rounded overflow-hidden">
        <Image
          src={brandImage}
          alt={brand.name}
          fill
          className="object-cover"
        />
      </div>
    )}
      <h1 className="text-2xl font-bold mt-2">{brand.name}</h1>
      <p className="mt-2 text-gray-700">{brand.description}</p>
    </div>
  );
}
