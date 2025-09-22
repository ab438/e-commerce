"use client"
import React from 'react'
import img1 from "../../../../public/images/slider-image-1.jpeg"
import img2 from "../../../../public/images/slider-image-2.jpeg"
import img3 from "../../../../public/images/slider-image-3.jpeg"
import img5 from "../../../../public/images/grocery-banner-2.jpeg"
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules'
export default function MainSlider() {
  return (
    <div className='container mx-auto my-4 w-[90%] md:w-[80%] flex flex-col md:flex-row gap-4'>
  <div className="w-full md:w-3/4">
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{ delay: 2000 }}
    >
      <SwiperSlide>
        <Image src={img1} alt='text' className='w-full h-64 md:h-96 object-cover'/>
      </SwiperSlide>
      <SwiperSlide>
        <Image src={img3} alt='text' className='w-full h-64 md:h-96 object-cover'/>
      </SwiperSlide>
      <SwiperSlide>
        <Image src={img5} alt='text' className='w-full h-64 md:h-96 object-cover'/>
      </SwiperSlide>
    </Swiper>
  </div>

  <div className="w-full md:w-1/4 flex flex-col gap-4">
    <Image src={img2} alt='text' className='w-full h-32 md:h-48 object-cover'/>
    <Image src={img3} alt='text' className='w-full h-32 md:h-48 object-cover'/>
  </div>
</div>

  )
}
