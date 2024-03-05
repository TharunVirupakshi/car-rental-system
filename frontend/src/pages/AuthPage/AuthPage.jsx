import {useState} from 'react'
import {signIn, signUp} from '../../middleware/AuthService'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';



const AuthPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  

  const [isSignUp, setIsSignUp] = useState(false);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect or perform other actions after successful login
      navigate('/');
    } catch (error) {
      // Handle login errors (display error message, etc.)
      console.error('Login error:', error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const contactNum = contact
      await signUp(email, password, name, contactNum, address);
      // Redirect or perform other actions after successful sign-up
      navigate('/');
    } catch (error) {
      // Handle sign-up errors (display error message, etc.)
      console.error('Sign-up error:', error.message);
    }
  };




  return (
    <div className='flex w-screen h-screen justify-center items-center'>
       <form className="flex flex-col gap-4 w-96">

        {isSignUp ? (
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            
            <div className="mb-2 block">
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
            <div className="mb-2 block">
              <Label htmlFor="contactNum" value="Contact" />
            </div>
            <TextInput
              id="contactNum"
              type="text"
              placeholder='Enter your contact number'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <div className="mb-2 block">
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

            <div className="mb-2 block">
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
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            
              <div className="mb-2 block">
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
  )
}

export default AuthPage