"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesList() {
  interface Category {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
        Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="group relative block border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="overflow-hidden">
              <Image
                src={cat.image || "/placeholder.png"} // لو الصورة ممكن تكون undefined
                alt={cat.name}
                width={400}
                height={200}
                className="h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
