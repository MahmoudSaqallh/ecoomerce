import Link from 'next/link'
import Image from "next/image";
import voucher1 from "@/public/Voucher-1.webp"
import voucher2 from "@/public/Voucher-2.webp"
import voucher3 from "@/public/Voucher-3.webp"
import voucher4 from "@/public/Voucher-4.webp"
import voucher5 from "@/public/Voucher-4.webp"
import voucher6 from "@/public/Voucher-1.webp"
import Follower from '../../Index/Follower/Page';


const voucherdata = [
  {id: 1 , image: voucher1 , title : "The perfect gift for any occasion" , info : "Our gift cards are available in a range of denominations, so you can choose the perfect amount for any occasion." },
  {id: 2 , image: voucher2 , title : "Delight Someone with a Gift Voucher" , info : "Our gift cards are available in a range of denominations, so you can choose the perfect amount for any occasion." },
  {id: 3, image: voucher3 , title : "Let Them Choose Their Perfect Gift" , info : "Our gift cards are available in a range of denominations, so you can choose the perfect amount for any occasion." },
  {id: 4, image: voucher4 , title : "Experience the Ultimate Gift" , info : "Our gift cards are available in a range of denominations, so you can choose the perfect amount for any occasion." },
  {id: 5, image: voucher5 , title : "Experience the Ultimate Gift" , info : "Our gift cards are available in a range of denominations, so you can choose the perfect amount for any occasion." },
  {id: 6, image: voucher6 , title : "Experience the Ultimate Gift" , info : "Our gift cards are available in a range of denominations, so you can choose the perfect amount for any occasion." },

]

export default function Vouchers() {
  return (
        <>


        <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">Gift Vouchers</h2>
          <div className="flex mt-5 text-2xl items-center text-center">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>

            <span className='text-white'>Our Gift Vouchers</span>
          </div>
        </div>
        </div>




      <div className="px-[8%] lg:px-[16%] py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {voucherdata.map((item , key) => (
              <div className="" key={key}>


                <div className="mb-4">
                  <Image src={item.image} alt={item.title} className='w-full  rounded-2xl' />
                </div>

                <div>  
                  
                <h2 className='text-xl GolosText mt-4'>{item.title}</h2> 
                <p className='mt-4'>{item.info}</p> 
                </div>

              </div>
          ))}
        </div>
      </div>

    <Follower/>
        </>
  )
}
