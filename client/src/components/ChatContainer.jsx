import React, { useEffect, useRef } from 'react';
import assets from '../assets/assets.js';
import toast from 'react-hot-toast';
import { formateMessageTime } from '../library/utils.js';
import { chatContext } from "../context/chatContext.jsx";
import { authContext } from '../context/authContext.jsx';

const ChatContainer = () => {

  const {messages, selectedUser, setSelectedUser, sendMessage, getMessages, clearMessages, setRightSidebarOpen} = React.useContext(chatContext);

  const { axios } = React.useContext(authContext);

  const {authUser, onlineUsers} = React.useContext(authContext);

  const scrollEnd = useRef();

  const [input, setInput] = React.useState('');

  // handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(input.trim() === "") return null;
    await sendMessage({text : input.trim()});
    setInput("");
  }

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if(!file || !file.type.startsWith('image/')){
      toast.error('Please select a valid image file');
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({image: reader.result});
      e.target.value = "";
    }
    reader.readAsDataURL(file);
  }

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(()=>{
    if(scrollEnd.current && messages){
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  },[messages]);
  
  return selectedUser ?  (
      <div className='h-full overflow-scroll relative' style={{ backgroundImage: `url(${assets.chatBg})`, backgroundSize: 'cover' }}> {/* add image.png in background for ChatContainer */}
      {/* ---------- Header -------------- */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser?.profilePicture || assets.avatar_icon} alt="User Profile Pic" className='w-8 rounded-full'/>
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser?.fullName || selectedUser?.fullname || 'Unknown'}
          {((onlineUsers || []).includes(selectedUser._id)) && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
        </p>
        <div className='flex items-center gap-3'>
          <button onClick={async ()=>{
            const ok = window.confirm('Delete this conversation? This cannot be undone.');
            if(!ok) return;
            try{
              const { data } = await axios.delete(`/api/messages/clear/${selectedUser._id}`);
              if(data.success){
                clearMessages();
                setSelectedUser(null);
                toast.success('Conversation deleted');
              } else {
                toast.error(data.message || 'Could not delete conversation');
              }
            } catch(err){
              toast.error(err?.response?.data?.message || err.message || 'Delete failed');
            }
          }} className='text-sm text-red-400 hover:text-red-300 cursor-pointer px-2 py-1 rounded'>
            Delete
          </button>
          <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        </div>
        <img onClick={() => setRightSidebarOpen(prev => !prev)} src={assets.info_icon} alt="Info" className='max-md:hidden max-w-6.3 max-h-7 cursor-pointer'/>
      </div>
      {/* ---------- chat area ------------ */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.filter(Boolean).map((msg, index)=> (
          <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId !== authUser._id ? 'rounded-bg-none' : 'rounded-bl-none'}`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              <img src={msg.senderId === authUser._id ? authUser?.profilePicture || assets.avatar_icon : selectedUser?.profilePicture || assets.avatar_icon} alt="" className='w-7 rounded-full' />
              <p className='text-gray-500'>{formateMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/* --------- bottom area --------- */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder='Sent a message...' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
          <input onChange={handleSendImage} type="file" id="image" accept='image/png, image/jpeg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' /> 
          </label>
        </div>
        <img src={assets.send_button} alt="" className='w-7 cursor-pointer'/>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img onClick={handleSendMessage} src={assets.logo_icon} alt=""  className='max-w-16' />
      <p className='text-lg font-medium text-white'>JUST KANVA IT...</p>
    </div>
  )
}

export default ChatContainer;