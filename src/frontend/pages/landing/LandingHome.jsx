import React from 'react'
import RidesL from '../../components/landing.components/RidesL'
import GamesL from '../../components/landing.components/GamesL'
import AttractionsL from '../../components/landing.components/AttractionsL'
import HeaderL from '../../components/landing.components/HeaderL'
import LandingNav from '../../components/landing.components/LandingNav'
import ImgSlider from '../../components/customer.components/ImgSlider'
function LandingHome() {
  return (
    <>
    <LandingNav/>
    <HeaderL/>
    <ImgSlider/>
    <RidesL/>
    <GamesL/>
    <AttractionsL/>
    </>
  )
}

export default LandingHome