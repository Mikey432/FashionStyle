import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Checkout = ({addToCart,cart,subTotal,removeFromCart}) => {
  const router  = useRouter()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [address, setaddress] = useState('')
  const [pincode, setpincode] = useState('')
  const [disabled, setdisabled] = useState(true)
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
    if(name.length>3 && email.length>3 && phone.length>3 && address.length>3 && pincode.length>3 ){
      setdisabled(false)
    }
    else{
      setdisabled(true)
    }

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
    <div className='container my-3 p-3'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
      <h1 className='font-bold text-center text-3xl'>CheckOut</h1>
      <h2 className='font-semibold text-xl mx-auto'>1.Delivery Details</h2>
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
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className='w-1/2 mx-2 my-1'>
          <div className="p-2">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='w-1/2 mx-2 my-1'>
          <div className="p-2">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
            <input onChange={handlechange} value={pincode} type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
    <h2 className='font-semibold text-xl mx-auto'>2.Reviews item and Pay</h2>
    <div className="items">
    <div className="shopCart bg-blue-100 m-2 p-2 z-10">
                <ol className='list-decimal mx-6 my-2 font-semibold'>
                    {Object.keys(cart).length == 0 && <div className='my-4'>Your Cart is Empty</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex">
                                <div className='font-semibold mx-2 my-2'>{cart[k].name}({cart[k].variant}/{cart[k].size})</div>
                                <div className='mx-10 my-2 font-semibold flex text-center justify-center '><AiFillMinusCircle onClick={() => {removeFromCart(k, 1, cart[k].size, cart[k].variant, cart[k].price, cart[k].name)}} className='m-1  text-lg text-blue-500' /><span>{cart[k].qty}</span><AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].size, cart[k].variant, cart[k].price, cart[k].name)}} className='m-1 text-lg text-blue-500' /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="m-3 font-bold">Subtotal:${subTotal}</div>
            </div>
            <Link href={'/order'}>
            <button onClick={initiatePayment} disabled={disabled} className="disabled:bg-blue-200 flex m-3 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded text-sm">Pay:${subTotal}</button>
            </Link>
    </div>
    </div>
  )
}

export default Checkout