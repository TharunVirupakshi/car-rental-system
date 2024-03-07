import { LOCAL_SERVER } from "../constants"
import axios from 'axios';



const api = axios.create({
    baseURL: LOCAL_SERVER,
});

const APIService = {
  getCars: async () => {
    try {
      const response = await api.get('/api/getCars');
      console.log('Got cars: ', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error.message);
      throw error;
    }
  },
  getCar: async(vehicleNo) => {
    try {
      console.log('Getting car ', vehicleNo)
      const response = await api.get('/api/getCar', { params: {vehicleNo}});
      console.log('Got car: ', response.data)
      return response.data
    } catch (error) {
    console.error('Error fetching car:', error.message);
    throw error; 
    }
  },
  createOrder: async({vehicleNo, custID, discountID, totCost})=>{
    try {
        console.log('Creating order for car ', vehicleNo)
        const response = await api.post('/api/createOrder', {carID: vehicleNo, custID, discountID, totCost});
        console.log('Order created: ', response.data)
        return response.data
      } catch (error) {
      console.error('Error creating ORDER:', error.message);
      throw error; 
      } 

  }
};

export default APIService;