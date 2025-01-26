import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Mainpage from "./components/Mainpage";
import Homepage from "./pages/Homepage"
import AboutUs from "./pages/AboutUs";
import SentenceList from './pages/SentenceList';
import SentenceDetail from './pages/SentenceDetail';
import Instruction from './components/Instruction';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(true);
  
  useEffect(() => {
    // Проверяем cookies на наличие информации о пользователе и времени последней авторизации
    const savedUser = Cookies.get('currentUser');
    const loginTime = Cookies.get('loginTime');

    if (savedUser && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime, 10);
      const sessionTimeout = 60 * 60 * 1000; // 60 минут в миллисекундах

      if (timeElapsed < sessionTimeout) {
        setCurrentUser(JSON.parse(savedUser)); // Если сессия ещё активна, показываем пользователя
      } else {
        Cookies.remove('currentUser'); // Если время истекло, удаляем cookies
        Cookies.remove('loginTime');
      }
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    const currentTime = Date.now();
    Cookies.set('currentUser', JSON.stringify(user), { expires: 1 / 24 });
    Cookies.set('loginTime', currentTime.toString(), { expires: 1 / 24 });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    Cookies.remove('currentUser');
    Cookies.remove('loginTime');
  };

  // Если пользователь не авторизован, показываем экран авторизации
  if (!currentUser) {
    return <Login onLogin={handleLogin}  />;
  }

  // Если пользователь авторизован, показываем основной контент
  return (
    <Router>

    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar open={open} setOpen={setOpen} handleLogout={handleLogout} username={currentUser.username}/>

      {/* Main Content */}
      <div className=" flex-1 ">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/sentence-list" element={<SentenceList/>} />
          <Route path='/sentence/:id' element={<SentenceDetail/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path='/ins' element={<Instruction/>} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
