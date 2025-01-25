import React from "react";

const AboutUs = () => {
  return (
    <div
      className="bg-cover bg-center h-screen flex justify-center items-center text-white"
      style={{ backgroundImage: "url('/manas.jpg')" }}
    >
      <div className="w-full h-full bg-gray-900 bg-opacity-70 backdrop-blur-xs">
        <div className="flex items-center h-full">
          <div className="ml-36">
            {/* Заголовок с анимацией печати */}
            <h1 className="text-7xl font-extrabold mb-4 text-white text-shadow-lg animate-typewriter sm:text-5xl md:text-6xl">
              Manas NLP
            </h1>
            {/* Описание с анимацией печати */}
            <p className="text-3xl font-semibold animate-typewriter sm:text-xl md:text-2xl">
              "Открывай мир Киргизского языка с умом — быстро, удобно, профессионально."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
