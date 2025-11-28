import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Mycontext } from "../../context/context";

const Blogslist = () => {
  const { allblogs, blogs } = Mycontext();

  useEffect(() => {
    allblogs();
  }, []);

  const categorys = ["all", "technology", "startup", "lifestyle", "finance"];

  return (
    <section>
      <div className="container pt-[64px]">
        <div className="  max-md:overflow-x-scroll z-10 ">
          <div className="flex sm:gap-[20px] gap-2 sm:justify-center items-center max-sm:w-[600px]  max-sm:px-1  h-10 flex-wrap ">
            {categorys.map((category, index) => (
              <NavLink
                key={index}
                to={`/${category}`}
                className={({ isActive }) =>
                  `
        ${
          isActive
            ? "bg-[#5044E5] text-white scale-105 shadow-md"
            : "hover:bg-[#5044E5]/10 hover:text-[#5044E5]"
        }
        transition-all duration-300 ease-in-out 
        font-bold font-outfit text-[16px] py-2 px-[24px] 
        text-[#565656] rounded-[50px] transform
      `
                }
              >
                <span className="capitalize">{category}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex flex-row flex-wrap mx-[-12px] pt-[66px]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Blogslist;
