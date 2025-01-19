import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEnvironment } from "react-icons/ai";


const users = [
  { username: 'Nurtilek', password: 'nurtilek' },
  { username: 'Aijamal', password: 'aijamal' },
  { username: 'Gulshaiyr', password: 'gulshaiyr' },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    
    if (user) {
      setError('');
      onLogin(user); // Передаём данные пользователя в родительский компонент
    } else {
      setError('Туура эмес маалымат киргизилди');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-b from-gray-800 to-gray-600'>
      <div className='w-96 h-[500px] bg-dark-purple rounded-lg text-white'>
        <h2 className='text-center text-2xl my-4 text-'>Кош келиниз!!!</h2>
        
        <div className='mt-20'>
            <div className='flex  rounded-2xl bg-white mx-5 h-10 '>
                <div className='mr-2'> <FaUser className='text-black text-2xl mt-[6.5px]'/></div>
                <input className='text-black  focus:outline-none w-72 text-lg' type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className='flex mt-10  rounded-2xl bg-white mx-5 h-10 '>
                <div className='mr-2'> <RiLockPasswordFill className='text-black text-2xl mt-[6.5px]'/></div>
                <input className='text-black bg-white focus:outline-none w-72 text-lg' type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className=' mt-10    mx-5 h-10 '>
                <button className='text-blue-100 rounded-2xl  w-[100%] h-[100%] cursor-pointer text-xl 
                    bg-blue-700 hover:bg-blue-800 font-bold'
                    onClick={handleLogin}>Улантуу</button>
                {error && <p className='text-red-600 text-center mt-1'>{error}</p>}
            </div>
        </div>

        <div className='flex justify-center mt-28'>
            <div className="inline-flex">
                <AiFillEnvironment
                className={`bg-amber-300 text-black text-4xl rounded cursor-pointer block float-left mr-2 duration-500`}
                />

                <h1
                className={`text-white origin-left font-medium text-2xl duration-300`}
                >
                ManasNPL
                </h1>
            </div>  
        </div>
        
      </div>
    </div>
  );
}

export default Login;
