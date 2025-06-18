import React from "react";

const AboutUs = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex justify-center items-center text-white"
      style={{ backgroundImage: "url('/manas.jpg')" }}
    >
      <div className="w-full h-full bg-gray-900 bg-opacity-70 backdrop-blur-xs">
        <div className="flex items-center justify-center h-full">
          <div className="">
            {/* Заголовок с анимацией печати */}
            <h1 className="text-7xl text-center font-extrabold mb-4 text-white text-shadow-lg animate-typewriter sm:text-5xl md:text-6xl">
              <strong className="text-red-600">AI</strong>Tilchi
            </h1>
            {/* Описание с анимацией печати */}
            <p className="text-3xl text-center font-semibold animate-typewriter sm:text-3xl md:text-4xl">
              "Кыргыз тилин түшүнгөн жасалма интеллект"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
