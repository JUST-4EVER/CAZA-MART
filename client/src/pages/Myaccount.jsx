import { Outlet } from "react-router-dom"
import CustomerSideBar from "../components/CustomerSideBar"

const Myaccount = () => {
  return (
    <div className="w-full p-2 mt-5">
      <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-5">
        <CustomerSideBar />
        <div className="w-full lg:w-[75%]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Myaccount