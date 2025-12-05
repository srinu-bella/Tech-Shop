import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import AllProductsPage from '../pages/AllProduct'

const Navigations = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path='/Allproduct' element={<AllProductsPage/>}/>
    </Routes>
  )
}

export default Navigations
