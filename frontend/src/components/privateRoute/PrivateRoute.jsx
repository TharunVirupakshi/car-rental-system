import { onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";


const PrivateRoute = ({ children }) => {

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user)
      setIsLoading(false); 
    });

    return () => unsubscribe();
  }, []);


  if (isLoading) {
    // Render loading indicator or skeleton component while waiting for authentication state
    return <>Loading...</>;
  }

  return isLoggedIn ? children :  <Navigate to="/authpage" />;
};

export default PrivateRoute;