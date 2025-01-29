import React, { useEffect } from 'react';

const AlertMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Закрываем уведомление через 3 секунды
    }, 3000);

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-md text-white 
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {message}
    </div>
  );
};

export default AlertMessage;
