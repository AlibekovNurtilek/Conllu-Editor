import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillDingtalkSquare } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";
import { IoPersonSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";

const Sidebar = ({ open, setOpen, handleLogout, username }) => {
  const Menus = [
    { title: "Негизги бет", path: "/" },
    { title: "Суйломдор", icon: <AiOutlineFileText />, path: "/sentence-list" },
    { title: "Сынап көрүү", icon: <AiFillDingtalkSquare />, path: "https://aitilchi.home.kg/home" },
  ];

  const BottomMenus = [
    { title: username, icon: <IoPersonSharp /> },
    { title: "Log out", icon: <CiLogout /> },
  ];

  const handleLogoutClick = () => {
    // Логика выхода
    Cookies.remove("currentUser");
    Cookies.remove("loginTime");
    handleLogout(); // Вызов переданного обработчика выхода
  };

  return (
    <div
      className={`bg-dark-purple h-screen p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border z-10
        border-darl-purple cursor-pointer ${!open && "rotate-180"} `}
        onClick={() => setOpen(!open)}
      />

      <div className="inline-flex ml-1">
        <div className={`text-4xl text-red-700 bg-blue-50 rounded-full w-8 h-8 cursor-pointer block float-left duration-500 ${
            open && "rotate-[360deg]"
          }`}> <p className="pl-1 font-medium text-2xl">
            AI
          </p>
        </div>
        

        <h1
          className={`text-white origin-left  h-8 px-2 font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Tilchi
        </h1>
      </div>

      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md 
                ${menu.bottom ? "mt-72" : "mt-2"}`}
          >
            {menu.path ? (
              <Link to={menu.path} className="flex items-center gap-x-4 w-full">
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </Link>
            ) : (
              <div className="flex items-center gap-x-4 w-full">
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>

      <ul className="absolute left-5 bottom-2">
        {BottomMenus.map((menu, index) => (
          <li
            key={index}
            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md 
                ${menu.bottom ? "mt-72" : "mt-2"}`}
          >
            {menu.title === "Log out" ? (
              <div
                className="flex items-center gap-x-4 w-full"
                onClick={handleLogoutClick} // Обработчик для кнопки выхода
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-x-4 w-full">
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
