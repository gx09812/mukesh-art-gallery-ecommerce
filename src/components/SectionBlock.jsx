import { useState } from "react";

export default function SectionBlock({ title, category }) {
  const [imagePath, setImagePath] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setImagePath(data.path);
  };

  return (
    <div className="p-4 bg-gray-200 rounded-xl w-72">
      <h3 className="font-bold mb-3">{title}</h3>

      <input type="file" onChange={handleUpload} />

      {imagePath && (
        <div className="mt-3 text-sm text-green-600">
          Saved: <strong>{imagePath}</strong>
        </div>
      )}
    </div>
  );
}
