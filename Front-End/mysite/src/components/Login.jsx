import React, { useState } from 'react';


const users = [
  { username: 'user1', password: 'password1' },
  { username: 'linguist1', password: 'linguistpass1' },
  { username: 'linguist2', password: 'linguistpass2' },
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
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
