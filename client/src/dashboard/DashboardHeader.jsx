import { useState } from "react";
import { MdClose, MdOutlineMenu, MdOutlineNotificationsNone } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
const DashboardHeader = ({ setShowMenu, showMenu, handleShowMenu, hideMenu }) => {
  const [showSettings, setShowSettings] = useState();

  const settingModel = (
    <div className="w-full bg-white lg:w-[20%] absolute right-0 lg:right-5 top-[4.25rem] p-5 shadow rounded space-y-3"
      onMouseLeave={() => setShowSettings(false)}>
      <h1 className="text-lg font-light tracking-widest">User Profile</h1>
      <hr className="w-full" />
      <Link className="text-base block tracking-wide" to='/view-user-profile'>view profile</Link>
      <Link className="text-base block tracking-wide" to='/view-user-profile'>Logout</Link>
      <hr className="w-full" />
      <button className="text-base block tracking-wide text-red-500">Delete Account </button>
    </div>
  )
  return (
    <div className="w-full bg-white p-3 shadow relative">
      <div className="w-[90%] mx-auto lg:w-[75%] lg:ml-[20%]">
        <div className="w-full flex flex-row justify-between items-center gap-10">
          {
            showMenu ? <MdOutlineMenu className="block lg:hidden cursor-pointer" size={20} onClick={handleShowMenu} /> : <MdClose className="block lg:hidden cursor-pointer" size={20} onClick={handleShowMenu} />
          }
          <div className="w-fit">
            <p className="text-xl tracking-widest">Dashboard</p>
          </div>
          <div className="w-[40%] flex flex-row justify-end items-center gap-5">
            <MdOutlineNotificationsNone className="inline" size={30} />
            <div className="flex flex-row justify-start items-center gap-2" onClick={() => setShowSettings(!showSettings)}>
              <img className="w-10 h-10 rounded-full object-center bg-cover" src="/public/images/duraan.jpg" alt="" />

              {
                showSettings ? <IoIosArrowUp className="inline" size={20} /> : <IoIosArrowDown className="inline" size={20} />
              }
            </div>
          </div>
        </div>
        {
          showSettings && settingModel
        }
      </div>

    </div>
  )
}

export default DashboardHeader