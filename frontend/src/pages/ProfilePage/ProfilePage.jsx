import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { auth } from '../../firebase/firebase'
import APIService from '../../middleware/APIService'
import { HiOutlinePencil } from "react-icons/hi";
import { TextInput } from 'flowbite-react'

const ProfilePage = () => {


  const [userDetails, setUserDetails] = useState(null)

  const [user, setUser] = useState(null)

  const [isEdit, setIsEdit] = useState(false)

  const [name, setName] = useState(null)
  const [address, setAddress] = useState(null)
  const [contactNum, setContactNum] = useState(null)


const handleSaveData = async() => {
    try {
        const data = await APIService.updateUser({custID: auth.currentUser?.uid, name: name, address: address, contactNum: contactNum})
        if(data.success){
          alert('Saved !')
          setIsEdit(false)
        }

    } catch (err) {
        console.log("Error", err)
    }
}

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
        try {
          const data = await APIService.getUser(user?.uid);
          setUserDetails(data[0])
          console.log('(ProfilePage) user: ',  data[0]);

        } catch (error) {
          console.error('(ProfilePage) Error fetching user    :', error.message);
        }
      };
  
      fetchData();
  },[user, isEdit])

  return (
    <div className='p-5'>
        <div className="title ">
        <h2 className="text-4xl font-extrabold dark:text-white p-5">My Profile</h2>
        <dl class="p-5 max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-5">
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                        <dd class="text-lg font-semibold">{userDetails?.name}</dd>

                        {isEdit && <TextInput placeholder='New name' onChange={e => setName(e.target.value)}/>}
                    </div>
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                        <dd class="text-lg font-semibold">{userDetails?.email}</dd>
                    </div>
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Contact</dt>
                        <dd class="text-lg font-semibold">{userDetails?.contactNum}</dd>
                        {isEdit && <TextInput placeholder='New contact num' onChange={e => setContactNum(e.target.value)} maxLength={14}/>}
                    </div>
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Address</dt>
                        <dd class="text-lg font-semibold">{userDetails?.address}</dd>
                        {isEdit && <TextInput placeholder='New address' onChange={e => setAddress(e.target.value)}/>}
                    </div>
                    

                </dl>

                <button onClick={()=> setIsEdit(prev => !prev)} type="button" class="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isEdit ? 'Cancel' : 'Edit Profile'}</button>
                {isEdit && <button onClick={handleSaveData} type="button" class="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>}
        </div>
    </div>
  )
}

export default ProfilePage