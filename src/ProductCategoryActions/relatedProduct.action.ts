"use server"
export default async function getRelatedProducts(cartId : string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${cartId}`)
    const payload = await res.json()
    return payload
}