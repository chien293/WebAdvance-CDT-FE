import React from "react";
import SingleBlog from "./SingleBlog.jsx";
export default function Blogs() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <h1 className="text-2xl font-semibold text-gray-800">From the Blogs</h1>
      <div className="grid grid-cols-3 gap-3">
        <SingleBlog />
        <SingleBlog />
        <SingleBlog />
      </div>
    </section>
  );
}
