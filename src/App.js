import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Signup from "./components/Auth/Signup";
import AdminBoard from "./components/admin/AdminBoard";
import Addblogs from "./components/admin/Addblogs";
import Comments from "./components/common/Comments";
import Dashboard from "./components/admin/Dashboard";
import HomePage from "./pages/HomePage";
import Allblog from "./components/blogs/Allblog";
import Bloglistadmin from "./components/admin/Bloglistadmin";
import Blogcontent from "./components/blogs/Blogcontent";
import Category from "./components/blogs/Category";
import BlogContentPage from "./pages/BlogContentPage";
import { Mycontext } from "./context/context";
import Login from "./components/Auth/Login";
import 'quill/dist/quill.snow.css'


function App() {
  const { role, loading } = Mycontext();
  if (loading) return null;
  return (
    <>
    
      {role === "admin" && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<Navbar />}>
            <Route path="/" element={<AdminBoard />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="addblogs" element={<Addblogs />} />
              <Route path="bloglist" element={<Bloglistadmin />} />
              <Route path="blog/:id" element={<Blogcontent />} />
              <Route path="all" element={<Allblog />} />
            </Route>
          </Route>
        </Routes>
      )}

      {role === "user" && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Navbar />}>
            <Route path="/" element={<HomePage />}>
              <Route path=":category" element={<Category />} />
              <Route path="all" element={<Allblog />} />
              <Route index element={<Navigate to="all" replace />} />
            </Route>
            <Route path="blogcontent/:id" element={<BlogContentPage />} />
          </Route>
        </Routes>
      )}

      {role !== "admin" && role !== "user" && (
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<HomePage />}>
              <Route path=":category" element={<Category />} />
              <Route path="all" element={<Allblog />} />
              <Route index element={<Navigate to="all" replace />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
