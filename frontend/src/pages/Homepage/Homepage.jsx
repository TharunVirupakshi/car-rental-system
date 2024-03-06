import {useState, useEffect}from 'react'
import { ProductCard, SearchBar } from '../../components'
import APIService from '../../middleware/APIService'
import withAuth from '../../components/withAuth/withAuth'

const Homepage = () => {

  const [cars, setCars] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIService.getCars();
        setCars(data);
        console.log('(Homepage) cars: ', data);
      } catch (error) {
        console.error('(Homepage) Error fetching cars:', error.message);
      }
    };

    fetchData();
  }, []);


  

  return (
    <div>
      <div className="serach-bar-wrapper ">

      <SearchBar/>
      </div>

     <div className="cars-listing-box flex flex-wrap gap-5 p-5 w-screen justify-center">
        {cars.map((car) => (
          <ProductCard key={car.vehicleNo} product={car} />
        ))}
      </div>
     

    </div>
  )
}

export default withAuth(Homepage)