import { useState } from "react";
import { MdClose, MdOutlineMenu, MdOutlineNotificationsNone } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDeleteUserMutation, useGetCurrentUserQuery } from "../redux/slices/UserSlices";
import toast from "react-hot-toast";
import { useGetCurrentUserProfileQuery } from "../redux/slices/UserProfileSlices";
const DashboardHeader = ({ setShowMenu, showMenu, handleShowMenu, hideMenu }) => {
  const navigate = useNavigate();
  const { data } = useGetCurrentUserQuery();
  const { data: currentUserProfile = {} } = useGetCurrentUserProfileQuery()
  const userProfile = currentUserProfile?.currentUserProfile || {};
  const currentUser = data?.userExist || {};
  const [deleteUser] = useDeleteUserMutation();
  const [showSettings, setShowSettings] = useState();
  const handleLogout = () => {
    Cookies.remove('userToken');
    navigate('/');
    setTimeout(() => {
      toast.success('User logged out')
    }, 2000)
  }

  const deleteAccount = async (id) => {
    if (confirm("are you sure you want to delete this account")) {
      await deleteUser(id)
        .then((res) => {
          const status = res.data.status;
          if (status) {
            toast.success(res?.data?.message)
            Cookies.remove('userToken');
            window.location.replace('/');
          } else {
            toast.error(res?.data?.message)
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }
  const settingModel = (
    <div className="w-full bg-white lg:w-[20%] absolute right-0 lg:right-5 top-[4.25rem] p-5 shadow rounded space-y-3
    z-10"
      onMouseLeave={() => setShowSettings(false)}>
      <h1 className="text-lg font-light tracking-widest">User Profile</h1>
      <hr className="w-full" />
      <Link className="text-base block tracking-wide" to='/dashboard/view-user-profile'>View Profile</Link>
      <Link className="text-base block tracking-wide" to='/dashboard/user-change-password'>Change password</Link>
      <button className="text-base block tracking-wide" onClick={handleLogout}>Logout</button>
      <hr className="w-full" />
      <button className="text-base block tracking-wide text-red-500" onClick={() => deleteAccount(currentUser?.id)}>Delete Account </button>
    </div>
  )
  return (
    <div className="w-full bg-white p-3 shadow relative">
      <div className="w-[90%] mx-auto lg:w-[80%] lg:ml-[18%]">
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
              {
                userProfile?.avatar ?
                  (
                    <img className="w-10 h-10 rounded-full object-center bg-cover" src={userProfile?.avatar} alt="" />
                  )
                  :
                  (
                    <img className="w-10 h-10 rounded-full object-center bg-cover" src="/public/images/userProfile.png" alt="" />
                  )
              }


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