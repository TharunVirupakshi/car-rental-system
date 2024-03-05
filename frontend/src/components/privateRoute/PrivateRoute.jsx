import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check Firebase authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Set isLoggedIn to true if the user is logged in, otherwise false
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);
    
  if (!isLoggedIn) {
    return <Navigate to="/authpage" />;
  }

  return children;
};

export default PrivateRoute;