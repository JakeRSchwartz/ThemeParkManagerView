import React from 'react'
import CustomerSideNav from '../../components/customer.components/CustomerNav'
import Header from '../../components/customer.components/Header'
import ImgSlider from '../../components/customer.components/ImgSlider'
import RidesBooking from '../../components/customer.components/RidesBooking'

function BookRides () {
  return (
    <>
      <CustomerSideNav />
      <Header />
      <RidesBooking />
    </>
  )
}

export default BookRides
