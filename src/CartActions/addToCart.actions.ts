"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function AddToCart(id: string) {
  try {
    const token = await getMyToken();
    if (!token) {
      return { status: "error", message: "Please login to be able to add products" };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const payload = await res.json();

    if (res.ok && payload.status === "success") return payload;
    return { status: "error", message: payload.message || "Something went wrong" };
  } catch (err) {
    console.error(err);
    return { status: "error", message: "Unexpected error occurred" };
  }
}
