export default async function selectedproduct(id : string) {
    // Fetch the product details
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    const {data} = await res.json();
    return data;
}
