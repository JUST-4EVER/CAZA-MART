import { Outlet } from "react-router-dom"
import { Footer, Header } from "../ExportFiles"

const PageLayout = () => {
    return (
        <>
            <Header />
            <div className="w-[95%] md:w-[90%] mx-auto">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default PageLayout