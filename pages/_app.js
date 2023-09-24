import '../styles/globals.css'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [user, setuser] = useState({ value: null })
  const [key, setkey] = useState()
  const [progress, setProgress] = useState(0)
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < (keys.length); i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(subt)
  }
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }
    const token = localStorage.getItem('token')
    if (token) {
      setuser({ value: token })
      setkey(Math.random())
    }
  }, [router.query])
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const addToCart = (itemCode, qty, size, variant, price, name) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, name, price, size, variant }
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (itemCode, qty, size, variant, price, name) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const buyNow = (itemCode, qty, size, variant, price, name) => {
    let newCart = {itemCode: { qty: 1, name, price, size, variant } }
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }
  const logout = () => {
    localStorage.removeItem("token")
    setuser({ value: null })
    setkey(Math.random())
    router.push('/')
  }
  return <>
    <LoadingBar
      color='#0000ff'
      progress={progress}
      waitingTime={100}
      onLoaderFinished={() => setProgress(0)}
    />
    <Navbar logout={logout} key={key} user={user} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} clearCart={clearCart} saveCart={saveCart} subTotal={subTotal}></Navbar>
    <Component {...pageProps} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} clearCart={clearCart} saveCart={saveCart} subTotal={subTotal} />
    <Footer></Footer>
  </>
}
