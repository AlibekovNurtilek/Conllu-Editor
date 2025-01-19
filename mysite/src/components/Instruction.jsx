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
      
    </div>
  );
};

export default Instruction;
