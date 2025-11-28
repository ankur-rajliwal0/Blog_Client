import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Mycontext } from "../../context/context";

const Category = () => {
  const { allblogs, blogs } = Mycontext();
  const { category } = useParams();
  
  
  useEffect(() => {
    allblogs();
  }, []);

  
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();  
  const filteredBlogs = blogs.filter(blog => blog.category === capitalize(category));

  
  

  

  

  return (
    <section>
     <div className="container">                                                    
        

 <div className="flex flex-wrap flex-row mx-[-12px]">
               {filteredBlogs.map(blog => (
              <div key={blog._id} className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full px-3  pt-6">
              
            <Link to={`/blogcontent/${blog._id}`}>
            
                <div className=" shadow-card rounded-[15px]  overflow-hidden h-full hover:shadow-xl duration-300">
                    <img src={blog.thumbnailUrl} alt="" className="w-full" />
                    <div className="pt-5 px-[28px] pb-[40px]">
                      <span className="font-outfit text-[#5044E5] text-[14px] leading-[100%] bg-[#5044E533] rounded-[50px] py-[6px] px-[17px]">
                        {blog.category}
                      </span>
                      <h4 className="font-outfit font-medium text-[20px] leading-[30px] pt-3">
                        {blog.title}
                      </h4>
                      
                         <p className="font-outfit text-[#3B3B3B]    font-thin line-clamp-3"  dangerouslySetInnerHTML={{ __html: blog.description }} />
                      
                    </div>
                  </div>

            </Link>
                
            
                
              </div>
            ))}
            </div>
        </div>
      
     
    </section>
  );
};

export default Category;
