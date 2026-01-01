import React from "react";

const ParallaxPage = () => {
  return (
    <div className="min-h-screen bg-[#fbf6ee]">
      <section
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="px-6">
            <h1 className="text-5xl font-serif text-white drop-shadow-sm mb-4">
              Welcome to Parallax
            </h1>
            <button className="btn-primary">
              Explore
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-serif text-stone-800 mb-3">
              Elegant Content Section
            </h2>
            <p className="text-stone-700">
              This section follows the unified Stone/Amber design. The parallax
              backgrounds above and below create depth while the content remains
              clean and readable across mobile and desktop.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="px-6">
            <h1 className="text-5xl font-serif text-white drop-shadow-sm">
              Scroll Down More
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxPage;
