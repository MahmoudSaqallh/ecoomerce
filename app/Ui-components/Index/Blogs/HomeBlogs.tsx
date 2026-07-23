"use client";

import Link from "next/link";
import BlogsData from "@/app/jsonData/BlogsData.json";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function HomeBlogs() {
  const { t, dir } = useLanguage();

  return (
    <div className="px-[14%] lg:px-[16%] py-20" dir={dir}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="text-center md:text-start">
          <h2 className="text-5xl font-medium Lufga">{t.home.latestPosts}</h2>
          <p className="GolosText text-lg mt-1">{t.home.latestPostsSubtitle}</p>
        </div>

        <Link
          href="/Ui-components/Blogs"
          className="btn bg-black text-white cursor-pointer GolosText text-xl px-6 py-3 rounded-md transition-all duration-300"
        >
          {t.home.viewAll}
        </Link>
      </div>

      <div className="ind-blog-warp grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        {BlogsData.slice(0, 4).map((blog) => (
          <div className="idx-blog-item" key={blog.id}>
            <div className="bg-white p-7 flex flex-col lg:flex-row gap-5 rounded-2xl shadow-2xl">
              <div className="w-full lg:w-1/2">
                <Link href={`/Ui-components/Blogs/${blog.id}`}>
                  <div
                    className="blog-image h-48 bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${blog.image})` }}
                  />
                </Link>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="flex flex-col h-full justify-between gap-5">
                  <div>
                    <span className="px-3 py-1 bg-black text-white rounded-md">
                      {blog.date}
                    </span>
                    <h2 className="mt-2 GolosText text-2xl font-semibold">
                      <Link
                        href={`/Ui-components/Blogs/${blog.id}`}
                        className="hover:text-(--second) transition-colors"
                      >
                        {blog.title}
                      </Link>
                    </h2>
                  </div>

                  <div className="relative">
                    <Link
                      href={`/Ui-components/Blogs/${blog.id}`}
                      className="btn inline-block px-7 py-3 border rounded-lg GolosText font-semibold hover:bg-(--second) hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      {t.home.readMore}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
