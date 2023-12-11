import { Route, Routes } from "react-router-dom"
import { AdminLogin, Home, ItemCarts, PageLayout, ProductDetail, UserLogin, UserRegister } from "./ExportFiles"
const App = () => {
  return (
    <>
      <Routes>
        {/* public-routes */}
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/item-cart" element={<ItemCarts />} />
          <Route path="/products" element={<ItemCarts />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>
        {/* auth routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default App