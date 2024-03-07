import {useEffect, useState} from 'react'
import withAuth from '../../components/withAuth/withAuth'
import { useParams, Link, useNavigate } from 'react-router-dom';
import APIService from '../../middleware/APIService';
import { Button } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import { Stepper } from '../../components';
import { RATE_PER_DAY } from '../../constants';
import { auth } from '../../firebase/firebase';
const user = auth.currentUser;


const Order = () => {

  const COUPON = 'FIRST20'

  const { productID } = useParams();
  const [ carData, setCarData] = useState([])
  console.log('(Order) id:',productID)

  // const [price, setPrice] = useState(0)
  const [days, setDays] = useState(0)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  const [isPaymentModeOn, setIsPaymentModeOn] = useState(false)
  const [activeStep, setActiveStep] = useState(0);

  const [couponCode, setCouponCode] = useState('')

  const navigate = useNavigate()

  //Fetch the car details
  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await APIService.getCar(productID);
        console.log('(Order) car: ',  data);
        setCarData(data[0]);
      } catch (error) {
        console.error('(Order) Error fetching car    :', error.message);
      }
    };

    fetchData();
  }, [productID])


  useEffect(()=>{
    setEstimatedPrice(days*RATE_PER_DAY)
  },[days])
  useEffect(()=>{
    const cost = couponCode === COUPON ? estimatedPrice-(estimatedPrice*0.2) : estimatedPrice
    setTotalCost(cost)
  },[estimatedPrice, couponCode])

  
  const handleCreateOrder = ()=>{
    const makeReq = async () => {
      try {
        const id = auth.currentUser.uid;
        const orderDetails = {
          vehicleNo: productID,
          custID: id,
          discountID: null,
          totCost: totalCost
        }
        const data = await APIService.createOrder(orderDetails);
        console.log('(Order) car: ',  data);

        navigate('/payment', { state: { orderId: data?.order?.insertId, totalCost: totalCost, custID: orderDetails.custID } })

      } catch (error) {
        console.error('(Order) Error fetching car    :', error.message);
      }
    };

    makeReq(); 



  }


  return (
  <div className='p-10'>
  <div className="title ">
    <h2 className="text-4xl font-extrabold dark:text-white">Order Page</h2>
  </div>
  <div className="product-details p-10">
                <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-5">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Model</dt>
                        <dd className="text-lg font-semibold">{carData?.model ?? 'model name'}</dd>
                    </div>
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Type</dt>
                        <dd className="text-lg font-semibold">{carData?.carType ?? 'car type'}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                        <dd className="text-lg font-semibold">{carData?.branchName ?? 'branch name'} - {carData?.address ?? ' '}</dd>
                    </div>
                  
                </dl>

            {/* <a href="#" className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline">
                Read more
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a> */}

            <div className="flex max-w-md flex-col gap-4">
    
      
      
    </div>
        <div className="more-details my-5">
          <Stepper itemsData={['Trip info', 'Payment']} activeItem={activeStep}/>

          
          <div className='max-w-md'>
           {!isPaymentModeOn && (<>
            <div className="my-5 block">
              <Label htmlFor="days" value="Days" />
            </div>
            <TextInput 
              id="days" 
              type="text"  
              placeholder='Enter total number of days' 
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required  
              />

            <div className="flex flex-col pb-3 mt-5">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Estimated Price: </dt>
                        <dd className="text-lg font-semibold">₹{estimatedPrice ?? '0.0'}</dd>
            </div>
           </>)} {isPaymentModeOn && (
           <>
           <div className="my-5 block">
              <Label htmlFor="coupon" value="Coupon" />
            </div>
            <TextInput 
              id="coupon" 
              type="text"  
              placeholder='Enter coupon code' 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
             
              />

            <div className="flex flex-col pb-3 mt-5">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Price: </dt>
                        <p className='text-sm text-green-500'>{couponCode === COUPON && 'Discount Applied: -₹'+ estimatedPrice*0.2}</p>
                        <dd className="text-lg font-semibold">₹{totalCost}</dd>
            </div>
           </>)
           }
            
          </div>


        </div>
            <div className="mt-5">
                
                    {!isPaymentModeOn ? 
                      <Button onClick={()=>{setIsPaymentModeOn(true); setActiveStep(1)}}>Next</Button> : <div className='flex gap-5'>
                      <Button onClick={()=>{setIsPaymentModeOn(false);  setActiveStep(0)}}>Go back</Button> 
                      <Button onClick={handleCreateOrder} className="w-40" color='success'>Complete Order</Button> 
   
                      </div>
                      
                    }
                
            </div>
           

      
  </div>
    
  </div>
  )
}

export default withAuth(Order)