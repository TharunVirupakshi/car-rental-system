import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { useEffect, useState, useMemo } from 'react'

import { auth } from '../../firebase/firebase'
import APIService from '../../middleware/APIService'



const MyTrips = () => {

  const [data, setData] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchTrips = useMemo(() => async () => {
    try {
      console.log('MyTrips uid: ', user?.uid);
      const res = await APIService.getAllTrips(user?.uid);
      if (res.length !== 0) {
        setData(res);
      }
    } catch (err) {
      console.log('Error fetching trips', err);
    }
  }, [user]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  

  return (
    
<div className='p-10'>
<div className="title ">
    <h2 className="text-4xl font-extrabold dark:text-white p-5">My Trips</h2>
  </div>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Car Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Vehicle No
                </th>
                <th scope="col" class="px-6 py-3">
                    Trip ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Start Date
                </th>
                <th scope="col" class="px-6 py-3">
                    End Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
        { data.map((item, index) => (
            <tr key={index} class="odd:bg-gray-200 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.model ?? '-'}
                </th>
                <td class="px-6 py-4">
                    {item.carID ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item.tripID ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item.startDate ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item.endDate ?? '-'}
                </td>
                <td class="px-6 py-4">
                {item.status ? 
                        <span class={"w-min inline-flex items-center bg-green-100 text-green-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"}>
                          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Running
                        </span> : 
                        <span class="w-min inline-flex items-center bg-blue-100 text-blue-800 text-m font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                          <span class="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                          Finished
                        </span>

                        }
                </td>
            </tr>
        ))}
            
            
        </tbody>
    </table>
</div>


</div>
  )
}

export default MyTrips