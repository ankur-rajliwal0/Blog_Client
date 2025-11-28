import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mycontext } from "../../context/context";
import Message from "../common/Message";
// import Message from "../common/Message"; // ✅ Common Message Component

const Signup = () => {
  const { signup } = Mycontext();
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  

  const [message, setMessage] = useState("");
  const [showBar, setShowBar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signup(formdata);

    setMessage(res.message);
    setShowBar(true);

    setTimeout(() => {
      setMessage("");
      setShowBar(false);

      setFormdata({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      navigate("/login", { state: { message: res.message } });
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center relative">

      {/* ⭐ GLOBAL MESSAGE COMPONENT */}
      <Message message={message} showBar={showBar} />

      <div className="container flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white border border-[#808080] rounded-md max-w-[400px] w-full"
        >
          <h4 className="text-black text-[30px] font-outfit font-semibold text-center mb-4">
            Sign Up
          </h4>

          <label htmlFor="name" className="text-[#808080] font-outfit text-[16px]">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full text-[#808080] outline-none p-2 border-b border-[#808080] mb-5"
          />

          <label htmlFor="email" className="text-[#808080] font-outfit text-[16px]">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formdata.email}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
            placeholder="Enter your email"
            className="w-full text-[#808080] outline-none p-2 border-b border-[#808080] mb-5"
          />

          <label htmlFor="password" className="text-[#808080] font-outfit text-[16px]">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formdata.password}
            onChange={(e) =>
              setFormdata({ ...formdata, password: e.target.value })
            }
            placeholder="Enter your password"
            className="w-full text-[#808080] outline-none p-2 border-b border-[#808080] mb-5"
          />

          <label htmlFor="role" className="text-[#808080] font-outfit text-[16px]">
            Choose your role:
          </label>
          <select
            id="role"
            value={formdata.role}
            onChange={(e) =>
              setFormdata({ ...formdata, role: e.target.value })
            }
            className="w-full text-[#808080] outline-none p-2 border-b border-[#808080] mb-5"
          >
            <option value="">--Select--</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <input
            type="submit"
            value="Sign up"
            className="text-white bg-[#5044e5] rounded-md py-3 w-full cursor-pointer"
          />

          <h6 className="text-center text-gray-600 font-outfit mt-4">
            Already have an account?
            <Link to="/login" className="text-[#5044e5] font-semibold ml-1">
              Login
            </Link>
          </h6>
        </form>
      </div>
    </section>
  );
};

export default Signup;
