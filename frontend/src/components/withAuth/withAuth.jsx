// withAuth.js
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Import your Firebase configuration

const withAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
          navigate('/authpage');
        }
      });

      return () => unsubscribe();
    }, []);

    return <>{user ? <WrappedComponent {...props} /> : null}</>;
  };
};

export default withAuth;
