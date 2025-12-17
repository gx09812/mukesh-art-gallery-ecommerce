import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, ArrowRight, User, Trash2, Search as SearchIcon, X } from "lucide-react";

//  LOGIN SCREEN 
const ADMIN_PASSWORD = "artsketchadmin";

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

/* ========== SEARCH BAR COMPONENT ========== */
const SearchBar = ({ onOpenFullImage }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced search simple implementation
  useEffect(() => {
    const controller = new AbortController();
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search error", err);
        }
      } finally {
        setLoading(false);
      }
    }, 220); // small debounce

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  // Delete by title (Option A)
  const handleDeleteByTitle = async (title) => {
    if (!window.confirm(`Delete "${title}" ?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/delete?title=${encodeURIComponent(title)}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        // Remove deleted items from result list
        setResults((prev) => prev.filter((r) => r.title !== title));
        // If user has opened the full image, parent will handle closing if necessary (onOpenFullImage can be used)
        alert("Deleted successfully.");
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Delete error.");
    }
  };


  return (
    <div className="relative w-full max-w-3xl mx-auto my-6">
      <div className="flex items-center gap-3">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search artworks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
        />
        {query && (
          <button onClick={() => setQuery("")} className="p-2 rounded-full hover:bg-gray-100">
            <X />
          </button>
        )}
      </div>


      {/* Dropdown */}
      {results.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border rounded-xl shadow-lg mt-2 z-50 max-h-96 overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id ?? item._id ?? item.title}
              className="flex items-center justify-between gap-3 p-3 hover:bg-gray-50 transition"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() =>
                  onOpenFullImage({
                    id: item.id ?? item._id,
                    title: item.title,
                    image_path: item.image_path ?? item.filePath,
                    category: item.category,
                  })
                }
              >
                <img
                  src={`http://localhost:5000${item.image_path ?? item.filePath}`}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded-md border"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  {item.category && <p className="text-xs text-gray-500 truncate">{item.category}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteByTitle(item.title)}
                  className="p-2 hover:bg-red-50 rounded-full"
                  title="Delete"
                >
                  <Trash2 className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="mt-2 text-sm text-gray-500">Searching...</div>
      )}
    </div>
  );
};

/* ========== AddPicPage (Upload + Search + Full Image Modal + Delete-by-title modal) ========== */
export const AddPicPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  // Delete-by-title modal states (manual modal separate from search delete)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // Full image modal (opened from search or gallery)
  const [fullImage, setFullImage] = useState(null);

  /* FILE CHANGE */
  const handleFileChange = (e, category) => {
    setSelectedFile(e.target.files[0]);
    setSelectedCategory(category);
    setUploadMessage("");
    setUploadedUrl("");
  };

  /* UPLOAD FUNCTION */
  const handleUpload = async (e, { title, category }) => {
    e.preventDefault();

    if (!selectedFile || !title || !category) {
      setUploadMessage("Please fill title & select image.");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
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

        setSelectedFile(null);
        setSelectedCategory("");
      } else {
        setUploadMessage(data.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setUploadMessage("Error uploading.");
    }
  };

  /* DELETE FUNCTION (Option A - by title) */
  const handleDelete = async (e) => {
    e.preventDefault();
    setDeleteMessage("");

    if (!deleteTitle) {
      setDeleteMessage("Enter a title to delete.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/delete?title=${encodeURIComponent(deleteTitle)}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        setDeleteMessage("Image deleted successfully!");
        setShowDeleteModal(false);
        setDeleteTitle("");
      } else {
        setDeleteMessage(data.message || "No image found with that title.");
      }
    } catch (err) {
      console.error(err);
      setDeleteMessage("Error deleting image.");
    }
  };

  /* OPEN full image modal (used by SearchBar) */
  const openFullImage = (img) => {
    setFullImage(img);
  };

  /* CLOSE full image modal */
  const closeFullImage = () => {
    setFullImage(null);
  };

  /* Delete from open full image (calls delete by title) */
  const deleteFromFullImage = async (title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    try {
      const res = await fetch(
        `http://localhost:5000/delete?title=${encodeURIComponent(title)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        alert("Deleted.");
        closeFullImage();
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Delete error.");
    }
  };

  /* UploadBox component (reused inside sections) */
  const UploadBox = ({ onChange, file, isPdf }) => {
     if (isPdf) {
       return (
         <label className="w-full border-2 border-dashed bg-gray-50 h-48 rounded-2xl flex flex-col items-center justify-center cursor-pointer">
           <PlusCircle className="text-4xl text-[#778259]" />
           <p className="mt-2">{file ? file.name : "Select PDF"}</p>
           <input type="file" accept="application/pdf" className="hidden" onChange={onChange} />
         </label>
       );
     }
     return (
       <label className="w-full border-2 border-dashed rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer bg-white">
         {file ? (
           <img src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded-2xl" />
         ) : (
           <div className="flex flex-col items-center gap-2">
             <PlusCircle className="text-4xl text-[#778259]" />
             <p>Select Image</p>
           </div>
         )}
         <input type="file" className="hidden" onChange={onChange} />
       </label>
     );
   };

  /* Section Block (upload card) */
const SectionBlock = ({ titleText, category, type }) => {
  const [localTitle, setLocalTitle] = useState("");

  return (
    <motion.div className="p-8 bg-gray-50 rounded-2xl shadow-xl border mb-10 w-full sm:w-[48%] lg:w-[30%]">
      <h3 className="text-2xl font-bold mb-6">{titleText}</h3>
      <form onSubmit={(e) => handleUpload(e, { title: localTitle, category })} className="space-y-6">
        <UploadBox
          onChange={(e) => handleFileChange(e, category)}
          file={selectedFile && selectedCategory === category ? selectedFile : null}
          isPdf={type === "pdf"} 
        />
        <input
          type="text"
          required
          placeholder="Title"
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
      <h1 className="text-4xl font-bold mt-11 mb-6 flex items-center">
        <User className="mr-3" /> Admin - Upload Photos
      </h1>

      {/* SEARCH BAR */}
      <SearchBar onOpenFullImage={openFullImage} />

      {/* Upload Sections */}
      <div className="flex flex-wrap gap-6 mt-6">
        <SectionBlock titleText="Home Screen Picture" category="home" />
        <SectionBlock titleText="Articles Image" category="articles" />
        <SectionBlock titleText="Free Gift Image" category="freegift" />
        <SectionBlock titleText="Free Gift PDF" category="freegift_pdf" type="pdf" />

      </div>

      <h2 className="text-3xl mt-10 mb-6">Gallery Categories</h2>

      <div className="flex flex-wrap gap-6">
        <SectionBlock titleText="Portrait Artwork" category="gallery_portrait" />
        <SectionBlock titleText="Creative Art" category="gallery_creative" />
        <SectionBlock titleText="Spiritual Commission Art" category="gallery_spiritual" />
        <SectionBlock titleText="Spiritual Commission Art" category="gallery_spiritual" />
      </div>

  {/* Upload Status (Popup Box) */}
{uploadMessage && (
  <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl text-center">
      <h2 className="text-2xl font-bold mb-2 text-green-700">Upload Status</h2>
      <p className="text-lg text-green-600">{uploadMessage}</p>

      {uploadedUrl && (
        <a
          href={"http://localhost:5000" + uploadedUrl}
          target="_blank"
          rel="noreferrer"
          className=" block mt-3 text-blue-600"
        >
          View Uploaded File
        </a>
      )}

      <button
        onClick={() => {
          setUploadMessage("");
          setUploadedUrl("");
        }}
        className="mt-4 py-2 px-6 bg-gray-500 text-white rounded-full"
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* DELETE BUTTON (manual modal by title)
      <div className="mt-8">
        <button
          onClick={() => setShowDeleteModal(true)}
          className="py-3 px-6 rounded-full bg-red-600 text-white flex items-center gap-2"
        >
          <Trash2 /> Delete Image by Title
        </button>
      </div> */}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Delete Image</h2>

            <form onSubmit={handleDelete} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Artwork Title to Delete"
                value={deleteTitle}
                onChange={(e) => setDeleteTitle(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-red-600 text-white"
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 rounded-full bg-gray-400 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>

            {deleteMessage && (
              <p className="text-center mt-3 text-red-600">{deleteMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* FULL IMAGE MODAL (opened from search) */}
      {fullImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden relative">
            <button
              onClick={closeFullImage}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow"
              title="Close"
            >
              <X />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">{fullImage.title}</h3>

              <div className="flex gap-6">
                <img
                  src={`http://localhost:5000${fullImage.image_path}`}
                  alt={fullImage.title}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={`http://localhost:5000${fullImage.image_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-4 bg-gray-200 rounded-md"
                >
                  Open in new tab
                </a>

                <button
                  onClick={() => deleteFromFullImage(fullImage.title)}
                  className="py-2 px-4 bg-red-600 text-white rounded-md"
                >
                  Delete (by title)
                </button>

                <button
                  onClick={closeFullImage}
                  className="py-2 px-4 bg-gray-400 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
