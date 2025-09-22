import selectedproduct from '@/api/selectedproduct';
import Details from '@/app/_components/Details/Details';
import Singleproduct from '@/app/_components/Singleproduct/Singleproduct';
import getRelatedProducts from '@/ProductCategoryActions/relatedProduct.action';
import { ProductType } from '@/types/product.types';
import React from 'react';

export default async function ProductDetails({ params } : {params : Promise<{id : string}>}) {
  const { id } = await params;

  const data = await selectedproduct(id)

  if(!data) return <h1>No Products here</h1>

  const RelatedProducts = await getRelatedProducts(data.category._id) 
  return (
    <>
      <Details data={data}/>
      <div className="container w-[80%] mx-auto my-12">
          <div className='flex flex-wrap'>
          {RelatedProducts.data.map((currentproduct: ProductType) => (
          <Singleproduct key={currentproduct.id} product={currentproduct}/>
          ))}
          </div>
      </div>
    </>

  );
}
