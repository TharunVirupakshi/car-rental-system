import {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import APIService from '../../middleware/APIService';
import carImg from '../../assets/maruti-suzuki-fronx-splendid-silver-with-bluish-black.jpg'
import { Button } from 'flowbite-react';



const ProductPage = () => {
  const { productID } = useParams();
  const [ carData, setCarData] = useState([])
  const [isAvailable, setIsAvailable] = useState(false);
  const [ETRDate, setETRDate] = useState(null)
  const [error, setError] = useState(null)
  console.log('(Prodpage) id:',productID)
  useEffect(() => {

    const fetchData = async () => {
      try {
        setError(null)
        const data = await APIService.getCar(productID);
        const carStatus = await APIService.checkAvailability(productID)
        console.log('(ProdPage) car: ',  data);
        console.log('(Stat) : ', carStatus?.isAvailable)
        setIsAvailable(carStatus.isAvailable)
        setETRDate(carStatus.etrDate ?? null)
        setCarData(data[0]);
      } catch (error) {
        setError(error)
        console.log('(ProdPage) Error fetching car:', error.message);
      }
    };

    fetchData();
  }, [])


  if(error?.response?.status == 404){
    return(<div className='flex justify-center items-center h-screen'><h2 className="text-4xl font-extrabold dark:text-white">404 NOT FOUND</h2></div> )
  }
 

  return (
    <div>

        <div className="product-container flex p-16 gap-10">

        <div className="img-container">
            
            <img className="h-auto max-w-lg rounded-lg" src={carImg} alt="image description"/>

        </div>

        <div className="prod-desc my-5">
            <h2 className="text-4xl font-extrabold dark:text-white">{carData.model ?? 'Car Name'}</h2>
            
                <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-5">
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Type</dt>
                        <dd class="text-lg font-semibold">{carData.carType ?? 'car type'}</dd>
                    </div>
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                        <dd class="text-lg font-semibold">{carData.branchName ?? 'branch name'} - {carData.address ?? ' '}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-2 text-gray-500 md:text-lg dark:text-gray-400">Status</dt>
                        {isAvailable ?  
                        <span class={"w-min inline-flex items-center bg-green-100 text-green-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"}>
                          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Available
                        </span> : <>

                        <span class="w-min inline-flex items-center bg-red-100 text-red-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                          Unavailable
                        </span>
                        <div class="flex flex-col py-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Available after</dt>
                        <dd class="text-lg font-semibold">{new Date(ETRDate).toISOString().split('T')[0] ?? ' '}</dd>
                       </div>
                        </>

                        }
                       
              {/* <dd class="text-lg font-semibold ">{isAvailable ? 'Available' : 'Rented out'}</dd> */}
                    </div>
                </dl>

            {/* <a href="#" className="inline-flex items-center text-lg text-blue-600 dark:text-blue-500 hover:underline">
                Read more
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a> */}
            <div className="mt-5">
              <Button disabled={!isAvailable}>
                {isAvailable ? <Link to={`/order/${carData?.vehicleNo}`}>
                 Rent
                </Link>
                :          
                 "Rent"
               }
              </Button>
            </div>
           

        </div>

       

        </div>


{/*         
          <div >
            <p>Vehicle No: {carData.vehicleNo}</p>
            <p>Car Type: {carData.carType}</p>
            <p>Model: {carData.model}</p>
            <p>Location ID: {carData.locationID}</p>
            <p>Branch Name: {carData.branchName}</p>
            <p>Address: {carData.address}</p>
            <hr />
          </div>
     */}




    </div>
  )
}

export default ProductPage