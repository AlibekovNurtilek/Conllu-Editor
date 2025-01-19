import React from "react";
import Cookies from 'js-cookie';

const Instruction = () => {
  const handleLogout = () => {
    Cookies.remove('currentUser');
    Cookies.remove('loginTime');
  };

  return (
    <div>
      <h2>Добро пожаловать!</h2>
      <button className="bg-red-600 m-3 px-3 py-2 rounded-md text-white" onClick={handleLogout}>Выйти</button>
      {/* Основной контент приложения */}
    </div>
  );
};

export default Instruction;
