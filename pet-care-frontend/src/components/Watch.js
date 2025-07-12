import React, { useState } from "react";
import "./Watch.css";

const cartoonData = {
  "Animal Adventures": [
    {
      url: "https://www.youtube.com/embed/07d2dXHYb94?si=VLpVCjn0-2s5r-Lz",
      title: "Pip by Dog Inc.",
    },
    {
      url: "https://www.youtube.com/embed/C7CkHTCGSnw?si=7F1C7-5JObf0L5CL",
      title: "Famous Movies For Dogs",
    },
  ],
  "Bluey": [
    {
      url: "https://www.youtube.com/embed/EJkn-r-rJJY?si=zC2crrUzF_bUB1ok",
      title: "Keepy Uppy",
    },
    {
      url: "https://www.youtube.com/embed/fWBJTdq_pdU?si=1xic4gVFtgAjNh6P",
      title: "Cubby",
    },
  ],
  "Puppy Dog Pals": [
    {
      url: "https://www.youtube.com/embed/jXHOHOYkbYc?si=rKgc8g-ndjYfI1Tn",
      title: "Andy",
    },
    {
      url: "https://www.youtube.com/embed/mXFqLBlaJHA?si=39S49FmvUyuuAAf2",
      title: "Dogs in a water park",
    },
  ],
};

const CartoonsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCartoons = () => {
    const allCartoons = Object.entries(cartoonData)
      .filter(([category]) => selectedCategory === "All" || category === selectedCategory)
      .flatMap(([_, cartoons]) => cartoons);

    return allCartoons.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <section className="cartoons-section">
      <h2 className="cartoons-title">🎬 Visually Appealing Cartoons for Pets</h2>

      <div className="cartoons-filters">
        <select
          className="cartoons-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {Object.keys(cartoonData).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="text"
          className="cartoons-search"
          placeholder="Search cartoons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="cartoons-grid">
        {filteredCartoons().map((video, index) => (
          <div key={index} className="cartoon-card">
            <iframe
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="cartoon-video"
              width="100%"
              height="215"
              frameBorder="0"
            />
            <div className="cartoon-title">{video.title}</div>
          </div>
        ))}
        {filteredCartoons().length === 0 && (
          <p className="no-results">No cartoons found.</p>
        )}
      </div>
    </section>
  );
};

export default CartoonsSection;
