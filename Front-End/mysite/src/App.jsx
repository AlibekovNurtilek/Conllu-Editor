import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillDingtalkSquare } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";

const App = () => {
  
  const [open, setOpen] = useState(true)
  const Menus = [
    { title: "Dashboard"},
    { title: "Pages", icon: <AiOutlineFileText />},
    { title: "About us", icon: <AiFillDingtalkSquare />}
  ]

  return (
    <div className="flex">
      <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftShort className={`bg-white text-dark-purple
         text-3xl rounded-full absolute -right-3 top-9 border
        border-darl-purple cursor-pointer ${!open && "rotate-180"}`} onClick={()=>setOpen
        (!open)}></BsArrowLeftShort>

        <div className="inline-flex">
          <AiFillEnvironment className={`bg-amber-300 text-4xl rounded
            cursor-pointer block float-left mr-2 duration-500
            ${open && "rotate-[360deg]"}`}/>

            <h1 className={`text-white origin-left font-medium text-2xl
              duration-300 ${!open && "scale-0"}`}>ManasNPL</h1>
        </div>


        <div className={`flex items-center rounded-md bg-light-white
          mt-6 ${!open ? "px-2.5" : "px-4"} py-2`}>

            <BsSearch className={`text-white text-lg block float-left
              cursor-pointer ${open && "mr-2"}`}/>

            <input type={"search"}
              placeholder="Search"
              className={`text-base bg-transparent w-full text-white
              focus:outline-none ${!open && "hidden"}`}
            />
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li key={index} className="text-gray-300 text-sm flex
              items-center gap-x-4 cursor-pointer p-2
              hover:bg-light-white rounded-md mt-2">
                <span className="text-2xl block float-left">
                  {menu.icon? menu.icon: <RiDashboardFill/>}
                </span>
                <span className={`text-base font-medium flex-1
                  duration-200
                  ${!open && "hidden"}`}>{menu.title}</span>
              </li>
            </>
          ))}
        </ul>
      </div>


      <div className="p-7">
        <h1 className="text-2xl font-semibold">Homepage</h1>
      </div>
    </div>
  );
};

export default App;
