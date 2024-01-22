import { MdClose, MdDashboard, MdOnlinePrediction, MdPayment, MdRateReview } from "react-icons/md"
import { Link } from "react-router-dom"
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUser, FaTasks } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
const DashboardSidebar = ({ setShowMenu, showMenu, handleShowMenu, hideMenu }) => {
  return (
    <div className={`w-[50%] lg:w-[15%] fixed top-0 left-0 bottom-0 z-20 p-5 bg-[#FF6F61] text-white ${showMenu ? 'hidden lg:block' : 'block lg:hidden'}`}>
      <div className='w-full flex flex-row justify-between lg:justify-start items-center gap-5'>
        <div className="flex flex-row justify-start items-center gap-3">
          <MdOnlinePrediction size={20} />
          <h1 className='text-2xl text-start'> <span>CAZA</span> <span className=' text-black'>MART</span></h1>
        </div>
        <MdClose className="block lg:hidden cursor-pointer" onClick={hideMenu} size={20} />
      </div>
      <p className="w-full text-base font-light tracking-widest mt-10">Main</p>
      <div className="w-full mt-5 space-y-3">
        <div className="w-full  tracking-widest text-lg font-light p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <GrOverview size={18} />
          <Link to='/dashboard'>overview</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <MdDashboard size={18} />
          <Link to='/dashboard/products'>Products</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <CiShoppingCart size={20} />
          <Link to='/dashboard/orders'>Orders</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <MdPayment size={20} />
          <Link to='/dashboard/payments'>Payments</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <FaRegUser size={18} />
          <Link to='/dashboard/customers'>Customers</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <MdRateReview size={20} />
          <Link to='/dashboard/reviews'>Reviews</Link>
        </div>
        <div className="w-full text-lg font-light tracking-widest p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <FaTasks size={16} />
          <Link to='/dashboard/tasks'>Tasks</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-1 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <FaRegUser size={18} />
          <Link to='/dashboard/users'>Users</Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar