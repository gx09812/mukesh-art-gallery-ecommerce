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

  const handleFileChange = (e, category) => {
    setSelectedFile(e.target.files[0]);
    setSelectedCategory(category);
    setUploadMessage("");
    setUploadedUrl("");
  };

  // UPLOAD FUNCTION (UPDATED)
  const handleUpload = async (e, { title, category }) => {
    e.preventDefault();

    if (!selectedFile || !title || !category) {
      setUploadMessage("Please fill title & select image.");
      return;
    }

    const formData = new FormData();
    formData.append("section", category);
    formData.append("title", title);
    formData.append("image", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadMessage("Image Uploaded & Saved!");
        setUploadedUrl(data.filePath);

        // Reset file after upload
        setSelectedFile(null);
        setSelectedCategory("");
      }
    } catch (err) {
      setUploadMessage("Error uploading.");
    }
  };

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

  // SECTION BLOCK (EACH HAS OWN TITLE STATE)
  const SectionBlock = ({ titleText, category }) => {
    const [localTitle, setLocalTitle] = useState("");

    return (
      <motion.div className="p-8 bg-gray-50 rounded-2xl shadow-xl border mb-10 w-full sm:w-[48%] lg:w-[30%]">
        <h3 className="text-2xl font-bold mb-6">{titleText}</h3>

        <form
          onSubmit={(e) =>
            handleUpload(e, { title: localTitle, category })
          }
          className="space-y-6"
        >
          <UploadBox
            onChange={(e) => handleFileChange(e, category)}
            file={selectedFile && selectedCategory === category ? selectedFile : null}
          />

          <input
            type="text"
            required
            placeholder="Artwork Title"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
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
  };

  return (
    <div className="bg-white min-h-[80vh] p-10">
      <h1 className="text-4xl font-bold mb-10 flex items-center">
        <User className="mr-3" /> Admin - Upload Photos
      </h1>

      {/* TOP CATEGORIES */}
      <div className="flex flex-wrap gap-6">
        <SectionBlock titleText="Home Screen Picture" category="home" />
        <SectionBlock titleText="Articles Image" category="articles" />
        <SectionBlock titleText="Free Gift Image" category="freegift" />
      </div>

      <h2 className="text-3xl mt-10 mb-6">Gallery Categories</h2>

      {/* GALLERY CATEGORIES */}
      <div className="flex flex-wrap gap-6">
        <SectionBlock titleText="Portrait Artwork" category="gallery_portrait" />
        <SectionBlock titleText="Creative Art" category="gallery_creative" />
        <SectionBlock titleText="Spiritual Commission Art" category="gallery_spiritual" />
      </div>

      {/* Upload Status */}
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
