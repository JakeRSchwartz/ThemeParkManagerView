import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import slide3 from '../../assets/AmusementPark.jpg'
import slide2 from '../../assets/UH.jpg'
import slide4 from '../../assets/banner4.png'

function ImgSlider () {
  let settings = {
    dot: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <Carousel {...settings}>
      <Wrap>
        <img src={slide3} />
      </Wrap>
      <Wrap>
        <img src={slide2} />
      </Wrap>
      <Wrap>
        <img src={slide4} />
      </Wrap>
    </Carousel>
  )
}

export default ImgSlider

const Carousel = styled(Slider)`
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
      z-index: 5;
    }
  }

  li.slick-active button:before {
    color: grey;
    opacity: 0.75;
    z-index: 1;
  }

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 3;
  }
`

const Wrap = styled.div`
  img {
    border: 4px solid transparent;
    border-radius: 4px;
    width: 95%;
    margin-left: 4.8%;
    height: 300px;
    box-shadow: rgb(0 0 0 / 60%) 0px 26px 30px -10px,
      rgb(0 0 0 / 60%) 0px 16px 10px -120px;
    transition-duration: 360ms;
  }
`
