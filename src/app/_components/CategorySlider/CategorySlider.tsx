import getallcategory from '@/api/Allcategory'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper'

export default async function CategorySlider() {
  const data = await getallcategory()
  return (
    <>
      <CategorySwiper data={data}/>
    </>
  )
}
