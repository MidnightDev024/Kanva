// import React, { useState } from 'react'
// import assets from '../assets/assets';

// const LoginPage = () => {

//   const [currState, setCurrState] = useState("Sign up")

//   const [fullName, setFullName] = useState("")

//   const [email, setEmail] = useState("")

//   const [password, setPassword] = useState("")

//   const [bio, setBio] = useState("")

//   const [isDataSubmited, setIsDataSubmited] = useState("false")


//   return (
//     <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
//       {/* --------- left ------------ */}
//       <img src={assets.logo_big} alt="" className='w-[max(250px)]'/>

//       {/* --------- right ------------ */}
//       <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
//         <h2 className='font-medium text-2xl flex justify-between items-center'>
//           {currState}
//           <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
//           </h2>
 
//           {currState === "Sing up" && !isDataSubmited && (
//             <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required/>
//           )}

//           {!isDataSubmited && (
//               <>
//               <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
//               <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
//               </>
//             )
//           }

//           {currState === "Sign up" && isDataSubmited && (
//               <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a Short bio... ' required></textarea>
//             )
//           }
          
//           <button className='py-3 bg-gradient-to-r from-purple-400-to-violet-600 text-white rounded-md cursor-pointer'>
//             {currState === "Sign Up" ? "Create Account" : "Login Now"}
//           </button>

//           <div className='flex item-center gap-2 text-sm text-gary-500'>
//             <input type="checkbox" />
//             <p>Agree to terms of use and privacy policy</p>
//           </div>

//       </form>
//     </div>
//   )
// }

// export default LoginPage




import React from 'react'
import assets from '../assets/assets';

const LoginPage = () => {

  const [currState, setCurrState] = React.useState("Sign up")

  const [fullName, setFullName] = React.useState("")

  const [email, setEmail] = React.useState("")

  const [password, setPassword] = React.useState("")

  const [bio, setBio] = React.useState("")  

  const [isDataSubmited, setIsDataSubmited] = React.useState(false)

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* --------Left----------- */}
      <img src={assets.logo_big} alt="" className='w-[max(250px)]'/>

      {/* --------Right----------- */}
      <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          </h2>

          {currState === "Sign up" && !isDataSubmited && (
            
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required/>
          )}
          
          {!isDataSubmited && ( 
            <>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Email Address' required />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' required />
            </>
          )}

          { currState === "Sign up" && isDataSubmited && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a Short bio... ' required></textarea>
          )}   

          <button className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
            {currState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>

          <div className='flex item-center gap-2 text-sm text-gary-500'>
            <input type="checkbox"  />
            <p>Agree to terms of use and privacy policy</p>
          </div>

          <div className='flex flex-col gap-2'>
            {currState === "Sign up" ? ( 
              <p className='text-sm text-gray-600'>Already have an account? 
                <span className='text-blue-500 cursor-pointer' onClick={() => {setCurrState("Login"); setIsDataSubmited(false);}}>Login</span>
              </p>
            ) : (
              <p className='text-sm text-gray-600'>Don't have an account? 
                <span className='text-blue-500 cursor-pointer' onClick={() => setCurrState("Sign up")}>Sign Up</span>
              </p>
            )}
          </div>
      </form>
    </div>
  )
}

export default LoginPage
