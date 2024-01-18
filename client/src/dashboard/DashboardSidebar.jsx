import { MdDashboard, MdOnlinePrediction, MdPayment } from "react-icons/md"
import { Link } from "react-router-dom"
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUser, FaTasks } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";

const DashboardSidebar = () => {
  return (
    <div className="w-full lg:w-[18%] fixed top-0 left-0 bottom-0 z-20 p-5 bg-[#FF6F61] text-white">
      <div className='w-full flex flex-row justify-start items-center gap-5'>
        <MdOnlinePrediction size={30} />
        <h1 className=' text-xl md:text-2xl text-start'> <span>CAZA</span> <span className=' text-black'>MART</span></h1>
      </div>

      <p className="w-full text-base font-light tracking-widest mt-10">Main</p>
      <div className="w-full mt-5 space-y-3">
        <div className="w-full  tracking-widest text-lg font-light p-2 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
        <GrOverview size={20}/>
          <Link to='/dashboard'>overview</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-2 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <MdDashboard size={20} />
          <Link to='/dashboard/products'>Products</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-2 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <CiShoppingCart size={20} />
          <Link to='/dashboard/orders'>Orders</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-2 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <MdPayment size={20} />
          <Link to='/dashboard/payments'>Payments</Link>
        </div>
        <div className="w-full tracking-widest text-lg font-light p-2 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <FaRegUser size={20} />
          <Link to='/dashboard/customers'>Customers</Link>
        </div>
        <div className="w-full text-lg font-light tracking-widest p-2 hover:bg-white hover:text-[#FF6F61] hover:rounded flex flex-row justify-start items-center gap-2">
          <FaTasks size={20} />
          <Link to='/dashboard/tasks'>Tasks</Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar