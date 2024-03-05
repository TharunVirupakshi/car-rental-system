import {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!auth.currentUser
  if (!isLoggedIn) {
    return <Navigate to="/authpage" />;
  }

  return children;
};

export default PrivateRoute;