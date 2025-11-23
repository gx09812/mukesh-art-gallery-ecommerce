// addpic.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, ArrowRight, User } from "lucide-react";

const ADMIN_PASSWORD = "artsketchadmin";

// Login Screen
export const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      navigate("/admin/addpic"); 
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 pt-20">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center">Admin Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />
          {error && <p className="text-red-600 text-center">{error}</p>}
          <button className="w-full py-3 rounded-full bg-[#778259] text-white text-lg font-bold">
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

//  Add Picture Page
export const AddPicPage = () => {
  const [file, setFile] = useState(null);
  const [section, setSection] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e, category) => {
    setFile(e.target.files[0]);
    setSection(category);
    setUploadMessage("");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !section) {
      setUploadMessage("Please select a file.");
      return;
    }
    setUploadMessage(`Uploaded to ${section}: ${file.name}`);
    setFile(null);
  };
const UploadBox = ({ onChange, file }) => (
  <label
    className="w-full max-w-full md:max-w-[320px] lg:max-w-[560px]
               border-2 border-dashed rounded-2xl 
               h-40 md:h-48 lg:h-52 
               flex flex-col items-center justify-center gap-2
               cursor-pointer hover:bg-gray-100 overflow-hidden mx-auto"
  >
    {file ? (
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        className="object-cover w-full h-full rounded-2xl"
      />
    ) : (
      <div className="flex flex-col items-center gap-2">
        <PlusCircle className="text-4xl text-[#778259]" />
        <p className="text-gray-600 text-sm md:text-base">
          Click to choose image
        </p>
      </div>
    )}

    <input type="file" accept="image/*" className="hidden" onChange={onChange} />
  </label>
);

  const SectionBlock = ({ title, category }) => (
    <motion.div
  className="p-8 bg-gray-50 rounded-2xl shadow-xl border mb-10
             w-full sm:w-[48%] lg:w-[30%] flex flex-col items-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

      <h3 className="text-3xl font-bold mb-6 flex items-center">
        <PlusCircle className="mr-3 text-[#778259]" /> {title}
      </h3>

      <form onSubmit={handleUpload} className="space-y-6">
        <UploadBox
  onChange={(e) => handleFileChange(e, category)}
  file={file && section === category ? file : null}
/>

        <input
          type="text"
          required
          placeholder="Artwork Title"
          className="w-full px-4 py-3 border rounded-lg"
        />
        


        <button
          type="submit"
          disabled={!file || section !== category}
          className="w-full py-3 rounded-full bg-[#778259] text-white text-lg font-bold disabled:bg-gray-400"
        >
          Upload <ArrowRight className="inline ml-2" />
        </button>
      </form>
    </motion.div>
  );

  return (
    <div className="bg-white min-h-[80vh] p-10 mt-10 md:mt-20">
      <h1 className="text-4xl font-bold flex items-center mb-10">
        <User className="mr-3" /> Admin - Photo Upload
      </h1>

      {/* HOME / ARTICLES / FREE GIFT */}
      <div className="flex flex-wrap gap-6">
        <SectionBlock title="Home Screen Picture" category="home" />
        <SectionBlock title="Articles Image" category="articles" />
        <SectionBlock title="Free Gift Image" category="freegift" />
      </div>

      {/* GALLERY CATEGORIES */}
      <h2 className="text-3xl font-bold mt-10 mb-6">Gallery Categories</h2>
      <div className="flex flex-wrap gap-6">
        <SectionBlock title="Portrait Artwork" category="gallery_portrait" />
        <SectionBlock title="Creative Art" category="gallery_creative" />
        <SectionBlock title="Spiritual Commission Art" category="gallery_spiritual" />
      </div>

      {uploadMessage && (
        <p className="mt-4 text-green-600 font-semibold">{uploadMessage}</p>
      )}
    </div>
  );
};
