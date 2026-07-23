"use client";

import Link from "next/link";
import BlogsData from "@/app/jsonData/BlogsData.json";
import Image from "next/image";
import Follower from "../Index/Follower/Follower";
import { ToastContainer } from "react-toastify";
import { useMemo } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";

const CATEGORY_COUNTS = [10, 5, 15, 8, 11, 17, 13, 9, 13];

export default function Blog() {
  const { t, dir, locale } = useLanguage();
  const b = t.pages.blog;
  const posts = BlogsData.slice(4, 7);

  const categories = useMemo(
    () =>
      b.categories.map((name, i) => ({
        name,
        count: CATEGORY_COUNTS[i] ?? 0,
      })),
    [b.categories]
  );

  return (
    <div dir={dir}>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-8xl GolosText font-semibold">
            {b.title}
          </h2>
          <div className="flex mt-5 text-2xl items-center text-center">
            <Link href="/" className="hover:text-(--prim) text-white">
              {b.home}
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white i18n-flip"></i>
            <span className="text-white">{b.title}</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-30 pt-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full lg:w-1/1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {BlogsData.map((blog) => (
                <Link href={`/Ui-components/Blogs/${blog.id}`} key={blog.id}>
                  <div className="blog-card cursor-pointer">
                    <div className="blog-img">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={500}
                        height={500}
                        className="w-full h-full rounded-t-2xl"
                      />
                    </div>

                    <div className="bg-(--prim) px-4 py-5 rounded-b-2xl text-start">
                      <span className="text-lg bg-black text-white px-4 py-1 rounded-lg">
                        {blog.date}
                      </span>
                      <h2 className="my-3 text-2xl GolosText font-semibold">
                        {blog.title}
                      </h2>
                      <div>
                        <button className="underline py-2 rounded-full GolosText font-semibold hover:translate-x-1 transition-all duration-300 cursor-pointer">
                          {b.readMore}{" "}
                          <i className="bi bi-chevron-right ps-2 i18n-flip"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 sticky top-25 start-0 h-full">
            <h2 className="Lufga text-2xl font-medium text-start">
              {b.category}
            </h2>
            <div className="flex flex-col mt-5 gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="group flex items-center justify-between cursor-pointer"
                >
                  <h2 className="text-lg GolosText flex items-center gap-2 group-hover:ps-2 transition-all duration-300 group-hover:text-(--second)">
                    <i className="bi bi-arrow-right i18n-flip"></i>
                    {cat.name}
                  </h2>
                  <h3 className="group-hover:text-(--second) transition-all duration-300">
                    {cat.count}
                  </h3>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="Lufga text-2xl font-medium mb-5 text-start">
                {b.latestPosts}
              </h2>

              <div className="flex flex-col gap-10">
                {posts.map((post) => (
                  <Link
                    href={`/Ui-components/Blogs/${post.id}`}
                    key={post.id}
                    className="flex items-center gap-5 cursor-pointer"
                  >
                    <div className="w-1/3 rounded-xl overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col text-start">
                      <p className="GolosText text-sm text-gray-500">
                        {post.date}
                      </p>
                      <h3 className="GolosText text-lg font-semibold hover:text-(--second) transition-all duration-300">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="Lufga text-2xl font-medium mb-5 text-start">
                {b.tags}
              </h2>
              <div className="flex flex-wrap gap-3">
                {b.tagList.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm GolosText border rounded-md text-black hover:bg-black hover:text-white cursor-pointer transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Follower />
      <ToastContainer
        position={locale === "ar" ? "top-left" : "top-right"}
        autoClose={1500}
      />
    </div>
  );
}
