import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from '../../models/Product'

const Orders = ({cart,products}) => {
    console.log(products)
    return (
        <div>
            <h1 className='font-semibold p-8 text-2xl text-center'>My Orders</h1>
            <div className='container mx-auto '>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">#OrderID</th>
                                            <th scope="col" className="px-6 py-4">Title</th>
                                            <th scope="col" className="px-6 py-4">Quantity</th>
                                            <th scope="col" className="px-6 py-4">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(cart).map((k)=>{
                                            return <tr key={k} className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                            <td className="whitespace-nowrap px-6 py-4">{cart[k].name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{cart[k].qty}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{cart[k].price}</td>
                                        </tr>
                                        }) }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONG_URL)
    }
    let products = await Product.findOne({ slug: context.query.slug })
    return {
        props: { products: JSON.parse(JSON.stringify(products)) },
    }
}

export default Orders