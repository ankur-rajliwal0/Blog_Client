import React, { useState } from 'react';

import Start from '../../assets/svg/star_icon.svg';
import Gradient from '../../assets/webp/gradientBackground.png';
import api from '../../utils/api'; 

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setMessage('Please enter a search term');
      setBlogs([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(
        `/blog/searchblog?search=${encodeURIComponent(searchTerm)}`
      );      
      const blogsData = response.data.blogs || [];

      if (blogsData.length === 0) {
        setMessage('No blogs found for your search');
        setBlogs([]);
      } else {
        setMessage('');
        setBlogs(blogsData);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error searching blogs. Try again later.');
      setBlogs([]);
    }
    setLoading(false);
  };

  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center relative pt-[114px]">
          <div className="absolute -z-10 top-[-10%]">
            <img src={Gradient} alt="Gradient Background" />
          </div>

          <h5 className="font-outfit font-normal text-[16px] leading-[100%] text-[#5044E5] flex gap-1 border-[0.3px] border-solid border-[#7A7A7A] rounded-[50px] py-2 px-[27px] bg-[#5044E51A]">
            New: AI feature integrated <img src={Start} alt="Star Icon" />
          </h5>

          <h1 className="font-outfit font-medium lg:text-[80px] sm:text-[62px] text-[42px] sm:leading-[88px] text-[#3B3B3B] max-w-[654px] text-center pt-[18px]">
            Your own <span className="text-[#5044E5]">blogging</span> platform.
          </h1>

          <p className="text-[#808080] text-center font-poppins leading-[28px] font-normal pt-[10px] max-w-[787px] pb-[37px]">
            This is your space to think out loud, to share what matters, and to write without filters. Whether it’s one word or a thousand, your story starts right here.
          </p>

          <form
            className="border-[1px] border-solid bg-white w-full max-w-[679px] border-[#0000004D] rounded-[10px] flex sm:py-2 py-1 sm:px-[10px] px-1"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search blogs"
              className="w-full font-outfit font-normal text-[18px] bg-transparent leading-[100%] text-[#757575] outline-none"
            />
            <input
              type="submit"
              value="Search"
              className="font-outfit text-white text-[18px] leading-[100%] font-normal py-2 px-[28px] bg-[#5044E5] rounded-[8px] cursor-pointer"
            />
          </form>

          {loading && <p className="text-center mt-4">Loading...</p>}

          {message && (
            <p className="mb-4 text-center text-red-600 font-semibold">{message}</p>
          )}

        <div className="flex flex-row flex-wrap mx-[-12px]">
              {blogs.map((blog) => (
            <div key={blog._id || blog.id} className="lg:w-3/12 md:w-4/12 sm:6/12 w-full px-3  pt-6">
         
              <div className=" shadow-card rounded-[15px]  overflow-hidden h-full hover:shadow-xl duration-300">
                    <img src={blog.thumbnailUrl} alt="" className="w-full" />
                    <div className="pt-5 px-[28px] pb-[40px]">
                      <span className="font-outfit text-[#5044E5] text-[14px] leading-[100%] bg-[#5044E533] rounded-[50px] py-[6px] px-[17px]">
                        {blog.category}
                      </span>
                      <h4 className="font-outfit font-medium text-[20px] leading-[30px] py-3">
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
        </div>
      </div>
    </section>
  );
};

export default Home;
