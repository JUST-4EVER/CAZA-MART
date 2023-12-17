import { Outlet } from "react-router-dom"
import CustomerSideBar from "../components/CustomerSideBar"

const Myaccount = () => {
  return (
    <div className="w-full p-2 mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-5">
            <CustomerSideBar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Myaccount