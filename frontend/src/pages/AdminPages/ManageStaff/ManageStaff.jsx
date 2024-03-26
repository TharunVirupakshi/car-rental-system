import {useEffect, useState, useMemo} from 'react'
import APIService from '../../../middleware/APIService'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

const AddModal = ({closeModal, refresh}) =>{
  const [data, setData] = useState({
    asstID: null,
    name: '',
    contactNum: '',
    email: ''
  });



  const handleData = (e) => {
    
    setData(prev => (
      {
        ...prev,
        [e.target.name] : e.target.value
      }
    ))
  }
  
  // useEffect(()=>     console.log('data:', data), [data])


  const handleSubmit = async() => {
      try {
        const res = await APIService.createTripAssistant(data)
        if(res?.success ?? false){
          alert('Staff Added')
        }
        refresh()
        closeModal()
      } catch (error) {
        console.log(error)
      }
  }

  return(
    <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">New staff details</h3>
           
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput name='name' id="name" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="contactNum" value="Contact" />
              </div>
              <TextInput name='contactNum' id="contactNum" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput name='email' id="email" type="email" onChange={handleData} required/>
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Add Staff</Button>
            </div>
   
          </div>
  )
}

const EditModal = ({id, closeModal, refresh}) =>{
  const [data, setData] = useState({
    asstID: null,
    name: '',
    contactNum: '',
    email: ''
  });

  const [curData, setCurData] = useState(null)

  useEffect(()=>{
    const fetch = async() => {
      try {
        const data = await APIService.getTripAssistant(id)
        console.log('Fetched trip assistant', data)
        setCurData(data[0])
        setData(prev => ({...prev, asstID: data[0].asstID}))
      } catch (error) {
        console.error('Error fetching trip assistant:', error.message);
      }
    }

    fetch()
  }, [id])


  const handleData = (e) => {
    
    setData(prev => (
      {
        ...prev,
        [e.target.name] : e.target.value
      }
    ))
  }

  const handleSubmit = async() => {
      try {
        await APIService.updateTripAssistant(data)
        alert('Saved!')
        refresh()
        closeModal()
      } catch (error) {
        console.log(error)
      }
  }

  const handleDelete = async() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this staff?");
  if (confirmDelete) {
    try {
      await APIService.deleteTripAssistant(curData?.asstID);
      alert('Trip Assistant deleted successfully!');
      refresh()
      closeModal()
    } catch (error) {
      console.error(error);
      alert('Failed to delete Trip Assistant. Please try again later.');
    }
  }
  }


  return(
    <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Staff:  <span className='text-lg font-semibold'>{curData?.asstID ?? ''}</span></h3>
           
            <div>
              <div className="mb-2 block">
                <Label className='text-gray-500'  htmlFor="name"  value={`Name: `} />
                <span className='text-sm font-semibold'>{curData?.name ?? ''}</span>
              </div>
              <TextInput placeholder='Enter new name' name='name' id="name" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label className='text-gray-500' htmlFor="contactNum" value={`Contact: `} />
                <span className='text-sm font-semibold'>{curData?.contactNum ?? ''}</span>
              </div>
              <TextInput  placeholder='Enter new contact num' name='contactNum' id="contactNum" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label className='text-gray-500' htmlFor="email" value={`Email: `} />
                <span className='text-sm font-semibold'>{curData?.email ?? ''}</span>
              </div>
              <TextInput  placeholder='Enter new email' name='email' id="email" type="email" onChange={handleData} required/>
            </div>

            <div className="w-full flex gap-4">
              <Button onClick={handleSubmit}>Update Staff</Button>
              <button onClick={handleDelete} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Delete
              </button>
            </div>
          </div>
  )

}

const ManageStaff = () => {
  const [data, setData] = useState([])

  const [openAddModal, setOpenAddModal] = useState(false)
  const [editID, setEditID] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const fetchData = useMemo(() => async () => {
    try {
      const res = await APIService.getTripAssistants();
      setData(res);
  
    } catch (err) {
      console.log('Error fetching trips', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetchData = () => {
    fetchData()
  }
  function onCloseAddModal() {
    setOpenAddModal(false);
  }
  function onCloseEditModal() {
    setOpenEditModal(false);
  }

  const handleEdit = (id) =>{
    setEditID(id)
    setOpenEditModal(true)
  }

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div className="title flex justify-between p-5 items-center">
        <h2 className="text-xl font-extrabold dark:text-white">Staff</h2>
       
       <button onClick={()=> setOpenAddModal(true)} type="button" class="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Staff</button>
   
   
    </div>
 
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Staff ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Contact
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        { data.map((item, index) => (
            <tr key={index} class="odd:bg-gray-200 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item?.asstID?? '-'}
                </th>
                <td class="px-6 py-4">
                    {item?.name ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item?.contactNum ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item?.email ?? '-'}
                </td>
                <td class="px-6 py-4">
                    <button onClick={e => handleEdit(item?.asstID)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
            
            </tr>
        ))}
            
            
        </tbody>
    </table>

    <Modal show={openAddModal} size="md" onClose={onCloseAddModal} popup>
        <Modal.Header />
        <Modal.Body>
          <AddModal refresh={refetchData} closeModal={onCloseAddModal}/>
        </Modal.Body>
    </Modal>

    <Modal show={openEditModal} size="lg" onClose={onCloseEditModal}  popup>
        <Modal.Header />
        <Modal.Body>
          <EditModal id={editID} closeModal={onCloseEditModal} refresh={refetchData}/>
        </Modal.Body>
    </Modal>
    </div>
  )
}

export default ManageStaff