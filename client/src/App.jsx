import { Route, Routes } from "react-router-dom"
import { Home, ItemCarts, PageLayout } from "./ExportFiles"
const App = () => {
  return (
    <>
      <Routes>
        {/* public-routes */}
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/item-cart" element={<ItemCarts />} />
        </Route>
      </Routes>
    </>
  )
}

export default App