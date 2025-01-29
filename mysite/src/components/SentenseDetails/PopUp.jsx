import React from 'react';

const PopUp = ({ message, onConfirm, onCancel, confirmButtonText, cancelButtonText }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm  ">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-900 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            {cancelButtonText}  {/* Текст для кнопки отмены */}
          </button>
          <button
            className="bg-dark-purple text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            {confirmButtonText}  {/* Текст для кнопки подтверждения */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
