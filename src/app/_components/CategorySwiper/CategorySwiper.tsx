"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules'
import { CategoryType } from '@/types/category.type';
import Image from 'next/image';

interface Props {
  data: CategoryType[];
}

export default function CategorySwiper({ data }: Props) {
  return (
    <div className='container mx-auto w-[90%] md:w-[80%] my-4'>
      <h1 className='text-slate-500 font-semibold my-2 text-lg md:text-xl'>Shop Popular Categories</h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={2} // الموبايل
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6, // عدد ثابت مناسب للشاشات الكبيرة
          },
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
      >
        {data?.map((category: CategoryType) => (
          <SwiperSlide key={category._id} className="flex flex-col items-center w-full">
            <Image
              src={category.image}
              width={500}
              height={500}
              alt={category.name}
              className='w-full h-[150px] md:h-[180px] lg:h-[200px] object-cover rounded'
            />
            <p className='text-center font-bold mt-2 text-sm md:text-base lg:text-lg'>{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
