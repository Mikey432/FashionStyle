import React from 'react'
import Link from 'next/link'
import Order from '../../models/Order'
import mongoose from "mongoose";

const MyOrder = ({cart,order}) => {
  console.log(order)
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">Codewear.com</h2>
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">Order Id:#772348</h1>
              <p>Your order has been successfully placed</p>
              <div className="flex m-2">
                <a className="flex-grow text-center py-2 text-lg px-1">Title</a>
                <a className="flex-grow text-center py-2 text-lg px-1">Quantity</a>
                <a className="flex-grow text-center py-2 text-lg px-1">Price</a>
              </div>
              {Object.keys(cart).map((k) => {
                return <div key={k} className="flex border-t border-gray-200 py-2 m-2">
                  <div className="mx-auto text-gray-500 w-[6vw]">{cart[k].name}</div>
                  <div className="mx-auto text-gray-900">{cart[k].qty}</div>
                  <div className="mx-auto text-gray-900">${cart[k].price}</div>
                </div>
              })}
              <div className="flex">
                <span className="title-font font-medium text-xl text-gray-900">Subtotal:$58.00</span>
                <Link href={'/orders'} className='ml-auto'>
                  <button className="flex ml-auto text-sm text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded">Track Order</button>
                </Link>
              </div>
            </div>
            <img alt="ecommerce" className="lg:w-[32rem] w-full lg:h-[28rem] h-60 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONG_URL)
  }
  let order = await Order.findById(context.query.id)
  console.log(order)
  return {
      props: { order: JSON.parse(JSON.stringify(order))},
  }
}

export default MyOrder