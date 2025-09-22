"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export default function SubcategoriesList({ categoryId }: { categoryId: string }) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const res = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        setSubcategories(res.data.data);
      } catch (error) {
        console.error(error);
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSubcategories();
  }, [categoryId]);

  if (loading) return <p className="text-center">جارى التحميل...</p>;

  if (!subcategories.length)
    return <p className="text-center">لا توجد تصنيفات فرعية لهذه الفئة</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {subcategories.map((sub) => (
        <div
          key={sub._id}
          className="border rounded-lg p-4 hover:shadow-md transition"
        >
          <h3 className="text-lg font-bold">{sub.name}</h3>
          <p className="text-gray-500">{sub.slug}</p>
        </div>
      ))}
    </div>
  );
}
