import { Outlet } from "react-router-dom"
import { Footer, Header } from "../ExportFiles"

const PageLayout = () => {
    return (
        <>
            <Header />
            <Outlet/>
            <Footer />
        </>
    )
}

export default PageLayout