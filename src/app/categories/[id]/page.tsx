"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import CategorySubCategoriesByCategoryId from "@/app/getallsubcategory/getallsub";
import SubcategoriesList from "@/app/Get All SubCategories On Category/Get All SubCategories";

// تعريف نوع واضح للكيتيجوري
interface CategoryType {
  _id: string;
  name: string;
  image: string;
  description?: string;
}

export default function CategoryDetails() {
  const params = useParams();
  const id = params.id as string;
  const [category, setCategory] = useState<CategoryType | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => setCategory(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!category) {
    return (
      <div className="spinner h-screen flex justify-center items-center"></div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {category.image && (
        <div className="relative h-60 w-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mt-4">{category.name}</h1>
      {category.description && <p className="mt-2">{category.description}</p>}
      <CategorySubCategoriesByCategoryId categoryId={id} />
      <SubcategoriesList categoryId={id} />
    </div>
  );
}
