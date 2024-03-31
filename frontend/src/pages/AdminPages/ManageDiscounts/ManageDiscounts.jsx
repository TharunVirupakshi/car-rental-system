import {useState, useEffect, useMemo} from 'react'
import APIService from '../../../middleware/APIService';
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

const AddCouponModal = ({closeModal, refresh}) =>{
  const [data, setData] = useState({
    couponCode: '',
    discountPercent: 0.0,
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
        const res = await APIService.addCoupon(data)
        if(res?.success ?? false){
          alert('Coupon Added')
        }
        refresh()
        closeModal()
      } catch (error) {
        console.log(error)
      }
  }

  return(
    <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">New coupon details</h3>
           
            <div>
              <div className="mb-2 block">
                <Label htmlFor="couponCode" value="Coupon Code" />
              </div>
              <TextInput name='couponCode' id="couponCode" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="discount" value="Discount Percent" />
              </div>
              <TextInput name='discountPercent' id="discountPercent" type="text" onChange={handleData} required/>
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Add Coupon</Button>
            </div>
   
          </div>
  )
}



const ManageDiscounts = () => {
  const [data, setData] = useState([])

  const [openAddCouponModal, setOpenAddCouponModal] = useState(false)
  const [editDiscountID, setEditDiscountID] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const fetchData = useMemo(() => async () => {
    try {
      const res = await APIService.getCoupons();
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

  function onCloseAddCouponModal() {
    setOpenAddCouponModal(false);
  }
  function onCloseEditModal() {
    setOpenEditModal(false);
  }

  const handleEdit = (id) =>{
    setEditDiscountID(id)
    setOpenEditModal(true)
  }

  const handleDelete = async(discountID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
  if (confirmDelete) {
    try {
      await APIService.deleteCoupon({discountID});
      alert('Coupon deleted successfully!');
      refetchData()
    } catch (error) {
      console.error(error);
      alert('Failed to delete coupon. Please try again later.');
    }
  }
  }
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="title flex justify-between p-5 items-center">
        <h2 className="text-xl font-extrabold dark:text-white">Coupons</h2>
       
       <button onClick={()=> setOpenAddCouponModal(true)} type="button" class="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Coupon</button>
   
   
    </div>
 
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Discount ID
                </th>
                <th scope="col" class="px-6 py-3">
                   Coupon Code
                </th>
                <th scope="col" class="px-6 py-3">
                    Discount Percent
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
                    {item?.discountID ?? '-'}
                </th>
                <td class="px-6 py-4">
                    {item?.couponCode ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item?.discountPercent ?? '-'}
                </td>

                <td class="px-6 py-4">
                    <button onClick={e => handleDelete(item?.discountID)} class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
            
            </tr>
        ))}
            
            
        </tbody>
    </table>

    <Modal show={openAddCouponModal} size="md" onClose={onCloseAddCouponModal} popup>
        <Modal.Header />
        <Modal.Body>
          <AddCouponModal refresh={refetchData} closeModal={onCloseAddCouponModal}/>
        </Modal.Body>
      </Modal>


    </div>
  )
}

export default ManageDiscounts