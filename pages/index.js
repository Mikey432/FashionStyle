import Content from './components/Content';
import Image from "next/image";


export default function Home() {
  return (
    <main >
      <div >
        <Image src={'/ecommerce-marketing-tips.jpg'} alt="Error" width={1540} height={100} priority={true}></Image>
        <Content></Content>
      </div>
    </main>
  )
}