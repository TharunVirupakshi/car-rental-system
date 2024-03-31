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
    },
 createPayment: async(data)=>{
      try {
          const {orderID, custID, totCost, paymentMethod} = data
          console.log('Processing payment ', data)
          const response = await api.post('/api/createPayment', {orderID, custID, totCost, paymentMethod}) 
          return response.data
      } catch (error) {
        console.error('Error processing payment:', error.message);
        throw error;  
      }
    },
    createTrip: async({orderID, rentalStartDate, rentalEndDate})=>{
        try {
          console.log('Creating Trip', orderID)
          if(orderID === undefined || !orderID){
            console.error('cannot create trip')
            return
          }
          const response = await api.post('/api/createTrip', {orderID, rentalStartDate, rentalEndDate }) 
          console.log('Trip Details: ', response.data)
          return response.data
            
        } catch (error) {
            console.error('Error creating order:', error.message);
            throw error;  
        }
    },
    getCoupon: async(couponCode)=>{
        try {
            const response = await api.get('/api/getCoupon', {params: {couponCode}})
            console.log('Coupon: ', response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching coupon:', error.message);
            throw error;   
        }
    },
    checkAvailability: async(carID)=>{
        try {
            const response = await api.get('/api/checkAvailability', {params: {carID}})
            console.log('Availability :', response)
            return response.data
        } catch (error) {
            console.error('Error fetching car availability:', error.message);
            throw error;   
        }
    },
    getAllTrips: async(custID)=>{
        try {
            console.log('Fetching trips.....', custID)
            const response = await api.get('/api/getAllTrips', {params: {custID}})
            console.log('MyTrips: ', response.data)
            return response.data.trips
        } catch (error) {
            console.error('Error fetching trips:', error.message);
            throw error;   
        }

    },
    getUser: async(custID)=>{
      try {
        const response = await api.get('/api/getUser', {params: {custID}})
        console.log('User details:', response.data)
        return response.data
        
      } catch (error) {
        console.error('Error fetching user:', error.message);
        throw error;    
      }
    },
    updateUser: async({custID, name, address, contactNum}) => {
      try {
        const response = await api.post('/api/updateUser', {custID, name, address, contactNum})
        console.log('User details:', response.data)
        return response.data
        
      } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;    
      }
    },
    addCar: async({vehicleNo, model, carType, locationID}) => {
      try {
        const response = await api.post('/api/addCar', {vehicleNo, model, carType, locationID})
        console.log('Added car!')

        return response.data
        
      } catch (error) {
        console.error('Error adding car:', error.message);  
      }
    },
    updateCar: async({vehicleNo, model, carType, locationID}) => {
      try {
        await api.put('/api/updateCar', {vehicleNo, model, carType, locationID})
        console.log('Updated!')
      } catch (error) {
        console.error('Error updating car:', error.message);   

      }
    }
    ,
    deleteCar: async(vehicleNo) => {
      try {
        await api.delete('/api/deleteCar', {params: {vehicleNo}})
      } catch (error) {
        console.log('Error deleting car: ', error.message)
      }
    },
    getCoupons: async() => {
      try {
        const res = await api.get('/api/getCoupons')
        console.log('Coupons: ',res.data)
        return res.data
      } catch (error) {
        console.log('Error fetching coupons: ', error.message)
      }
    },
    deleteCoupon: async({discountID}) =>{
      try {
        const res = await api.delete('/api/deleteCoupon', {params: {discountID}})
        return res.data
      } catch (error) {
        console.log('Error deleting coupon: ', error.message) 
      }
    },
    addCoupon: async({couponCode, discountPercent}) => {
      try {
        const res = await api.post('/api/createCoupon', {couponCode, discountPercent})
        return res.data
      } catch (error) {
        console.log('Error creating coupon: ', error.message)  
      }
    },
    getLocations: async() => {
      try {
        const res = await api.get('/api/getLocations')
        return res.data
      } catch (error) {
        console.log('Error fetching locations: ', error.message)   
      }
    },
    getLocation: async (locationID) => {
      try {
          const res = await api.get(`/api/getLocation?locationID=${locationID}`);
          return res.data;
      } catch (error) {
          console.log('Error fetching location: ', error.message);
      }
    },
    createLocation: async (locationData) => {
        try {
            const res = await api.post('/api/createLocation', locationData);
            return res.data;
        } catch (error) {
            console.log('Error creating location: ', error.message);
        }
    },
    updateLocation: async (locationData) => {
        try {
            const res = await api.put(`/api/updateLocation`, locationData);
            return res.data;
        } catch (error) {
            console.log('Error updating location: ', error.message);
        }
    },
    deleteLocation: async (locationID) => {
        try {
            const res = await api.delete(`/api/deleteLocation?locationID=${locationID}`);
            return res.data;
        } catch (error) {
            console.log('Error deleting location: ', error.message);
        }
    }
    ,
    getTripAssistants: async () => {
    try {
        const res = await api.get('/api/getTripAssistants');
        return res.data;
    } catch (error) {
        console.log('Error fetching trip assistants: ', error.message);
    }
    },
    getTripAssistant: async (asstID) => {
        try {
            const res = await api.get(`/api/getTripAssistant?asstID=${asstID}`);
            return res.data;
        } catch (error) {
            console.log('Error fetching trip assistant: ', error.message);
            
        }
    },
    createTripAssistant: async (assistantData) => {
        try {
            const res = await api.post('/api/createTripAssistant', assistantData);
            return res.data;
        } catch (error) {
            console.log('Error creating trip assistant: ', error.message);
            
        }
    },
    updateTripAssistant: async (assistantData) => {
        try {
            const res = await api.put(`/api/updateTripAssistant`,assistantData);
            return res.data;
        } catch (error) {
            console.log('Error updating trip assistant: ', error.message);
            
        }
    },
    deleteTripAssistant: async (asstID) => {
        try {
            const res = await api.delete(`/api/deleteTripAssistant?asstID=${asstID}`);
            return res.data;
        } catch (error) {
            console.log('Error deleting trip assistant: ', error.message);
            
        }
    },

    
    getDemand: async(date)=>{
      try {
        const response = await axios.get('http://localhost:5000/predict', {params:{new_date: date}})

        console.log('Data from ML SERVER: ', response.data)

        return response.data
        
      } catch (error) {
        console.error('Error fetching demand:', error.message); 
      }
    },
    
  


    
};

export default APIService;