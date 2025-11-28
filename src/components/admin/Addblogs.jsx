import React, { useEffect, useRef, useState } from "react";
import { Mycontext } from "../../context/context";
import { Uploadimg } from "../../common/icon";
import Message from "../common/Message";
import Loader from "../common/Loader";

// QUILL IMPORT
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Addblogs = () => {
  const { addblog } = Mycontext();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [formdata, setFormdata] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    image: null,
    status: "draft",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showBar, setShowBar] = useState(false);

  // INIT QUILL PROPERLY
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog description here...",
      });

      // Listen text-change
      quillRef.current.on("text-change", () => {
        setFormdata((prev) => ({
          ...prev,
          description: quillRef.current.root.innerHTML,
        }));
      });
    }
  }, []);

  // IMAGE PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormdata({ ...formdata, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formdata.title);
    data.append("subtitle", formdata.subtitle);
    data.append("description", formdata.description);
    data.append("category", formdata.category);
    data.append("image", formdata.image);
    data.append("status", formdata.status);

    const res = await addblog(data);

    setLoading(false);
    setMessage(res?.message || "Something went wrong");
    setShowBar(true);

    setTimeout(() => {
      setMessage("");
      setShowBar(false);
    }, 3000);

    if (res?.success) {
      setFormdata({
        title: "",
        subtitle: "",
        description: "",
        category: "",
        image: null,
        status: "draft",
      });
      setPreview(null);
      quillRef.current.setContents([]);
    }
  };

  return (
    <section className="relative">
      {loading && <Loader />}
      <Message message={message} showBar={showBar} />

      <div className="container">
        <div className="bg-white border p-5 rounded-lg max-w-[1088px] mx-auto mt-10">

          <form onSubmit={handleSubmit}>

            {/* IMAGE UPLOAD */}
            <label className="font-poppins">Upload Thumbnail</label>
            <label
              htmlFor="file-upload"
              className="bg-gray-100 overflow-hidden mt-2 w-[200px] h-[130px] border border-dashed flex items-center justify-center rounded-lg cursor-pointer"
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <Uploadimg />
              )}
            </label>

            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />

            {/* TITLE */}
            <label className="block mt-6 font-poppins">Blog Title</label>
            <input
              type="text"
              value={formdata.title}
              onChange={(e) => setFormdata({ ...formdata, title: e.target.value })}
              className="border w-full p-3 rounded"
              placeholder="Type here"
            />

            {/* SUBTITLE */}
            <label className="block mt-6 font-poppins">Subtitle</label>
            <input
              type="text"
              value={formdata.subtitle}
              onChange={(e) => setFormdata({ ...formdata, subtitle: e.target.value })}
              className="border w-full p-3 rounded"
              placeholder="Type here"
            />

            {/* QUILL EDITOR */}
            <label className="block mt-6 pb-4  font-poppins" >Blog Description</label>
            <div
              ref={editorRef}
              className="border  rounded-b-md h-[250px] bg-white"
            ></div>

            {/* CATEGORY */}
            <label className="block mt-6 font-poppins">Category</label>
            <select
              value={formdata.category}
              onChange={(e) => setFormdata({ ...formdata, category: e.target.value })}
              className="border p-3 rounded"
            >
              <option value="">--Select--</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="Startup">Startup</option>
              <option value="Finance">Finance</option>
            </select>

            {/* STATUS */}
            <div className="flex gap-3 font-poppins items-center mt-6">
              <label>Publish Now</label>
              <input
                type="checkbox"
                checked={formdata.status === "public"}
                onChange={(e) =>
                  setFormdata({ ...formdata, status: e.target.checked ? "public" : "draft" })
                }
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="mt-10 bg-[#5044E5] font-poppins px-8 py-3 text-white rounded hover:bg-white hover:text-[#5044E5] border border-[#5044E5]"
            >
              Add Blog
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Addblogs;
