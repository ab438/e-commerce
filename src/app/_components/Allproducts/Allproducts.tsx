import getallproducts from '@/api/products.api'
import React from 'react'
import Singleproduct from '../Singleproduct/Singleproduct'
import { ProductType } from '@/types/product.types'

export default async function Allproducts() {
    const data = await getallproducts()
  return (
    <>
        <div className="container w-[80%] mx-auto my-12">
            <div className='flex flex-wrap'>
            {data.map((currentproduct: ProductType) => (
            <Singleproduct key={currentproduct.id} product={currentproduct}/>
            ))}
            </div>
        </div>
    </>
  )
}
