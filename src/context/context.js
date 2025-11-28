import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
const { createContext, useContext, useState, useEffect } = require("react");

const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch {
        console.error("Bad token");
      }
    }
    setLoading(false);
  }, []);

  const signup = async (formdata) => {
    try {
      const response = await api.post("/auth/signup", formdata);
      console.log(response.data);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message || "Singup filed ",
      };
    }
  };
  const login = async (formdata) => {
    try {
      const response = await api.post("/auth/login", formdata);
      localStorage.setItem("token", response.data.token);
      const decoded = jwtDecode(response.data.token);
      setRole(decoded.role);

      // return { success: true, message: response.data.message };
      return response.data
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response.data.message };
    }
  };

  const getuser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/auth/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

 const addblog = async (formdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/blog/addblog", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: response.data.message || "Blog added successfully!" };

  } catch (error) {
    return { 
      success: false, 
      message: error?.response?.data?.message || "Something went wrong!" 
    };
  }
};

  const allblogs = async () => {
    try {
      const response = await api.get("/blog/allblogs");
      console.log("Fetching all blogs...");
      console.log("Response:", response.data);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
      console.log(
        "Error fetching blogs:",
        error.response?.data || error.message
      );
    }
  };

  const getComments = async (id) => {
    try {
      const res = await api.get(`/blog/getcomentblog/${id}`);
      setComments(res.data.comments);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  const addcomments = async (id, commentData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/blog/comment/${id}`,
        { text: commentData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setRole(null);
  };

  return (
    <Context.Provider
      value={{
        signup,
        login,
        addblog,
        allblogs,
        blogs,
        comments,
        getComments,
        addcomments,
        user,
        logout,
        getuser,
        role,
        setRole,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const Mycontext = () => useContext(Context);
