import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router'

const MyAccount = ({addToCart,cart,subTotal,removeFromCart,user}) => {
  const router = useRouter()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [address, setaddress] = useState('')
  const [password, setpassword] = useState('')
  const [cpassowrd, setcpassowrd] = useState('')
  const [pincode, setpincode] = useState('')
  const [token, setToken] = useState('')
  
  const handlechange = (e)=>{
    if (e.target.name == "name") {
      setname(e.target.value)
    }
    else if (e.target.name == "email") {
      setemail(e.target.value)
    }
    else if (e.target.name == "phone") {
      setphone(e.target.value)
    }
    else if (e.target.name == "address") {
      setaddress(e.target.value)
    }
    else if (e.target.name == "pincode") {
      setpincode(e.target.value)
    }
    else if (e.target.name == "password") {
      setpassword(e.target.value)
    }
    else if (e.target.name == "cpassword") {
      setcpassowrd(e.target.value)
    }
  }
  useEffect(() => {
    const userToken = localStorage.getItem('token')
    if(!userToken){
      router.push('/') 
    }
    if(userToken){
      setToken(userToken)
      fetchdata()
    }
  }, [])
  
  const fetchdata = async() =>{
    let data = {token:token}
    console.log(token)
    const response = await fetch("http://localhost:3000/api/getuser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
  }
  const onSubmitUser = async() =>{
    let data = {token:token,address,name,phone,pincode}
    console.log(data)
    const response = await fetch("http://localhost:3000/api/updateuser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
  }

  const initiatePayment = async () =>{
    const oid = Math.floor(Math.random()*Date.now())
    const data = {oid,cart,subTotal,address,email}
    const response = await fetch("http://localhost:3000/api/addorders", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  }
  return (
    <div className='mx-auto'>
      <h1 className='text-3xl font-bold text-center'>Update details</h1>
      <div className='container my-3 p-3'>
        <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
        <div className="flex">
          <div className='w-1/2 mx-2 my-1'>
            <div className="p-2">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handlechange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='w-1/2 mx-2 my-1'>
            <div className="p-2">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input onChange={handlechange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className='w-full mx-2 my-1'>
          <div className="p-2">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handlechange} value={address} type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="flex">
          <div className='w-1/2 mx-2 my-1'>
            <div className="p-2">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input onChange={handlechange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='w-1/2 mx-2 my-1'>
            <div className="p-2">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
            <input onChange={handlechange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          </div>
          
        </div>
        <button onClick={onSubmitUser} className='border-2 border-pink-200 bg-pink-500 m-3 p-2 rounded-xl'>Submit</button>
      </div>
      <div className='mx-auto ml-2'>
      <h2 className='font-semibold text-xl mx-auto'>2.Reviews item and Pay</h2>    
        <div>
        <div className="flex">
          <div className='w-1/2 mx-2 my-1'>
            <div className="p-2">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input onChange={handlechange} value={password} type="password" id="password" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className='w-1/2 mx-2 my-1'>
            <div className="p-2">
              <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm password</label>
              <input onChange={handlechange} value={cpassowrd} type="password" id="cpassword" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        </div>
      </div>
      <button className='border-2 border-pink-200 bg-pink-500 mx-5 my-2f p-2 rounded-xl'>Submit</button>
    </div>
  )
}

export default MyAccount