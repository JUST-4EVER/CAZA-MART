import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardSidebar from "./DashboardSidebar"

const DashboardLayouts = () => {
  return (
    <div className="w-full">
        <DashboardSidebar/>
        <div className="w-full">
            <DashboardHeader/>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayouts