import {useState} from 'react'
import {signIn, signUp} from '../../middleware/AuthService'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import './authpage.css'


const AuthPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [errorMessage,setErrorMessage] = useState(null)

  const [isSignUp, setIsSignUp] = useState(false);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect or perform other actions after successful login
      navigate('/');
    } catch (error) {
      // Handle login errors (display error message, etc.)
      setErrorMessage(error.message)
      console.error('Login error:', error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
         // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setErrorMessage('Invalid Email format!');
          return
        }


        // Check if name is provided
        if (!name) {
          setErrorMessage('Name is required');
          return
          }

         // Validate contact number format, assuming a 10-digit number
        const contactNumRegex = /^\d{10}$/;
        if (!contactNumRegex.test(contact)) {
          setErrorMessage('Invalid contact number format');
          return
        }



        // Check if address is provided
        if (!address) {
          setErrorMessage('Address is required');
          return
        }

      const contactNum = contact
      await signUp({email, password, name, contactNum, address});
      // Redirect or perform other actions after successful sign-up
      navigate('/');
    } catch (error) {
      // Handle sign-up errors (display error message, etc.)
      console.error('Sign-up error:', error.message);
      setErrorMessage(error.message)
    }
  };




  return (<>
      {errorMessage && (
        <Alert color="failure" icon={HiInformationCircle} className="fixed">
          <span className="font-medium">Error!</span> {errorMessage}
          <button onClick={() => setErrorMessage(null)} className="ml-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 4.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </Alert>
      )}
    <div className='loginPage flex w-screen h-screen pl-40'>

     

       <form className="flex flex-col gap-4 w-96 my-16">
       <h1 className="mb-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Find Your Ride, Start Your Adventure!</h1>
        {isSignUp ? (
          <div>
            <div className="my-1 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            
            <div className="my-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="my-2 block">
              <Label htmlFor="contactNum" value="Contact" />
            </div>
            <TextInput
              id="contactNum"
              type="text"
              placeholder='Enter your contact number'
              value={contact}
              onChange={(e) =>{setContact(e.target.value); console.log( 'Ph: ',e.target.value)}}
              maxLength={15}
              required
            />
            <div className="my-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <TextInput
              id="address"
              type="text"
              placeholder='Enter your address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="my-2 block">
                <Label htmlFor="password1" value="Password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
          </div>
        ) : (

          <div>
            <div className="my-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            
              <div className="my-2 block">
                <Label htmlFor="password1" value="Password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            
          </div>

        )}


      {!isSignUp ?
        <>
        <Button type="submit"  onClick={handleLogin}>Login</Button>
        <Button type="" onClick={()=>setIsSignUp(true)}>Sign Up</Button>
      </> 
       :
       <>
        <Button type="" onClick={handleSignUp}>Sign Up</Button>
        <Button type="submit"  onClick={()=>setIsSignUp(false)}>Login</Button>
      </> 

      }
      {/* <Button type="" onClick={handleSignUp}>Sign Up</Button> */}
    </form>
    </div>

    </>
  )
}

export default AuthPage