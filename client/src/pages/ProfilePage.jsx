import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';


const ProfilePage = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Martin Smith");
  const [bio, setBio] = useState("Hi, I'm Martin. A passionate developer and tech enthusiast. I am using  ");

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'> 
        <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
          <form className='flex flex-col gap-5 p-10 flex-1'>
            <h3 className='text-lg'>Profile Detail</h3>
            <label htmlFor="avtar" className='flex items-center gap-3 cursor-pointer'></label>
            <input onChange={(e)=>setSelectedImage(e.target.files)} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={""} alt="" />
          </form>
          <img src="" alt="" />
        </div>
    </div> 
  )
}

export default ProfilePage
