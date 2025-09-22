"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

type SubcategoryType = {
  _id: string;
  name: string;
  description?: string;
  // لو فيه خصائص إضافية زي الصور او slug وغيرهم
};

export default function SubcategoryDetails() {
  const params = useParams();
  const subId = params.id;  // تأكد ان اسم البرام "id" مطابق للي في ملف [id]/page.tsx

  const [sub, setSub] = useState<SubcategoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!subId) return;

  async function fetchSub() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories/${subId}`
      );
      setSub(res.data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching subcategory:", err);
        setError(err.message || "حدث خطأ في جلب المعلومات");
      } else {
        console.error("Unknown error fetching subcategory:", err);
        setError("حدث خطأ غير معروف");
      }
    } finally {
      setLoading(false);
    }
  }

  fetchSub();
}, [subId]);


  if (loading) {
    return <p className="text-center mt-10">Loading subcategory...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!sub) {
    return <p className="text-center mt-10">Subcategory not found</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{sub.name}</h1>
      {sub.description ? (
        <p className="text-gray-700">{sub.description}</p>
      ) : (
        <p className="text-gray-500">لا يوجد وصف متاح</p>
      )}
      {/* لو فيه صورة او خصائص اخرى */}
    </div>
  );
}
