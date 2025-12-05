import React from 'react'
import Carousel from './Crousel'
import Slider from './Slider'
// import TopProduct from './TopProduct'
import TopProducts from './TopProduct'

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Carousel/>
      <Slider/>
      <TopProducts/>
    </div>
  )
}

export default Home
