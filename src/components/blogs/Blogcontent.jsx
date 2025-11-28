import React, { useEffect, useState } from "react";
import { Mycontext } from "../../context/context";
import { useParams } from "react-router-dom";


import Gradient from '../../assets/webp/gradientBackground.png';
const Blogcontent = () => {
  const { id } = useParams();
  const { allblogs, blogs, comments, getComments, addcomments } = Mycontext();

  const [addcomment, setAddcomment] = useState("");

  useEffect(() => {
    allblogs();
    getComments(id);
  }, [id]);

  const blog = blogs.find((blog) => blog._id === id);

  if (!blog) {
    return <div>Loading blog content...</div>;
  }

  const dateObj = new Date(blog.createdAt);
  const monthName = dateObj.toLocaleString("default", { month: "long" });
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();

  const handlesSubmit = async (e) => {
    e.preventDefault();
    if (!addcomment.trim()) return;

    await addcomments(id, addcomment);
    setAddcomment("");
    getComments(id); // Refresh comments
  };

  return (
    <section>
      <div className="container">
         <div className="absolute -z-10 top-[-10%]">
                    <img src={Gradient} alt="Gradient Background" />
                  </div>
                  
        <div className="pt-[163px] flex flex-col items-center ">
          <h6 className="text-center text-[#5044E5] font-outfit font-medium text-[18px] leading-[100%]">
            Published on {monthName} {date}, {year}
          </h6>
          <h2 className="font-outfit font-bold text-[58px] leading-[65px] text-center text-[#3B3B3B] max-w-[900px] py-[30px]">
            {blog.title}
          </h2>

          <h6 className=" font-outfit pb-6">{blog.subtitle}</h6>
            <h5 className="font-outfit font-normal text-[16px] leading-[100%] text-[#5044E5] flex gap-1 border-[0.3px] border-solid border-[#7A7A7A] rounded-[50px] py-2 px-[16px] bg-[#5044E51A]">
                      Michael Brown
                    </h5>
          <div className="pt-[60px]  max-w-[1240px] w-full">
            <img
              src={blog.thumbnailUrl}
              alt=""
              className=" rounded-[25px] w-full"
            />
          </div>
          <div  className="w-[80%] pt-20">
            <h6 className="text-[32px] font-semibold font-outfit">{blog.subtitle}</h6>

            
              <p className="font-outfit text-[#3B3B3B] max-w-[90%] py-16  text-[18px]"  dangerouslySetInnerHTML={{ __html: blog.description }} />

                <div className="max-w-[512px] ">
          <h6 className="font-outfit text-black font-semibold pb-4">
            Comments {comments.length}
          </h6>

          {comments.map((com, i) => (
            <div className="bg-[#5044e505] p-4 rounded-lg mb-2" key={i}>
              <div className="flex gap-2">
              
                {com.user?.profile ? (
                  <img
                    src={com.user.profile}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
                    {com.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="font-outfit text-gray-500 font-medium pb-2 capitalize">
                  {com.user?.name || "User"}
                </div>
              </div>
              <div className="font-outfit text-gray-500 ps-8">{com.text}</div>
            </div>
          ))}
        </div>

        
        <div className="max-w-[512px] mt-6 pb-32">
          <h4 className="font-outfit font-semibold text-black pb-4">
            Add Your Comment
          </h4>
          <form onSubmit={handlesSubmit}>
            <textarea
              value={addcomment}
              onChange={(e) => setAddcomment(e.target.value)}
              className="font-outfit p-2 border border-[#25252588] rounded w-full my-4"
              placeholder="Comment"
            ></textarea>
            <input
              type="submit"
              value="Submit"
              className="text-white font-outfit rounded-md bg-[#5044e5] p-2 px-8"
            />
          </form>
        </div>

                      

            
          </div>
        </div>

        
      
      </div>
    </section>
  );
};

export default Blogcontent;
