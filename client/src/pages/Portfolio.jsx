import { useState, useEffect } from "react";
import API from "../api";

const Portfolio = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("all");
  const categories = [
    "all",
    "wedding",
    "mehendi",
    "ring ceremony",
    "portrait",
    "other",
  ];

  useEffect(() => {
    fetchPhotos();
  }, [category]);

  const fetchPhotos = async () => {
    try {
      const res =
        category === "all"
          ? await API.get("/portfolio")
          : await API.get(`/portfolio/${category}`);
      setPhotos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <h1 className="text-4xl font-bold text-center mb-4">Our Portfolio</h1>
      <p className="text-gray-500 text-center mb-8">
        Browse our work by category
      </p>

      <div className="flex justify-center gap-3 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full capitalize border transition ${
              category === cat
                ? "bg-black text-white"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {photos.length === 0 ? (
        <p className="text-center text-gray-400">
          No photos yet in this category.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{photo.title}</h3>
                <p className="text-gray-500 text-sm capitalize">
                  {photo.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
