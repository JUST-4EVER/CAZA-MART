import { RiListOrdered2 } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import Cookies from "js-cookie";
const CustomerSideBar = () => {
  const handleLogout = () => {
    Cookies.remove('customerToken');
    window.location.replace('/');
  }
  return (
    <div className="w-full lg:w-[30%] h-[60vh] rounded shadow bg-white sticky">
      <div className="p-3 w-full grid grid-cols-1 justify-start items-center gap-5">
        <Link className="w-full flex flex-row justify-start items-center gap-5" to='/my-account/customer-order'><RiListOrdered2 size={20} /> <span>My Orders</span></Link>
        <Link className="w-full flex flex-row justify-start items-center gap-5" to='/my-account/customer-profile'><CgProfile size={20} /> <span>My Profile</span></Link>
        <Link className="w-full flex flex-row justify-start items-center gap-5" to='/my-account/personal-information'><IoInformationCircleOutline size={20} /> <span>Personal Information</span></Link>
        <Link className="w-full flex flex-row justify-start items-center gap-5" to='/my-account/customer-change-password'><MdOutlinePassword size={20} /> <span>Change Password</span></Link>
        <Link className="w-full flex flex-row justify-start items-center gap-5" to='/' onClick={handleLogout}><CiLogout size={20} /> <span>Logout</span></Link>
      </div>
    </div>
  )
}

export default CustomerSideBar