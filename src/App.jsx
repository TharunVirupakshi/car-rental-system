import { useState } from 'react'
import './App.css'

import {Navigate, Route, Routes} from 'react-router-dom';
import { CarListing, Homepage, Order, Payment, AuthPage } from './pages';
import {auth} from './firebase/firebase'

import {Navbar} from './components'



function App() {


  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  

  return (
    <>
     
  
     {user && <Navbar/>}
     <Routes>
     {user ? (
        <>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/car-listing" element={<CarListing />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
        </>
      ) : (
        <Route
          path="/*"
          element={<Navigate to="/authpage" />}
        />
      )}
      <Route path="/authpage" element={<AuthPage />} />
        
     </Routes>


      
    </>
   
  )
}

export default App
