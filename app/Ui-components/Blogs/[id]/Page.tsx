"use client";

import Link from "next/link";
import BlogsData from "@/app/jsonData/BlogsData.json";
import Image from "next/image";
import { useParams } from "next/navigation";
import quote from "@/public/quote.png";
import gallery1 from "@/public/blog-gallery-1.webp";
import gallery2 from "@/public/blog-gallery-2.webp";
import gallery3 from "@/public/blog-gallery-3.webp";
import gallery4 from "@/public/blog-gallery-4.webp";
import gallery5 from "@/public/blog-gallery-5.webp";
import Follower from "../../Index/Follower/Follower";
import { useMemo } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";

const CATEGORY_COUNTS = [10, 5, 15, 8, 11, 17, 13, 9, 13];

export default function BlogsDetailes() {
  const { t, dir } = useLanguage();
  const b = t.pages.blog;
  const posts = BlogsData.slice(4, 7);
  const params = useParams();
  const id = params?.id;
  const blog = BlogsData.find((item) => item.id === Number(id));

  const categories = useMemo(
    () =>
      b.categories.map((name, i) => ({
        name,
        count: CATEGORY_COUNTS[i] ?? 0,
      })),
    [b.categories]
  );

  if (!blog) {
    return (
      <div className="py-20 text-center text-3xl font-bold" dir={dir}>
        {b.notFound}
      </div>
    );
  }

  return (
    <div dir={dir}>
      <div className="page-section flex justify-center items-center text-center">
        <div className="z-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-white text-5xl md:text-7xl GolosText font-semibold">
            {b.details}
          </h2>
          <div className="flex mt-5 text-2xl items-center text-center flex-wrap justify-center">
            <Link
              href="/Ui-components/Blogs"
              className="hover:text-(--prim) text-white"
            >
              {b.title}
            </Link>
            <i className="ri-arrow-right-wide-line pt-2 px-2 text-white i18n-flip"></i>
            <span className="text-white">{b.details}</span>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[16%] py-30 pt-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full lg:w-1/1 text-start">
            <h2 className="GolosText text-5xl font-semibold">{blog.title}</h2>

            <div className="flex items-center gap-2 my-3 flex-wrap">
              <span className="px-3 py-1 bg-(--prim) GolosText">
                {blog.date}
              </span>
              <span className="ps-3">
                <i className="bi bi-person-fill"></i> {b.by} KK mahmoud
              </span>
              <span className="ps-3">
                <i className="bi bi-chat-left-dots-fill"></i> 35 {b.comments}
              </span>
            </div>

            <div>
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={800}
                className="w-full h-full rounded-2xl mt-5"
              />
            </div>

            <p className="mt-3 GolosText text-lg leading-relaxed">{b.body1}</p>

            <div className="my-5 border rounded-2xl p-5 relative">
              <h4 className="GolosText text-2xl font-semibold pe-16">
                {b.quoteTitle}
              </h4>
              <h2 className="GolosText font-semibold mt-5">
                <span className="font-black pe-1">_____</span> {b.quoteAuthor}
              </h2>
              <Image
                src={quote}
                className="rounded-2xl mt-5 absolute top-10 end-6"
                alt="quote"
                width={80}
                height={80}
              />
            </div>

            <p className="my-8 GolosText text-lg leading-relaxed">{b.body2}</p>

            <div className="flex flex-col gap-5 mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Image
                  src={gallery1}
                  alt="gallery1"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-2xl"
                />
                <Image
                  src={gallery2}
                  alt="gallery2"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-2xl"
                />
                <Image
                  src={gallery3}
                  alt="gallery3"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-2xl"
                />
                <Image
                  src={gallery4}
                  alt="gallery4"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-2xl"
                />
                <Image
                  src={gallery5}
                  alt="gallery5"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-2xl"
                />
              </div>
            </div>

            <p className="my-8 GolosText text-lg leading-relaxed">{b.body3}</p>

            <h2 className="GolosText text-2xl font-semibold">
              {b.additionalInfo}
            </h2>
            <p className="GolosText text-lg leading-relaxed mt-2">{b.body4}</p>
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
    </div>
  );
}
