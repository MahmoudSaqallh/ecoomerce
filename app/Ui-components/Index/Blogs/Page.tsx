"use client"
import BlogsData from "@/app/jsonData/BlogsData.json"

export default function Blogs() {
  return (
       <div className="px-[14%] lg-px-[16%] py-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
      <div>
        <h2 className='text-5xl font-medium  Lufga '>Lastest Post</h2>
        <p className='GolosText text-lg mt-1'>Discover the most treding post in <span className="text-(--second) font-semibold">FashiQue</span></p>
      </div>

      <div>
          <button className='btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md  transition-all duration-300'>
            View all 
          </button>
      </div>

    </div>

    <div className="ind-blog-warp grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
      {BlogsData.slice(0,4).map((blog,index) => (
        <div className="idx-blog-item" key={index}>
        <div className="bg-white p-7 flex flex-col lg:flex-row gap-5 rounded-2xl shadow-2xl">

  <div className="w-full lg:w-1/2">
    <div
      className="blog-image h-48 bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${blog.image})` }}
    />
  </div>

  <div className="w-full lg:w-1/2">
    <div className="flex flex-col h-full justify-between gap-5">
      <div>
        <span className="px-3 py-1 bg-black text-white rounded-md">
          {blog.date}
        </span>
        <h2 className="mt-2 GolosText text-2xl font-semibold">
          {blog.title}
        </h2>
      </div>

      <div className="relative">
        <button className="btn px-7 py-3 border rounded-lg GolosText font-semibold hover:bg-(--second) hover:text-white transition-all duration-300 cursor-pointer">
          Read More
        </button>
      </div>
    </div>
  </div>

</div>

        </div>
      ))}
    </div>
       </div>
  )
}
