import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, ArrowRight, User } from "lucide-react";

const ADMIN_PASSWORD = "artsketchadmin";

// LOGIN PAGE
export const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      navigate("/admin/addpic");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 pt-20">
      <motion.div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl space-y-6">
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
          <button className="w-full py-3 rounded-full bg-[#778259] text-white">
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ADD PIC PAGE
export const AddPicPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  // Handle file select
  const handleFileChange = (e, category) => {
    setSelectedFile(e.target.files[0]);
    setSelectedCategory(category);
    setUploadMessage("");
    setUploadedUrl("");
  };

  // Upload to backend
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedCategory) {
      setUploadMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    
    // ✅ FIXED ORDER
    formData.append("section", selectedCategory);  // send category first
    formData.append("image", selectedFile);        // then send the file

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadMessage("Uploaded successfully!");
        setUploadedUrl(data.filePath);
      }
    } catch (err) {
      console.log(err);
      setUploadMessage("Upload failed.");
    }
  };

  // UI upload box
  const UploadBox = ({ onChange, file }) => (
    <label className="w-full border-2 border-dashed rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer bg-white">
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <PlusCircle className="text-4xl text-[#778259]" />
          <p>Select Image</p>
        </div>
      )}
      <input type="file" className="hidden" onChange={onChange} />
    </label>
  );

  // Each upload block
  const SectionBlock = ({ title, category }) => (
    <motion.div className="p-8 bg-gray-50 rounded-2xl shadow-xl border mb-10 w-full sm:w-[48%] lg:w-[30%]">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>

      <form onSubmit={handleUpload} className="space-y-6">
        <UploadBox
          onChange={(e) => handleFileChange(e, category)}
          file={selectedFile && selectedCategory === category ? selectedFile : null}
        />

        <input
          type="text"
          required
          placeholder="Artwork Title"
          className="w-full px-4 py-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={!selectedFile || selectedCategory !== category}
          className="w-full py-3 rounded-full bg-[#778259] text-white disabled:bg-gray-400"
        >
          Upload <ArrowRight className="inline ml-2" />
        </button>
      </form>
    </motion.div>
  );

  return (
    <div className="bg-white min-h-[80vh] p-10">
      <h1 className="text-4xl font-bold mb-10 flex items-center">
        <User className="mr-3" /> Admin - Photo Upload
      </h1>

      {/* MAIN SECTIONS */}
      <div className="flex flex-wrap gap-6">
        <SectionBlock title="Home Screen Picture" category="home" />
        <SectionBlock title="Articles Image" category="articles" />
        <SectionBlock title="Free Gift Image" category="freegift" />
      </div>

      {/* GALLERY */}
      <h2 className="text-3xl mt-10 mb-6">Gallery Categories</h2>

      <div className="flex flex-wrap gap-6">
        <SectionBlock title="Portrait Artwork" category="gallery_portrait" />
        <SectionBlock title="Creative Art" category="gallery_creative" />
        <SectionBlock title="Spiritual Commission Art" category="gallery_spiritual" />
      </div>

      {/* Upload result */}
      {uploadMessage && (
        <div className="mt-6 text-green-600 text-lg">
          <p>{uploadMessage}</p>

          {uploadedUrl && (
            <a
              href={"http://localhost:5000" + uploadedUrl}
              target="_blank"
              className="underline block mt-2"
            >
              View Uploaded File
            </a>
          )}
        </div>
      )}
    </div>
  );
};
