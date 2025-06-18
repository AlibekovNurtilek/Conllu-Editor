import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const users = [
  { username: 'Admin', password: 'admin' },
  { username: 'Aijamal', password: 'aijamal' },
  { username: 'Gulshaiyr', password: 'gulshaiyr' },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true); // чтобы иконка AI крутилась

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setError('');
      onLogin(user); // Передаём пользователя вверх
    } else {
      setError('Туура эмес маалымат киргизилди');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 to-gray-600'>
      <div className='w-96 h-[500px] bg-dark-purple rounded-lg text-white'>
        <h2 className='text-center text-2xl my-4'>Кош келиниз!!!</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className='mt-20'
        >
          {/* Username input */}
          <div className='flex rounded-2xl bg-white mx-5 h-10'>
            <div className='mr-2'>
              <FaUser className='text-black text-2xl mt-[6.5px]' />
            </div>
            <input
              className='text-black focus:outline-none w-72 text-lg'
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className='flex mt-10 rounded-2xl bg-white mx-5 h-10'>
            <div className='mr-2'>
              <RiLockPasswordFill className='text-black text-2xl mt-[6.5px]' />
            </div>
            <input
              className='text-black bg-white focus:outline-none w-72 text-lg'
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <div className='mt-10 mx-5 h-10'>
            <button
              type="submit"
              className='text-blue-100 rounded-2xl w-full h-full cursor-pointer text-xl 
                         bg-blue-700 hover:bg-blue-800 font-bold'
            >
              Улантуу
            </button>
            {error && <p className='text-red-600 text-center mt-1'>{error}</p>}
          </div>
        </form>

        {/* Animated Logo */}
        <div className='flex justify-center mt-28'>
          <div className="inline-flex ml-1">
            <div
              className={`text-4xl text-red-700 bg-blue-50 w-8 h-8 rounded-full cursor-pointer block duration-500 transition-all ${
                open & "rotate-[360deg]"
              }`}
              onClick={() => setOpen(!open)}
            >
              <p className="pl-1 font-medium text-2xl">AI</p>
            </div>

            <h1
              className={`text-white origin-left h-8 px-2 font-medium text-2xl duration-300 transition-all ${
                !open && "scale-0"
              }`}
            >
              Tilchi
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
