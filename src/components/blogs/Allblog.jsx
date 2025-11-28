import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Mycontext } from "../../context/context";

const Allblog = () => {
  const { allblogs, blogs } = Mycontext();
  const { category } = useParams();

  const [visibleBlogs, setVisibleBlogs] = useState(8);

  const showmoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 4);
  };
  const lessBlogs = () => {
    setVisibleBlogs((prev) => prev - 4);
  };

  useEffect(() => {
    allblogs();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap flex-row mx-[-12px] pb-6">
          {blogs.slice(0, visibleBlogs).map((blog, index) => (
            <div
              key={blog._id}
              className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full px-3 pt-6 "
            >
              <Link to={`/blogcontent/${blog._id}`}>
                <div className=" shadow-card rounded-[15px]  overflow-hidden h-full hover:shadow-xl duration-300">
                <div className="w-full h-[200px] overflow-hidden rounded-lg">
  <img 
    src={blog.thumbnailUrl} 
    alt=""
    className="w-full h-full object-cover"
  />
</div>

                  <div className="pt-5 px-[28px] pb-[40px]">
                    <span className="font-outfit text-[#5044E5] text-[14px] leading-[100%] bg-[#5044E533] rounded-[50px] py-[6px] px-[17px]">
                      {blog.category}
                    </span>
                    <h4 className="font-outfit font-medium text-[20px] leading-[30px] pt-3">
                      {blog.title}
                    </h4>
                    <p className="font-outfit font-thin leading-[28px] text-[#636363] line-clamp-3">
                        <p className=""  dangerouslySetInnerHTML={{ __html: blog.description }} />
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center ">
          {blogs.length < visibleBlogs ? (
            <button
              className="font-outfit rounded-full bg-[#5044E5] text-white font-semibold py-2 px-4"
              onClick={lessBlogs}
            >
              Less More
            </button>
          ) : (
            <button
              className="font-outfit rounded-full bg-[#5044E5] text-white font-semibold py-2 px-4"
              onClick={showmoreBlogs}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Allblog;
