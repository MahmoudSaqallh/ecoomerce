import Link from 'next/link'
import BlogsData from "@/app/jsonData/BlogsData.json";
import { count } from 'console';
import Image from "next/image";
import Follower from '../Index/Follower/Page';
import { ToastContainer } from 'react-toastify';


const category = [
  { name: "Dresses", count: 10 },
  { name: "Top & Blouses", count: 5 },
  { name: "Boots", count: 15 },
  { name: "Jewelry", count: 8 },
  { name: "Makeup", count: 11 },
  { name: "Fragrances", count: 17 },
  { name: "Shaving & Grooming", count: 13 },
  { name: "Jacket", count: 9 },
  { name: "Coat", count: 13 },
]


const tags = [
  "Vintage",
  "Wedding",
  "Cotton",
  "Line",
  "Navy",
  "Urban",
  "Business",
  "Meeting",
  "Formal"
]

export default function Blog() {

  const posts = BlogsData.slice(4,7)
  return (
    <>
        {/* page title */}
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">Blog</h2>
          <div className="flex mt-5 text-2xl items-center text-center">
            <Link href="/" className="hover:text-(--prim) text-white">
              Home
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>

            <span className="text-white">Blog</span>
          </div>
        </div>
      </div>


      <div className="px-[8%] lg:px-[16%] py-30 pt-10">
        
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          
          <div className="w-full lg-1/1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {BlogsData.map((blog , index) => (
                    <Link href={`/Ui-components/Blogs/${blog.id}`} key={index}>
                      <div className="blog-card cursor-pointer">
                        <div className="blog-img">
                          <Image src = {blog.image} alt = {blog.title} width={500} height={500} className='w-full h-full rounded-t-2xl' />
                        </div>

                        <div className="bg-(--prim) px-4 py-5 rounded-b-2xl">
                          <span className='text-lg bg-black text-white px-4 py-1 rounded-lg'>{blog.date}</span>
                          <h2 className='my-3 text-2xl GolosText font-semibold '>{blog.title}</h2>
                          <div className=''>
                            <button className='underline py-2 rounded-full GolosText font-semibold hover:translet-x-2 transition-all duration-300 cursor-pointer'>Read More <i className='bi bi-chevron-right ps-2 '></i></button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
          </div>


          <div className="w-full lg:w-1/2 sticky top-25 left-0 h-full">
                  <h2 className='Lufga text-2xl font-medium'>category</h2>
                  <div className="flex flex-col mt-5 gap-2 ">
                    {category.map((cat , index) => (
                      <div className="group flex items-center justify-between cursor-pointer">
                        <h2 className='text-lg GolosText flex items-center gap-2 group-hover:ps-2 transition-all duration-300  group-hover:text-(--second)'>
                          <i className='bi bi-arrow-right'></i>{cat.name}
                        </h2>

                        <h3 className='group-hover:text-(--second) transition-all duration-300'>
                          {cat.count}
                        </h3>
                      </div>
                    ))}
                  </div>


                  <div className="mt-10">
                      <h2 className="Lufga text-2xl font-medium mb-5">
                        Lastest Post
                      </h2>

                      <div className="flex flex-col gap-10">
                        {posts.map((posts , index) => (
                          <Link href={`/my-app/app/Ui-components/Blogs/${posts.id}`} key={index} className='flex items-center gap-5 cursor-pointer'>
                            <div className="w-1/3 rounded-xl overflow-hidden ">
                                <Image src={posts.image} alt={posts.image} width={500} height={500} className='w-full h-full object-cover' />
                            </div>

                            <div className="flex flex-col">
                              <p className='GolosText text-sm text-gray-500'>
                                {posts.date}
                              </p>

                              <h3 className='GolosText text-lg font-semibold hover:text-(--second) transition-all duration-300'>
                                {posts.title}
                              </h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                  </div>

            <div className="mt-10">
                <h2 className='Lugga text-2xl font-medium mb-5 '>Tags</h2>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tags , index) => (
                     <span key={index} className='px-4 py-2 text-sm GolosText border rounded-md text-black hover:bg-black hover:text-white cursor-pointer transition-all duration-300 '>
                      {tags}
                     </span>
                  ))}
                </div>
            </div>              
                  
          </div>


          
        </div>

      </div>



          <Follower/>
                        < ToastContainer position="top-right" autoClose={1500}/>
    </>
  )
}
