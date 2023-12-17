import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"

const CustomerOrders = () => {
  return (
    <div>
      <div className="w-full flex flex-row justify-start items-center gap-2 md:gap-5 text-base font-light md:text-lg md:font-normal">
        <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/'>Home</Link>
        <IoIosArrowForward className="inline" size={14} />
        <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/my-account'>My account</Link>
        <IoIosArrowForward className="inline" size={14} />
        <span>My orders</span>
      </div>
    </div>
  )
}

export default CustomerOrders