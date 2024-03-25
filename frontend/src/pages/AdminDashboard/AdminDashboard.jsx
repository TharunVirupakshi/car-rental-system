import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { HrzntlCard } from '../../components'
import { useAdminAuth } from '../../middleware/AdminAuthContext'


const SideButton = ({link, icon, title, selected}) => {

    const [active, setActive] = useState(false);
    useEffect(()=>{
        setActive(selected)
    }, [selected])

    const style = active ? "inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600" : "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white" 

    return(

            <Link to={link}>
            <div href="#" class={style} aria-current="page">
                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                {title}
            </div>

            </Link>

    )
}


const AdminDashboard = () => {
  
    const {isLoggedIn, logout} = useAdminAuth()

    const navigate = useNavigate()
    const check = () => {
            if(!isLoggedIn){
            navigate('/adminauthpage')
            }
        }
    useEffect(()=>{
      check()
    },[isLoggedIn])

    const [selected,setSelected] = useState(1)
    useEffect(()=>{
        console.log('Selected ', selected)
    }, [selected])
    const handleLogout = () => logout()
    
  return (
    <div className='px-10'>

    <div className="title flex justify-between items-center p-5 ">
        <h2 className="text-xl font-extrabold dark:text-white">Dashboard</h2>
       
       <button onClick={handleLogout} type="button" class="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
    
    
   
    </div>
           

<div class="md:flex">
    <ul class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li id='1' onClick={e => setSelected(1)}>
            <SideButton title={'Cars'} link={'managecars'} selected={selected === 1}/>
        </li>
        <li id='2' onClick={e => setSelected(2)}>
            <SideButton title={'Discounts'} link={'managediscounts'} selected={selected === 2}/>
        </li>
        <li id='3' onClick={e => setSelected(3)}>
            <SideButton title={'Locations'} link={'managelocations'} selected={selected === 3}/>
        </li>
        <li id='4' onClick={e => setSelected(4)}>
            <SideButton title={'Staff'} link={'managestaff'} selected={selected === 4}/>
        </li>

        {/* <li>
            <a class="inline-flex items-center px-4 py-3 text-gray-400 rounded-lg cursor-not-allowed bg-gray-50 w-full dark:bg-gray-800 dark:text-gray-500">
                <svg class="w-4 h-4 me-2 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
            Disabled</a>
        </li> */}
    </ul>

        

    <div class="pxx-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <Outlet/>
       
    </div>
</div>
         
    </div>

  )
}

export default AdminDashboard