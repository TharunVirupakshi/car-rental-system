import { auth } from "../firebase/firebase"
import axios from 'axios'
import { 
    createUserWithEmailAndPassword, 
    signInAnonymously, 
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence, 
    onAuthStateChanged } from "firebase/auth";
import { LOCAL_SERVER } from "../constants";
// Example function to send a POST request to store user details
const storeUserDetails = async (userDetails) => {
  try {
    const response = await axios.post(`${LOCAL_SERVER}/api/store-user`, userDetails);

    // Handle the response from the server
    console.log('Server response:', response.data);
  } catch (error) {
    // Handle errors
    console.error('Error sending request to server:', error.message);
  }
};


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });


auth.onAuthStateChanged(user => {
    if(user){
        console.log('User logged in', user)
    
    }else{
        console.log('User Logged out')

    }

})


const signUp = async (email, password, name, address, contactNum) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password)

    const user = userCred.user;
    const userDetails = {
        custID : user.uid,
        name : name,
        address : address,
        contactNum : contactNum,
        email: email  
    }

    await storeUserDetails(userDetails)
    console.log("SignUp success (AuthService):", user.email)
    // You can add additional logic here, such as sending a verification email
    return true;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    
    console.log("SignIn success (AuthService):", user.email) 
    return true;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};

const signOut = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

const getCurrentUser = () => {
  return auth.currentUser;
};




export { signUp, signIn, signOut, getCurrentUser};
