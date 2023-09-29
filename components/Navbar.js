'use client'
import React, { useRef } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseSquare, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi'
import { BiSolidUserAccount } from 'react-icons/bi'

const Navbar = ({ logout,user, addToCart, removeFromCart, clearCart, cart, subTotal }) => {
    const ref = useRef()
    const [dropdown, setdropdown] = useState(false)
    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (ref.current.classList.contains('translate-x-0')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky bg-white top-0 z-10 '>
            <div className='logo'>
                <Link legacyBehavior href={'/'}>
                    <a>
                        <div className='flex mx-3'>
                            <Image src={'/Home.png'} alt='Error' width={40} height={5}></Image>
                            <h3 className='my-2'>FashionStyle.com</h3>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="nav">
                <ul className='flex my-3 items-center text-xs md:text-4xs'>
                    <Link legacyBehavior href={'/tshirt'}><a><li className='mx-2 font-bold'>Tshirt</li></a></Link>
                    <Link legacyBehavior href={'/hoodies'}><a><li className='mx-2 font-bold'>Hoodies</li></a></Link>
                    <Link legacyBehavior href={'/mugs'}><a><li className='mx-2 font-bold'>Mugs</li></a></Link>
                    <Link legacyBehavior href={'/stickers'}><a><li className='mx-2 font-bold'>Stickers</li></a></Link>
                </ul>
            </div>
            <div className="absolute right-0 top-2 items-center cursor-pointer cart flex md:mx-5 mx-3">
                <a onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}}>
                    {dropdown && <div onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}} className='absolute right-7 top-6 bg-white border rounded-md py-3 px-5 w-32'>
                        <ul>
                            <Link legacyBehavior href={'/myaccount'} ><li className='hover:text-blue-600 font-bold text-sm my-1' >My account</li></Link>
                            <Link legacyBehavior href={'/orders'} ><li className='hover:text-blue-600 font-bold text-sm my-1'>Orders</li></Link>
                            <li onClick={logout} className='hover:text-blue-600 font-bold text-sm my-1'>Logout</li>
                        </ul>
                    </div>}
                    {user.value && <BiSolidUserAccount className='text-2xl mx-1 ' />}
                </a>
                {!user.value && <Link href={'/login'} legacyBehavior><a><button className='bg-blue-700 px-2 py-1 rounded-md mx-2 text-sm text-white'>Login</button></a></Link>}
                <AiOutlineShoppingCart className='text-2xl mx-1' onClick={toggleCart} />
            </div>
            <div ref={ref} className={`w-[18rem] h-[26rem] md:w-[22rem] md:h-[30rem] overflow-y-scroll shopCart absolute right-0 top-0 bg-blue-100 py-8 px-4 transform transition-transform ${Object.keys(cart).length!==0?'translate-x-0':'translate-x-full'} z-10`}>
                <h2 className='font-bold text-center '>Shoping Cart</h2>
                <span className='absolute right-2 top-5 text-blue-500 text-2xl cursor-pointer' onClick={toggleCart}><AiFillCloseSquare /></span>
                <ol className='list-decimal mx-6 my-4 font-semibold'>
                    {Object.keys(cart).length == 0 && <div className='my-4'>Your Cart is Empty</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex">
                                <div className='w-2/3 font-semibold mx-2 my-4'>{cart[k].name}({cart[k].variant}/{cart[k].size})</div>
                                <div className='w-1/3 mx-2 my-4 font-semibold flex text-center justify-center '><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].size,cart[k].variant,cart[k].price,cart[k].name) }} className='mx-1 my-1 text-lg text-blue-500' /><span>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].size,cart[k].variant,cart[k].price,cart[k].name) }} className='mx-1 my-1 text-lg text-blue-500' /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="m-3 font-bold">Subtotal:${subTotal}</div>
                <div className="flex">
                    <Link href={'/checkout'}>
                        <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded text-sm"><FiShoppingBag className='m-1' />Checkout</button>
                    </Link>
                    <button onClick={() => { clearCart() }} className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded text-sm">Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar