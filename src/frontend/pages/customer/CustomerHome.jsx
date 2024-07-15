import React from 'react'
import CustomerSideNav from '../../components/customer.components/CustomerNav'
import Header from '../../components/customer.components/Header'
import ImgSlider from '../../components/customer.components/ImgSlider'
import Rides from '../../components/customer.components/Rides'
import Games from '../../components/customer.components/Games'
import Attractions from '../../components/customer.components/Attractions'
function CustomerHome() {
  return (
    <>
    <CustomerSideNav/>
    <Header/>
    <ImgSlider/>
    <Rides/>
    <Games/>
    <Attractions/>


    </>
  )
}

export default CustomerHome