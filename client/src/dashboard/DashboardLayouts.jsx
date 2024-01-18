import { Outlet } from "react-router-dom"
import DashboardHeader from "./DashboardHeader"
import DashboardSidebar from "./DashboardSidebar"

const DashboardLayouts = ({ setShowMenu, showMenu, handleShowMenu, hideMenu }) => {
  return (
    <div className="w-full">
      <DashboardSidebar hideMenu={hideMenu} handleShowMenu={handleShowMenu} showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="w-full">
        <DashboardHeader hideMenu={hideMenu} handleShowMenu={handleShowMenu} showMenu={showMenu} setShowMenu={setShowMenu} />
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayouts