import { useState, useEffect } from 'react'
import './App.css'

import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { CarListing, Homepage, Order, Payment, AuthPage } from './pages';
import {auth} from './firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";
import {Navbar} from './components'
import {signOut} from './middleware/AuthService'





function App() {


  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigte = useNavigate();

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user); 
    });
    const user = auth.currentUser;

    setIsLoggedIn(!!user);
    return () => unsubscribe();
     
  },[auth])

  useEffect(()=>{
   if(!isLoggedIn){
    navigte('/authpage')
   } 
  },[isLoggedIn])

  



  return (
    <>
     
  
     {isLoggedIn && <Navbar signOutHandler={signOut} user={user}/>}
     <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/car-listing" element={<CarListing />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/authpage" element={<AuthPage />} />
     </Routes>


      
    </>
   
  )
}

export default App
