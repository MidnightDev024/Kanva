import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ selectedUser, setSelectedUser }) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src="./src/assets/logo1.svg" alt="Logo" className='max-w-40' />
          <div relative py-2 group>
            <img src="./src/assets/menu_icon.png" alt="Menu Icon" className='max-h-5 cursor-pointer' />
            <div className=''>
              <p className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='my-2 border-t border-gray-500' />
              <p className='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
