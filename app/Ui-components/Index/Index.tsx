import React from "react";
import Hero from "./Hero/Hero";
import Category from "./Catogery/Category";
import Trending from "./Trading/Trending";
import Banner from "./Banner/Banner";
import PoplouerProudect from "./PoplouerProudect/PopularProducts";
import Company from "./Company/Company";
import Blogs from "./Blogs/HomeBlogs";
import Follower from "./Follower/Follower";

export default function Index() {
  return (
    <>
      <Hero />
      <Category />
      <Trending />
      <Banner />
      <PoplouerProudect />
      <Company />
      <Blogs />
      <Follower />
    </>
  );
}
