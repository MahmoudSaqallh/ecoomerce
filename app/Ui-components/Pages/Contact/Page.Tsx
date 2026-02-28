import React from 'react'

export default function Contact() {
  return (
  <>
  
            <div className="flex items-center justify-center px-[8%] lg:px-[16%] py-15 min-h-screen">
                <div className="border w-[90%] max-w-xl p-10 border-black rounded-2xl">
                  <h2 className='text-3xl Lufga font-bold text-center mb-3 '>Contact us</h2>
                  <div className="space-y-5">
                    <div className="user-detailes">
                      <label className='Lufga'>Username</label>
                      <input type="email" className='w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none' placeholder='Username ' />
                    </div>
                    <div className="email-detailes">
                      <label className='Lufga'>Email Adress</label>
                      <input type="email" className='w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none' placeholder='Email Adress' />
                    </div>
                    <div className="Phone-Number-detailes">
                      <label className='Lufga'>Phone Number</label>
                      <input type="number" className='w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none' placeholder='Enter the Phone Number' />
                    </div>
                    <div className="Phone-Number-detailes">
                                            <label className='Lufga'>Massage</label>

                    <textarea className='w-full px-4 py-3 border border-black bg-white hover:border-(--second) rounded-lg focus:outline-none'
                            id="msg"
                            name="msg"
                            placeholder= "Massage"
                            rows={6}
                            maxLength={300}
                          />
                    </div>
                  </div>

              


                  <div className="flex items-center justify-center gap-2 mt-5 ">
                    <button className='btn bg-black text-white cursor-pointer GolosText px-4 py-2 rounded-md transition-all duration-300 w-full '>
                      Subment
                    </button>
              
                  </div>
                </div>
                
              </div>
  
  </>
  )
}
