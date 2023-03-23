import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function Carousel() {
  const items = [
    { src: "/image/001.png" },
    { src: "/image/002.png" },
    { src: "/image/003.png" },
    
  ];
  return (
    <>
     <Swiper
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination,Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className="main_wrap">
              <img className="main_img" src={item.src} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  )
}
