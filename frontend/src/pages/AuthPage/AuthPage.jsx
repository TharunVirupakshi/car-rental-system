import {useState} from 'react'
import {signIn, signUp} from '../../middleware/AuthService'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

const AuthPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

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
      await signUp(email, password);
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
      </div>
      <div>
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
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit"  onClick={handleLogin}>Login</Button>
      <Button type="" onClick={handleSignUp}>Sign Up</Button>
    </form>
    </div>
  )
}

export default AuthPage