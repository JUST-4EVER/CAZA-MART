import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';
import {
  About,
  Contact,
  CustomerChangePassword,
  CustomerLogin, CustomerOrders, CustomerProfile, CustomerRegister,
  Dashboard,
  DashboardLayouts,
  Home, ItemCarts, Myaccount, PageLayout, PersonalInformation, ProductDetail,
  Shop,
  UserLogin
} from "./ExportFiles"
const App = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <>
        <Routes>
          {/* auth routes */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          {/* public-routes */}
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/item-cart" element={<ItemCarts />} />
            <Route path="/products" element={<ItemCarts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/my-account" element={<Myaccount />}>
              <Route index element={<CustomerOrders />} />
              <Route path="customer-order" element={<CustomerOrders />} />
              <Route path="customer-profile" element={<CustomerProfile />} />
              <Route path="personal-information" element={<PersonalInformation />} />
              <Route path="customer-change-password" element={<CustomerChangePassword />} />

            </Route>
          </Route>
          {/* dashboard route */}
          <Route path="/dashboard" element={<DashboardLayouts/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>

          </Route>
        </Routes>
        <Toaster />
      </>
    </SkeletonTheme>
  )
}

export default App