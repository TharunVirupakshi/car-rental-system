import {useEffect, useState} from 'react'
import withAuth from '../../components/withAuth/withAuth'
import { useParams, Link, useNavigate } from 'react-router-dom';
import APIService from '../../middleware/APIService';
import { Button } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import { Stepper } from '../../components';
import { RATE_PER_DAY } from '../../constants';
import { auth } from '../../firebase/firebase';
import { Datepicker } from 'flowbite-react';



const user = auth.currentUser;


const Order = () => {

  const COUPON = 'FIRST20'

  const { productID } = useParams();
  const [ carData, setCarData] = useState([])
  console.log('(Order) id:',productID)

  // const [price, setPrice] = useState(0)
  const [days, setDays] = useState(1)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  const [isPaymentModeOn, setIsPaymentModeOn] = useState(false)
  const [activeStep, setActiveStep] = useState(0);

  const [couponCode, setCouponCode] = useState('')
  const [isCouponValid, setIsCouponValid] = useState(false)
  const [couponDetails, setCouponDetails] = useState(null)
  const [triggered, setTriggered] = useState(false)
  const navigate = useNavigate()

  const[demand, setDemand] = useState(0)

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

 
  // Set time part to 0 for startDate
  startDate.setHours(0, 0, 0, 0);

  // Set time part to 0 for endDate
  endDate.setHours(0, 0, 0, 0);
  useEffect(()=>{
    console.log("Dates ",startDate, endDate)
    const days = calculateDaysBetween(startDate, endDate)
    console.log('Days calculated: ', days)
    setDays(days)
  },[startDate, endDate])

  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await APIService.getDemand(startDate);
        console.log('Demand ',  data?.demand);
        setDemand(data?.demand);
      } catch (error) {
        console.error('Error fetching demand:', error.message);
      }
    };

    fetchData();
  },[startDate])

  useEffect(()=>{
    const rate = demand!=0 ? RATE_PER_DAY+RATE_PER_DAY*(demand/100) : RATE_PER_DAY
    const price = (days * rate).toFixed(2);

    setEstimatedPrice(price)
  },[days, demand])



  //Apply Discount
  useEffect(()=>{
    const cost = couponDetails ? (estimatedPrice - (estimatedPrice * (couponDetails.discountPercent || 0.0))).toFixed(2) : estimatedPrice;
    setTotalCost(cost);
  },[estimatedPrice, couponDetails])

  const calculateDaysBetween = (start, end) => {
  if (start && end) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(start);
    const endDate = new Date(end);

    const daysDifference = Math.round(Math.abs((startDate - endDate) / oneDay));

    // If start and end dates are the same, set days to 1
    return (daysDifference === 0 ? 1 : daysDifference);
  }
  };



  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate < date) {
    // If end date is less than start date, set end date same as start date
    setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
  if (date < startDate) {
    // If end date is less than start date, set end date same as start date
    setEndDate(startDate);
  } else {
    setEndDate(date);
  }
};
  
  const handleCreateOrder = ()=>{
    const makeReq = async () => {
      try {
        const id = auth.currentUser.uid;
        const orderDetails = {
          vehicleNo: productID,
          custID: id,
          discountID: couponDetails?.discountID ?? null,
          totCost: totalCost
        }
        const data = await APIService.createOrder(orderDetails);
        console.log('(Order) car: ',  data);

        navigate('/payment', { state: { 
          orderId: data?.order?.insertId, 
          totalCost: totalCost, custID: orderDetails.custID , 
          rentalStartDate: startDate.toISOString(), 
          rentalEndDate: endDate.toISOString()
        }})

      } catch (error) {
        console.error('(Order) Error fetching car    :', error.message);
      }
    };

    makeReq(); 



  }


  const checkCoupon = async()=>{
    try{
      setTriggered(true)
      const res = await APIService.getCoupon(couponCode)
      setCouponDetails(res[0])
      setIsCouponValid(true)
      console.log('coupon res: ', res[0])

    }catch(err){
      setCouponDetails(null)
      setIsCouponValid(false)
      console.log('Error with coupon code', err)
    }
    
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
            
            {/* <TextInput 
              id="days" 
              type="text"  
              placeholder='Enter total number of days' 
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required  
              /> */}
              <div className="my-5 block">
              <Label htmlFor="start" value="Pickup" />
              </div>
              <Datepicker name='start' minDate={new Date()} autoHide={true} onSelectedDateChanged={handleStartDateChange} />
              <div className="my-5 block">
              <Label htmlFor="end" value="Return" />
              </div>
              <Datepicker value={endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} name='end' minDate={startDate || new Date()} autoHide={true} onSelectedDateChanged={handleEndDateChange}/>



            <div className="flex flex-col pb-3 mt-5">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Estimated Price: </dt>
                        <dd className="text-lg font-semibold">₹{estimatedPrice ?? '0.0'}</dd>
                        
            </div>
           </>)} {isPaymentModeOn && (
           <>
           <div className="my-5 block">
              <Label htmlFor="coupon" value="Coupon" />
            </div>
            <div className="flex gap-5 items-start">
            <div>
            <TextInput 
              id="coupon" 
              type="text"  
              placeholder='Enter coupon code' 
              value={couponCode}
              color={triggered && (isCouponValid ? "success" : "failure")}
              helperText={
                triggered && ( isCouponValid ? 
                <>
                  <span className="font-medium">Verified</span> Coupon code applied!
                </> :
                <>
                  <span className="font-medium">Oops!</span> Coupon code not found!
                </> 
                )
              }
              onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <Button onClick={checkCoupon}>Apply</Button> 
            </div>
        
   
              

            <div className="flex flex-col pb-3 mt-5">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Price: </dt>
                        <p className='text-sm text-green-500'>{couponDetails && 'Discount Applied: -₹'+ estimatedPrice*(couponDetails.discountPercent || 0)}</p>
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