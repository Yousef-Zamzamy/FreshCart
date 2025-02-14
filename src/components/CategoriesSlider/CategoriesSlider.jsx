import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ] 
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="font-semibold m-3 capitalize">shop popular categories</h2>
      <Slider {...settings}>
        {categories?.map((category) => (
          <div className="" key={category._id}>
            <img
              src={category.image}
              className="w-full h-[200px] object-cover m-3"
              alt=""
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
