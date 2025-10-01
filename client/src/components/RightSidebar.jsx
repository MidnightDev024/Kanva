import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';

const RightSideBar = ({ selectedUser }) => {
  return selectedUser ? (
    <div className='relative bg-[#8185B2]/10 h-full p-5 rounded-l-xl text-white'>
      {/* ------profile info----------- */}
      <div className='flex flex-col items-center gap-4'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full' />
        <div className='text-center'>
          <h1 className='text-xl font-medium flex items-center justify-center gap-2'>
            {selectedUser.fullName}
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          </h1>
          <p className='text-gray-300 mt-2'>{selectedUser.bio}</p>
        </div>
      </div>
      <hr className='border-[#fffffff50] my-4' />
      {/* ------------media----------- */}
      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {imagesDummyData.map((url, index)=> (
            <div key={index} onClick={()=> window.open(url)} className='cursor-pointer rounded'>
              <img src={url} alt="" className='h-full rounded-md' />
            </div>
          ))}
        </div>
      </div>
      {/* ---------logout---------- */}
      <button className='absolute bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
        Logout
      </button>
    </div>
  ) : null
}

export default RightSideBar
