"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface SubCategory {
  _id: string;
  name: string;
  // لو API بيرجع صورة حطها هنا
  // image: string;
}

export default function CategorySubCategoriesByCategoryId({ categoryId }: { categoryId: string }) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubCategories() {
      try {
        const res = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        // حسب الـ API: res.data.data فيها الـ array
        setSubCategories(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubCategories();
  }, [categoryId]);

  if (loading) return <p className="text-center">Loading subcategories...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
      {subCategories.length > 0 ? (
        subCategories.map((sub) => (
          <div
            key={sub._id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold">{sub.name}</h2>
            {/* لو فيه صورة */}
            {/* <img src={sub.image} alt={sub.name} className="w-full h-32 object-cover mt-2" /> */}
          </div>
        ))
      ) : (
        <p className="text-center col-span-full">No subcategories found</p>
      )}
    </div>
  );
}
