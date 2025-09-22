"use client"
import React, { useContext, useEffect, useState } from 'react'
import getloggedusercart from '@/CartActions/getUserCart.action'
import RemoveitemFromCart from '@/CartActions/removeCartitem'
import { toast } from 'sonner'
import UpadteCartQuantity from '@/CartActions/updateCartQuantity.action'
import { Button } from '@/components/ui/button'
import ClearCart from '@/CartActions/clearCartitem.action'
import { cartcontext } from '@/context/CartContext'
import { CartProductType } from '@/types/cart.type'
import Link from 'next/link';
import Image from 'next/image'

export default function Cart() {
  const [products, setproducts] = useState<CartProductType[]>([])
  const [isLoading, setLoading] = useState(true)
  const [removeDetails, setremoveDetails] = useState(false)
  const [updatedisaple, setupdatedisaple] = useState(false)
  const [updateloading, setupdateloading] = useState(false)
  const [currentId, setcurrent] = useState("")
    const context = useContext(cartcontext)
    if(!context) throw new Error("Not Exist")
    const {numbercartitem, setnumbercartitem} = context
  const [total , settotal] = useState(0)
  const [cartId, setcartId] = useState("")

  async function updateproduct(id:string, count : string, sign : string) {
    setcurrent(id)
    setupdatedisaple(true)
    setupdateloading(true)
    setremoveDetails(true)
    const res = await UpadteCartQuantity(id,count)
    if(res.status === "success"){
      setproducts(res.data.products);
      toast.success("Quantity updated successfully", { position : "top-center", duration : 2000 })
      if(sign === "+") setnumbercartitem(numbercartitem + 1)
      else if(sign === "-") setnumbercartitem(numbercartitem - 1)
      getusercart()
      setupdateloading(false)
      setupdatedisaple(false)
      setremoveDetails(false)
    } else {
      toast.error("Can't update the quantity", { position : "top-center", duration : 2000 })
      setupdateloading(false)
      setupdatedisaple(false)
      setremoveDetails(false)
    }
  }

  async function deleteproduct(id:string){
    setremoveDetails(true)
    setupdatedisaple(true)
    const res = await RemoveitemFromCart(id)
    if(res.status === "success"){
      setproducts(res.data.products);
      toast.success("Product deleted successfully", { position : "top-center", duration : 2000 });
      const sum = res.data.products.reduce((acc: number, item: CartProductType) => acc + item.count, 0)
      getusercart()
      setnumbercartitem(sum)
      setremoveDetails(false)
      setupdatedisaple(false)
    } else {
      toast.error("Can't delete this product now!", { position : "top-center", duration : 2000 });
      setremoveDetails(false)
      setupdatedisaple(false)
    }
  }

  async function getusercart() {
    try{
      const res = await getloggedusercart()
      if(res.status === "success"){
        settotal(res.data.totalCartPrice)
        setcartId(res.data._id)
        setproducts(res.data.products)
        setLoading(false)
      }
    } catch(err) {
      console.log(err);
      setLoading(false)
    }
  }

  async function clear() {
    const res = await ClearCart()
    if(res.message === "success") setproducts([])
  }

  useEffect(() => { getusercart() }, [])

  if(isLoading){
    return <div className="h-screen flex justify-center items-center text-emerald-600 text-2xl animate-pulse">Loading Cart...</div>
  }

  return (
    <>
      {products.length > 0 ? (
        <div className='w-11/12 md:w-3/4 mx-auto my-12'>
          <div className='flex justify-end mb-4'>
            <Button onClick={clear} className='bg-red-500 hover:bg-red-700 text-white rounded-xl shadow-lg transition-all duration-300'>Clear Cart</Button>
          </div>
          <div className="overflow-x-auto shadow-2xl rounded-2xl backdrop-blur-sm bg-white/80 p-6 animate-fadeIn">
            <h1 className='text-center text-3xl font-bold text-emerald-600 mb-6'>Total Cart Price: {total} EGP</h1>
            <table className="w-full text-left text-gray-700 border-collapse">
              <thead className="bg-emerald-100 rounded-xl">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="bg-white border-b hover:bg-gray-50 transition-all duration-300">
                    <td className="p-4 relative w-24 h-24">
                  <Image
                      src={product.product.imageCover}
                      alt={product.product.title}
                      fill
                      className="object-contain"
                    />                    </td>
                    <td className="px-6 py-4 font-semibold">{product.product.title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button disabled={updatedisaple} onClick={() => updateproduct(product.product.id, `${product.count - 1}`, "-")} className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">-</button>
                        <span className="mx-2">{product.product.id === currentId ? (updateloading ? <i className='fas fa-spinner fa-spin'></i> : product.count) : product.count}</span>
                        <button disabled={updatedisaple} onClick={() => updateproduct(product.product.id, `${product.count + 1}`, "+")} className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">+</button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">{product.price * product.count} EGP</td>
                    <td className="px-6 py-4">
                      <button disabled={removeDetails} onClick={() => deleteproduct(product.product.id)} className='text-red-500 font-bold hover:text-red-700 transition-colors duration-300'>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href={`/checkout/${cartId}`}>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white w-full mt-6 p-4 font-bold rounded-xl shadow-lg transition-all duration-300'>Proceed to Checkout</Button>
          </Link>
        </div>
      ) : (
        <h1 className='text-center text-3xl text-red-500 font-bold my-12'>No products added yet!</h1>
      )}
    </>
  )
}
