import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

const MainSlide = styled.div`
  width: 100%;
  position: relative;
  padding: 0 300px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  overflow: hidden;
  img { 
    width: 100%;
  }
`
const Slide = () => {
  return (
    <MainSlide>
    <Swiper 
      modules={[Navigation, Pagination, Autoplay]} 
      loop={true}
      autoplay={{
        delay: 3000
      }}
      slidesPerView={1}
      navigation={{
        nextEl: '.next',
        prevEl: '.prev'
      }}
      pagination={{ 
        el: '.pagination',
        clickable: true,
        type: 'bullets'
      }}
    >
      <SwiperSlide>
        <img src={'./img/img01.png'} alt="slide"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={'./img/img02.png'} alt="slide"></img>
      </SwiperSlide>
    </Swiper>
  </MainSlide>
  )
}

export default Slide