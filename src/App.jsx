import { useState } from 'react'
import './App.css'

import {Route, Routes} from 'react-router-dom';
import { CarListing, Homepage, Order, Payment } from './pages';


function App() {
  

  return (
    <>

     <Routes>

        <Route path="/" exact element={<Homepage />} />
        <Route path="/car-listing" element={<CarListing/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/payment" element={<Payment/>} /> 
        
     </Routes>
      
    </>
   
  )
}

export default App
