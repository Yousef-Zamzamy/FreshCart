import React from 'react'
import style from "./MainSlider.module.css"
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import slider4 from "../../assets/images/grocery-banner.png"
import slider5 from "../../assets/images/grocery-banner-2.jpeg"

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, 
    dotsClass: `slick-dots lg:bottom-[-25px]`
  };


  return <>
    <div className="row mb-5 top-6 mx-3">
      <div className='w-full lg:w-3/4'>
      <Slider {...settings}>
      <img className="w-full h-[400px] object-cover" src={slider1} alt="" />
      <img className="w-full h-[400px] object-cover" src={slider2} alt="" />
      <img className="w-full h-[400px] object-cover" src={slider3} alt="" />
      </Slider>
      
      </div>
      <div className='flex flex-wrap w-full lg:w-1/4'>
      <img className="w-full md:max-lg:w-1/2 h-[200px] object-cover" src={slider4} alt="" />
      <img className="w-full md:max-lg:w-1/2 h-[200px] object-cover" src={slider5} alt="" />
      </div>
    </div>
  </>
}
