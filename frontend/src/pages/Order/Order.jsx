import {useEffect, useState} from 'react'
import withAuth from '../../components/withAuth/withAuth'
import { useParams, Link } from 'react-router-dom';
import APIService from '../../middleware/APIService';
import { Button } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import { Stepper } from '../../components';
import { RATE_PER_DAY } from '../../constants';


const Order = () => {

  const { productID } = useParams();
  const [ carData, setCarData] = useState([])
  console.log('(Order) id:',productID)

  // const [price, setPrice] = useState(0)
  const [days, setDays] = useState(0)
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  


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
  }, [])


  useEffect(()=>{
    setEstimatedPrice(days*RATE_PER_DAY)
  },[days])

 


  return (
  <div className='p-10'>
  <div className="title ">
    <h2 className="text-4xl font-extrabold dark:text-white">Order Page</h2>
  </div>
  <div className="product-details p-10">
                <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-5">
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Model</dt>
                        <dd class="text-lg font-semibold">{carData.model ?? 'model name'}</dd>
                    </div>
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Type</dt>
                        <dd class="text-lg font-semibold">{carData.carType ?? 'car type'}</dd>
                    </div>
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                        <dd class="text-lg font-semibold">{carData.branchName ?? 'branch name'} - {carData.address ?? ' '}</dd>
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
          <Stepper itemsData={['Trip info', 'Payment']} activeItem={0}/>

          
          <div className='max-w-md'>
          
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

            <div class="flex flex-col pb-3 mt-5">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Estimated Price: </dt>
                        <dd class="text-lg font-semibold">₹{estimatedPrice ?? '0.0'}</dd>
            </div>
          </div>


        </div>
            <div className="mt-5">
                <Link to={`/order/${carData?.vehicleNo}`}>
                    <Button>Proceed to payment</Button>
                </Link>
            </div>
           

      
  </div>
    
  </div>
  )
}

export default withAuth(Order)