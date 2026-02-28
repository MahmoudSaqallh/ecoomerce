
"use client";

import Link from 'next/link'
import BlogsData from "@/app/jsonData/BlogsData.json";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import quote from "@/public/quote.png";
import gallery1 from "@/public/blog-gallery-1.webp";
import gallery2 from "@/public/blog-gallery-2.webp";
import gallery3 from "@/public/blog-gallery-3.webp";
import gallery4 from "@/public/blog-gallery-4.webp";
import gallery5 from "@/public/blog-gallery-5.webp";
import Follower from '../../Index/Follower/Page';



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


export default function BlogsDetailes() {

  const posts = BlogsData.slice(4,7)

const params = useParams();
const id = params?.id;
const blog = BlogsData.find((b) => b.id === Number(id));




if(!blog) {
  return (
    <div className="py-20 text-center text-3xl font-bold">Blog Not found</div>
  )
}


  return (
    <>
        {/* page title */}
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">Home</h2>
          <div className="flex mt-5 text-2xl items-center text-center">
            <Link href="/Ui-components/Blogs" className="hover:text-(--prim) text-white">
              Blog
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white"></i>

            <span className="text-white">Blog Detailse</span>
          </div>
        </div>
      </div>



      <div className="px-[8%] lg:px-[16%] py-30 pt-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full lg:w-1/1">
              <h2 className="GolosText text-5xl font-semibold">
                {blog.title}
              </h2>

              <div className="flex items-center gap-2 my-3">
                <span className='px-3 py-1 bg-(--prim) GolosText'>
                  {blog.date}
                </span>


                <span className='ps-3'><i className='bi bi-person-fill'></i>By KK mahmoud</span>
                <span className='ps-3'><i className='bi bi-chat-left-dots-fill'></i>35 comments</span>
              </div>


        <div className="">
          <Image src={blog.image} alt={blog.title} width={800} height={800} className='w-full h-full rounded-2xl mt-5' />
        </div>


        <p className="mt-3 GolosText tracking-wider text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>

        <div className="my-5 border rounded-2xl p-5 relative">
          <h4 className='GolosText  text-2xl font-semibold '>
            Create An Information Architecture That’s Easy To Use Way Precise Usability Considerations For Partially
          </h4>

          <h2 className='GolosText font-semibold mt-5'>
            <span className='font-black pe-1 '>_____</span> RonaldM. Spino
          </h2>

          <Image src={quote} className='rounded-2xl mt-5 absolute top-10 right-10 ' alt="quote" width={80} height={80} />
        </div>

        <p className='my-8 GolosText tracking-wide text-lg'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>


        <div className="flex flex-col gap-5 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Image src={gallery1} alt='gallery1' width={500} height={500} className='w-full h-full rounded-2xl' />
            <Image src={gallery2} alt='gallery1' width={500} height={500} className='w-full h-full rounded-2xl' />
            <Image src={gallery3} alt='gallery1' width={500} height={500} className='w-full h-full rounded-2xl' />
            <Image src={gallery4} alt='gallery1' width={500} height={500} className='w-full h-full rounded-2xl' />
            <Image src={gallery5} alt='gallery1' width={500} height={500} className='w-full h-full rounded-2xl' />
          </div>
        </div>

        <p className='my-8 GolosText tracking-wide text-lg'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>


        <h2 className='GolosText text-2xl font-semibold'>Additional information</h2>
        <p className="GolosText tracking-wide text-lg">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <p className=" GolosText tracking-wide text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>


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
    </>
  )
}
