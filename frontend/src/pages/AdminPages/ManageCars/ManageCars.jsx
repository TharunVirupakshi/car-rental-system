import {useState, useMemo, useEffect } from 'react'
import APIService from '../../../middleware/APIService';
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/firebase';
import { async } from '@firebase/util';
import NO_IMAGE_PHOTO from '../../../assets/car_no_image_small.jpg'


const AddCarModal = ({closeModal, refresh}) =>{
  const [data, setData] = useState({
    vehicleNo: '',
    model: '',
    carType: '',
    photoUrl: '',
    locationID: null
  });

  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleData = (e) => {
    
    setData(prev => (
      {
        ...prev,
        [e.target.name] : e.target.value
      }
    ))
  }
  
  // useEffect(()=>     console.log('data:', data), [data])
  // Function to handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      console.log('Image selected: ', url);
      setImageUrl(url);
    }
  };
   // Function to handle image upload
   const uploadImage = async() => {
    if (!imageFile) return;

    const storageRef = ref(storage, `images/${imageFile.name}`);
    try {
      // Upload the file
      const snapshot = await uploadBytes(storageRef, imageFile);
      // Get the download URL
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Failed to upload image. Please try again."); // Throw a new error
    }
  };

  const handleSubmit = async() => {
      try {
        let imageUrl = '';
        if (imageFile) {
          imageUrl = await uploadImage(); // Ensure image is uploaded before submitting
        }
         // Directly include the photoUrl in the data object
        const carData = {
          ...data,
          photoUrl: imageUrl,
        };

        console.log("Submitting... ", carData)
        const res = await APIService.addCar(carData)
        if(res?.success ?? false){
          alert('Car Added!')
        }
        refresh()
        closeModal()
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
  }

  return(
    <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">New car details</h3>
           
            <div>
              <div className="mb-2 block">
                <Label htmlFor="vehicleNo" value="Vehicle No" />
              </div>
              <TextInput name='vehicleNo' id="vehicleNo" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="model" value="Model Name" />
              </div>
              <TextInput name='model' id="model" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="carType" value="Type" />
              </div>
              <TextInput name='carType' id="carType" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="location" value="Location ID" />
              </div>
              <TextInput name='locationID' id="location" type="number" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="photo" value="Photo" />
              </div>
              <TextInput name='photoUrl' id="photoUrl" type="file" onChange={handleImageSelect} accept="image/*" required/>
            </div>
            {/* <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div> */}
            <div className="w-full">
              <Button onClick={handleSubmit}>Add car</Button>
            </div>
            {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div> */}
          </div>
  )
}

