import { useState, useEffect } from 'react'
import './App.css'

import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { CarListing, Homepage, Order, Payment, AuthPage, ProductPage, MyTrips, ProfilePage } from './pages';
import {auth} from './firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";
import {Navbar} from './components'
import {signOut} from './middleware/AuthService'
import PrivateRoute from './components/privateRoute/PrivateRoute';





function App() {


  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigte = useNavigate();

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
     
  },[])

  useEffect(()=>{
    console.log('User: ', auth.currentUser)
  },[user])
   



  return (
    <>
     
  
     {isLoggedIn ? <Navbar signOutHandler={signOut} user={user}/> : 
     <div className='flex w-screen'>
      <span className='text-2xl font-semibold dark:text-white p-5'>RentCarz</span>
     </div>}
     <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
            } 
          />
          <Route path="/home" element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
            } 
          />
          <Route path="/product/:productID" element={<PrivateRoute> <ProductPage/> </PrivateRoute>}/>
          {/* <Route path="/car-listing" element={<CarListing />} /> */}
          <Route path="/order/:productID" element={<PrivateRoute><Order/></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/mytrips" element={
            <PrivateRoute>
              <MyTrips />
            </PrivateRoute>
            } 
          />
          <Route path="/myprofile" element={ <ProfilePage/> }/>
          <Route path="/authpage" element={<AuthPage />} />
     </Routes>


      
    </>
   
  )
}

export default App
