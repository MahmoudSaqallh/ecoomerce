"use client";

import Image from "next/image";

import insta1 from "@/public/insta-1.webp";
import insta2 from "@/public/insta-2.webp";
import insta3 from "@/public/insta-3.webp";
import insta4 from "@/public/insta-4.webp";
import insta5 from "@/public/insta-5.webp";
import insta6 from "@/public/insta-6.webp";
import instaFollow from "@/public/insta-follow.webp";

const istaImage = [
  insta1,
  insta2,
  insta3,
  insta4,
  insta5,
  insta6,
];

export default function Follower() {

  return (
    <>
      <div className="follow">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

          {istaImage.map((item, index) => (

            <div
              key={index}
              className="follow-img overflow-hidden"
            >

              <Image
                src={item}
                alt={`insta-${index}`}
              />

            </div>

          ))}

        </div>

        <div className="follow-text flex items-center gap-4 bg-white p-3 rounded-2xl">

          <Image
            src={instaFollow}
            alt="insta-follow"
          />

          <h2 className='GolosText font-semibold'>
            Follow @FashiQue
          </h2>

        </div>

      </div>
    </>
  );
}