const EditModal = ({id, closeModal, refresh}) =>{
  const [data, setData] = useState({
    vehicleNo: '',
    model: '',
    carType: '',
    locationID: null,
    photoUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl,setImageUrl] = useState('');

  const [curCar, setCurCar] = useState(null)

  useEffect(()=>{
    const fetch = async() => {
      try {
        const data = await APIService.getCar(id)
        console.log('Fetched car', data)
        setCurCar(data[0])
        setData(prev => ({...prev, vehicleNo: data[0].vehicleNo}))
      } catch (error) {
        console.error('Error fetching car    :', error.message);
      }
    }

    fetch()
  }, [id])

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      console.log('Image selected: ', url);
      setImageUrl(url);
      setCurCar(prev => ({...prev, photoUrl : url}));
    }
  };
    // Function to handle image upload
    const uploadImage = async() => {
    if (!imageFile) return;

    const storageRef = ref(storage, `images/${imageFile.name}`);
    try {
      // Upload the file
      const snapshot = await uploadBytes(storageRef, imageFile);
      // Get the download URL
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Failed to upload image. Please try again."); // Throw a new error
    }
  }; 
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
        let imageUrl = '';
        if (imageFile) {
          imageUrl = await uploadImage(); // Ensure image is uploaded before submitting
        }
         // Directly include the photoUrl in the data object
        const carData = {
          ...data,
          photoUrl: imageUrl,
        };
        console.log('Details: ', carData)
        await APIService.updateCar(carData)
        alert('Saved!')
        refresh()
        closeModal()
      } catch (error) {
        console.log(error)
      }
  }

  const handleDelete = async() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
  if (confirmDelete) {
    try {
      await APIService.deleteCar(curCar?.vehicleNo);
      alert('Car deleted successfully!');
      refresh()
      closeModal()
    } catch (error) {
      console.error(error);
      alert('Failed to delete car. Please try again later.');
    }
  }
  }


  return(
    <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update car : <span className='text-sm font-semibold'>{curCar?.vehicleNo ?? ''}</span></h3>
           
            <div className="img-container">
              <img src={curCar?.photoUrl ?? NO_IMAGE_PHOTO} alt=""/>
            </div>

            <div className="w-full flex gap-4">
            <TextInput name='photoUrl' id="photoUrl" type="file" onChange={handleImageSelect} accept="image/*" required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label className='text-gray-500'  htmlFor="model"  value={`Model: `} />
                <span className='text-sm font-semibold'>{curCar?.model ?? ''}</span>
              </div>
              <TextInput placeholder='Enter new model' name='model' id="model" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label className='text-gray-500' htmlFor="carType" value={`Car type: `} />
                <span className='text-sm font-semibold'>{curCar?.carType ?? ''}</span>
              </div>
              <TextInput  placeholder='Enter new car type' name='carType' id="carType" type="text" onChange={handleData} required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label  className='text-gray-500' htmlFor="location" value={`Location ID: `} />
                <span className='text-sm font-semibold'>{curCar?.locationID ?? ''}</span>
              </div>
              <TextInput placeholder='Enter new location id' name='locationID' id="location" type="number" onChange={handleData} required/>
            </div>
            {/* <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div> */}
            <div className="w-full flex gap-4">
              <Button onClick={handleSubmit}>Update car</Button>
              <button onClick={handleDelete} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Delete
              </button>
            </div>

           
            {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div> */}
          </div>
  )

}


const ManageCars = () => {

  const [data, setData] = useState([])
  
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [editVehicleNo, setEditVehicleNo] = useState(null)

  const fetchData = useMemo(() => async () => {
    try {
      const res = await APIService.getCars();
      if (res.length !== 0) {
        setData(res);
      }
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

  function onCloseModal() {
    setOpenModal(false);
  }
  function onCloseEditModal() {
    setOpenEditModal(false);
  }

  const handleEdit = (id) =>{
    setEditVehicleNo(id)
    setOpenEditModal(true)
  }

  return (
    
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="title flex justify-between p-5 items-center">
        <h2 className="text-xl font-extrabold dark:text-white">Cars</h2>
       
       <button onClick={()=> setOpenModal(true)} type="button" class="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add car</button>
   
   
    </div>
 
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Model
                </th>
                <th scope="col" class="px-6 py-3">
                    Vehicle No
                </th>
                <th scope="col" class="px-6 py-3">
                    Car Type
                </th>
                <th scope="col" class="px-6 py-3">
                    Location
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
                    {item?.model ?? '-'}
                </th>
                <td class="px-6 py-4">
                    {item?.vehicleNo ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item?.carType ?? '-'}
                </td>
                <td class="px-6 py-4">
                    {item?.locationID ?? '-'}
                </td>
                <td class="px-6 py-4">
                    <button onClick={e => handleEdit(item.vehicleNo)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
            
            </tr>
        ))}
            
            
        </tbody>
    </table>


 

    {/* Add car modal */}
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <AddCarModal closeModal={onCloseModal} refresh={refetchData}/>
        </Modal.Body>
      </Modal>
    <Modal show={openEditModal} size="lg" onClose={onCloseEditModal}  popup>
        <Modal.Header />
        <Modal.Body>
          <EditModal id={editVehicleNo} closeModal={onCloseEditModal} refresh={refetchData}/>
        </Modal.Body>
      </Modal>

</div>
  )
}

export default ManageCars