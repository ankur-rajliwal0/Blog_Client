import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mycontext } from "../../context/context";
import { jwtDecode } from "jwt-decode";
import Message from "../common/Message";

const Login = () => {
  const { login } = Mycontext();
  const [formdata, setFormdata] = useState({ email: "", password: "" });

  const [message, setMessage] = useState("");
  const [showBar, setShowBar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Role:", decoded.role);
      } catch (err) {
        console.error("Bad token");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formdata);

    // Show global message
    setMessage(res?.message || "Login successful");
    setShowBar(true);

    // Handle navigation
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role;

        setTimeout(() => {
          setMessage("");
          setShowBar(false);
          setFormdata({ email: "", password: "" });

          if (userRole === "admin") navigate("/dashboard");
          else navigate("/all");
        }, 2000);

      } catch {
        console.error("Invalid token");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center relative">

      {/* ⭐ Message Component */}
      <Message message={message} showBar={showBar} />

      <div className="container flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white border border-[#808080] rounded-md max-w-[400px] w-full"
        >
          <h4 className="text-black text-[30px] font-outfit font-semibold text-center mb-4">
            Login
          </h4>

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

          <input
            type="submit"
            value="Login"
            className="text-white bg-[#5044e5] rounded-md py-3 w-full cursor-pointer"
          />

          <h6 className="text-center text-gray-600 font-outfit mt-4">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-[#5044e5] font-semibold">
              Signup
            </Link>
          </h6>
        </form>
      </div>
    </section>
  );
};

export default Login;
