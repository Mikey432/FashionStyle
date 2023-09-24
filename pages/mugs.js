import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from './models/Product';

const Mugs = ({products}) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry,We are currently out of stock,please stay tuned</p>}
            {Object.keys(products).map((item)=>{
            return <Link key={products[item]._id} legacyBehavior href={`/product/${products[item].slug}`}>
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg mx-8 my-2">
                <a className="block relative rounded overflow-hidden ">
                  <img alt="ecommerce" className="w-[56vw] h-[32vh] md:w-[56vw] md:h-[45vh] block m-auto md:m-0 p-3" src={products[item].img} />
                </a>
                <div className="mt-4 m-auto">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Mugs</h3>
                  <h2 className="text-gray-900 title-font text-sm font-sm">{products[item].title}</h2>
                  <p className="my-1 text-sm ">${products[item].price}</p>
                  <p className="mt-2 text-sm">
                  {products[item].size.includes("S") && <span className='border border-gray-300 p-1 mr-1 my-1'>S</span>}
                  {products[item].size.includes("M") && <span className='border border-gray-300 p-1 m-1'>M</span>}
                  {products[item].size.includes("L") && <span className='border border-gray-300 p-1 m-1'>L</span>}
                  {products[item].size.includes("XL") && <span className='border border-gray-300 p-1 m-1'>XL</span>}
                  {products[item].size.includes("XXL") && <span className='border border-gray-300 p-1 m-1'>XXL</span>}
                 </p>
                  <p className="mt-2 text-sm">
                  {products[item].color.includes("red") &&  <button className="border-2 mr-1 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("blue") && <button className="border-2 m-1 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("green") && <button className="border-2 m-1 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("purple") && <button className="border-2 m-1 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes("yellow") && <button className="border-2 m-1 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                 </p>
                </div>
              </div>
            </Link>})}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONG_URL)
  }
  let products = await Product.find({category:"Mugs"})
  let Mugs = {}
    for(let item of products){
        if(item.title in Mugs){
            if(!Mugs[item.title].color.includes(item.color)&&item.availableQty>0){
                Mugs[item.title].color.push(item.color)
            }
            if(!Mugs[item.title].size.includes(item.size)&&item.availableQty>0){
                Mugs[item.title].size.push(item.size)
            }
        }
        else{
            Mugs[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty>0){
                Mugs[item.title].color = [item.color]
                Mugs[item.title].size = [item.size]
            }
        }
    }
  return {
    props: {products:JSON.parse(JSON.stringify(Mugs))},
  }
}

export default Mugs