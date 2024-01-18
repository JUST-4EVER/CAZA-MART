import { CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";

const Dashboard = () => {
  return (
    <div className="w-full p-3">
      <div className="w-[90%] mx-auto lg:w-[75%] lg:ml-[20%] mt-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-start items-center">

          <div className="w-full shadow bg-white rounded-md p-5 flex flex-row justify-between items-center">
            <div className="w-fit space-y-2">
              <h1 className="text-base tracking-widest">Total Income</h1>
              <p className="text-base font-bold">20,000</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-green-700 flex flex-row justify-center items-center">
              <TbMoneybag size={20} className="inline text-green-700" />
            </div>
          </div>
          <div className="w-full shadow bg-white rounded-md p-5 flex flex-row justify-between items-center">
            <div className="w-fit space-y-2">
              <h1 className="text-base tracking-widest">Orders</h1>
              <p className="text-base font-bold">20,000</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-red-700 flex flex-row justify-center items-center">
              <CiShoppingCart className="inline text-red-700" size={20} />
            </div>
          </div>
          <div className="w-full shadow bg-white rounded-md p-5 flex flex-row justify-between items-center">
            <div className="w-fit space-y-2">
              <h1 className="text-base tracking-widest">Customers</h1>
              <p className="text-base font-bold">20,000</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-blue-700 flex flex-row justify-center items-center">
              <FaRegUser size={20} className="inline text-blue-700" />
            </div>
          </div>
          <div className="w-full shadow bg-white rounded-md p-5 flex flex-row justify-between items-center">
            <div className="w-fit space-y-2">
              <h1 className="text-base tracking-widest">Total income</h1>
              <p className="text-base font-bold">20,000</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-green-500 flex flex-row justify-center items-center">
              <TbMoneybag size={20} className="inline text-green-500" />
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Dashboard