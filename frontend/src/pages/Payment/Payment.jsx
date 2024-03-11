import React from 'react'
import withAuth from '../../components/withAuth/withAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { HiOutlineArrowRight, HiShoppingCart } from 'react-icons/hi';
import { useState } from 'react';
import APIService from '../../middleware/APIService';
import { useEffect } from 'react';


const Payment = () => {
  const location = useLocation();
  // Access the parameters from location.state
  const { orderId, totalCost } = location.state;
  const [paymentData, setPaymentData] = useState(null)
  const [method, setMethod] = useState('credit')

  const navigate = useNavigate()

  useEffect(()=>{
    const data = location.state
    setPaymentData(data)
  },[])

  console.log('Params: ', location.state)

  const handlePayment = async(e) => {
    e.preventDefault()
    try {
      if (paymentData?.orderId && paymentData?.totalCost && paymentData?.custID) {
    
      console.log('Payment Data sending', paymentData);
      const response = await APIService.createPayment({
        orderID: paymentData.orderId,
        totCost: paymentData.totalCost,
        paymentMethod: method,
        custID: paymentData.custID,
      });
      console.log('Payment status....', response);

      if(response.success)  alert('Payment Success')

      //Create Trip....
    
      const res = await APIService.createTrip({orderID: paymentData.orderId, rentalStartDate: paymentData.rentalStartDate, rentalEndDate: paymentData.rentalEndDate })

      navigate('/mytrips')
      
      
    } else {
      console.log('Missing required properties in paymentData');
    }

    } catch (error) {
      console.log('Error processing payment....', error)
    }
  }

  return (<>
  <h2 class="text-4xl font-extrabold dark:text-white p-10 text-center">Payment</h2>
    <div className='flex w-screen justify-center items-center p-10 gap-16'>
      
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You're One step away!</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Proceed with payment to complete your order</p>
        <div className="flex flex-col pb-3 mt-5">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Total: </dt>
          <dd className="text-lg font-semibold">₹{totalCost}</dd>

        </div>

        <div>
            <label for="method" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mode of payment</label>
            <select 
              name="method" 
              id="method" 
              class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={e => setMethod(e.target.value)}
              >
            <option value ="credit" selected>CreditCard</option>
            <option value="debit">Debit Card</option>
            <option value="upi">UPI</option>
            </select>

        </div>
        <a  onClick={handlePayment} className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Pay
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>


    </div>
    </>
  )
}

export default withAuth(Payment)