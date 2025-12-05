import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../context/context";
import Message from "../common/Message"; // message component import

const Allblog = () => {
  const { allblogs, blogs } = Mycontext();
  const navigate = useNavigate();

  const [visibleBlogs, setVisibleBlogs] = useState(8);
  const [message, setMessage] = useState("");
  const [showBar, setShowBar] = useState(false);

  const showmoreBlogs = () => setVisibleBlogs((prev) => prev + 4);
  const lessBlogs = () => setVisibleBlogs((prev) => prev - 4);

  const handleBlogClick = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first to read the blog!");
      setShowBar(true);

      setTimeout(() => {
        setMessage("");
        setShowBar(false);
      }, 2000);
      return;
    }

    window.scrollTo(0, 0);
    navigate(`/blogcontent/${id}`);
  };

  useEffect(() => {
    allblogs();
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Message message={message} showBar={showBar} />
      
      <div className="container">
        <div className="flex flex-wrap flex-row mx-[-12px] pb-6">
          {blogs.slice(0, visibleBlogs).map((blog) => (
            <div
              key={blog._id}
              className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full px-3 pt-6 cursor-pointer"
              onClick={() => handleBlogClick(blog._id)}
            >
              <div className="shadow-card rounded-[15px] overflow-hidden h-full hover:shadow-xl duration-300">
                
                <div className="w-full h-[200px] overflow-hidden rounded-lg">
                  <img
                    src={blog.thumbnailUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pt-5 sm:px-[28px] px-5 sm:pb-[40px] pb-[30px]">
                  <span className="font-outfit text-[#5044E5] text-[14px] leading-[100%] bg-[#5044E533] rounded-[50px] py-[6px] px-[17px]">
                    {blog.category}
                  </span>

                  <h4 className="font-outfit font-medium text-[20px] leading-[30px] pt-3 line-clamp-3">
                    {blog.title}
                  </h4>

                  <div
                    className="font-outfit font-thin leading-[28px] text-[#636363] line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
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
