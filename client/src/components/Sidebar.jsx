import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userDummyData } from '../assets/assets';

const Sidebar = ({ selectedUser, setSelectedUser }) => {

  const navigate = useNavigate();

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src="./src/assets/logo1.svg" alt="Logo" className='max-w-40' />
          <div className='relative py-2 group'>
            <img src="./src/assets/menu_icon.png" alt="Menu Icon" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-5  rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='my-2 border-t border-gray-500' />
              <p onClick={()=>navigate('/logout')} className='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>
        </div>

        <div className='bg-[#282142] rounded-full flex item-center gap-2 py-3 px-4 mt-5'>
          <img src='./src/assets/search_icon.png' alt="search" className='w-3' />
          <input type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User...'/>
        </div>

        <div className='flex flex-col'>
          {userDummyData.map((user, index) => {
            <div>
              <img src="{user?.profilePic || assets.avatar_icon}" alt="" />
            </div>
          })}
        </div>

      </div>
    </div>
  )
}

export default Sidebar
