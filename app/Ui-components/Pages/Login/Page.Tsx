import Link from 'next/link'
import Image from "next/image";
import loginImg from "@/public/login-img.webp"
export default function Login() {
  return (
      <>
      <div className="">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-1/2 hidden lg:block bg-[#ffedd4]">
              <div className="absolute top-30 lg:top-50 left-10 z-10">
                <h2 className='text-black text-4xl GolosText font-semibold'>
                  Login
                </h2>

                <div className="flex mt-5 text-2xl items-center text-black">
                  <Link href='/' className='font-semibold hover:text-(--second) transition-all duration-300' >Home</Link>
                  <i className='ri-arrow-right-wide-line pt-2 px-2'></i>
                  <span>Login</span>
                </div>
              </div>

              <div className="login-image relative ps-20">
                  <Image src={loginImg} alt='loginImg' />
              </div>
          </div>


          <div className="w-full lg:w-1/2">
              <div className="flex items-center justify-center px-[8%] lg:px-[16%] py-15 min-h-screen">
                <div className="border w-[90%] max-w-xl p-10 border-black rounded-2xl">
                  <h2 className='text-3xl Lufga font-bold text-center mb-3 '>Login</h2>
                  <p className='text-gray-500 text-center mb-6'>welcome pleace login to your account</p>

                  <div className="space-y-5">
                    <div className="email-detailes">
                      <label className='Lufga'>Email Adress</label>
                      <input type="email" className='w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none' placeholder='Email Adress' />
                    </div>
                    <div className="Password-detailes">
                      <label className='Lufga'>Password</label>
                      <input type="text" className='w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none' placeholder='Enter the Password' />
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <label className='flex items-center gap-1 cursor-pointer mt-5'>
                      <input type='checkbox' className='mt-1' />
                      <span className='text-gray-300'>Remmember me</span>
                    </label>
                  </div>


                  <div className="flex items-center justify-center gap-2 mt-5">
                    <button className='btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300 '>
                      SIGN IN
                    </button>
                    <a href= "/Ui-components/Pages/Regester" className='btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300 '>
                    Regester
                    </a>
                  </div>
                </div>
                
              </div>

              
          </div>



        </div>
      </div>
      
      </>
  )
}
