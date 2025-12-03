// src/components/ParallaxPage.jsx
import React from "react";

const ParallaxPage = () => {
  return (
    <div>
      {/* Parallax Section 1 */}
      <section
        className="h-screen bg-cover bg-center bg-fixed flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        }}
      >
        <div className="text-white text-center drop-shadow-lg">
          <h1 className="text-5xl mb-4">Welcome to Parallax</h1>
          <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
            Explore
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section className="h-[60vh] bg-white flex flex-col justify-center items-center p-8 text-center">
        <h2 className="text-3xl mb-4">Normal Content Section</h2>
        <p className="max-w-xl">
          This is a normal scrolling section. Your content goes here. The
          parallax sections above and below move slower when scrolling.
        </p>
      </section>

      {/* Parallax Section 2 */}
      <section
        className="h-screen bg-cover bg-center bg-fixed flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2')",
        }}
      >
        <div className="text-white text-center drop-shadow-lg">
          <h1 className="text-5xl">Scroll Down More</h1>
        </div>
      </section>
      {/* Parallax Section 1 */}
      <section
        className="h-screen bg-cover bg-center bg-fixed flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        }}
      >
        <div className="text-white text-center drop-shadow-lg">
          <h1 className="text-5xl mb-4">Welcome to Parallax</h1>
          <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
            Explore
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section className="h-[60vh] bg-white flex flex-col justify-center items-center p-8 text-center">
        <h2 className="text-3xl mb-4">Normal Content Section</h2>
        <p className="max-w-xl">
          This is a normal scrolling section. Your content goes here. The
          parallax sections above and below move slower when scrolling.
        </p>
      </section>

      {/* Parallax Section 2 */}
      <section
        className="h-screen bg-cover bg-center bg-fixed flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2')",
        }}
      >
        <div className="text-white text-center drop-shadow-lg">
          <h1 className="text-5xl">Scroll Down More</h1>
        </div>
      </section>
    </div>
  );
};

export default ParallaxPage;
