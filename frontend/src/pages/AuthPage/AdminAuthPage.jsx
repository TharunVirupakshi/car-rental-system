import {useState} from 'react'
import {adminLogin} from '../../middleware/AuthService'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useAdminAuth } from '../../middleware/AdminAuthContext';



const AdminAuthPage = () => {

const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage,setErrorMessage] = useState(null)

const {login, logout} = useAdminAuth()


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const data = await adminLogin({email, password})
    if(data.success){
        login()
    }
    // Redirect or perform other actions after successful login
    navigate('/adminDashboard');
  } catch (error) {
    // Handle login errors (display error message, etc.)
    logout()
    console.error('Login error:', error.message);
    setErrorMessage(error.message)
  }
};


return (<>

  {errorMessage && (
          <Alert color="failure" icon={HiInformationCircle} className="fixed">
            <span className="font-medium">Error!</span> {errorMessage}
          </Alert>
        )}
  <div className='flex w-screen h-screen justify-center'>

   

     <form className="flex flex-col gap-4 w-96 my-16">
     <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome Admin!</h1>
 

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

        <Button type="submit"  onClick={handleLogin}>Login</Button>


  </form>
  </div>

  </>
)
}

export default AdminAuthPage