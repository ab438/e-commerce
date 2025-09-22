"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function getloggedusercart() {
  console.log("getloggedusercart called")   // ✅ check
  const token = await getMyToken()
  console.log("token =>", token)            // ✅ check

  if (!token) {
    throw new Error("please login to be able to see cart")
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    }
  })
  console.log("response =>", res)           // ✅ check

  const payload = await res.json();
  console.log("payload =>", payload)        // ✅ check

  return payload
}
