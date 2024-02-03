import { IoIosArrowForward } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FormatCurrency } from "../utilities/Number_Formatter";
import { decreaseQuantity, increaseQuantity, removeFromCart, totalPriceProducts } from "../redux/toolkit/slices/cartSlices";
import { loadStripe } from '@stripe/stripe-js';
import { useCreatePaymentMutation } from "../redux/slices/PaymentSlices";
import { useGetCurrentCustomerQuery } from "../redux/slices/CustomerSlices";
const ItemCarts = () => {
  const { data: getCurrentCustomer = {} } = useGetCurrentCustomerQuery()
  const currentCustomer = getCurrentCustomer?.customer || {};
  const [createPayment] = useCreatePaymentMutation()
  const products = useSelector(state => state?.cart?.cart);
  const totalPrice = useSelector(state => state?.cart?.totalPrice)
  console.log('price', totalPrice);
  const dispatch = useDispatch();
  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product))
  }
  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product))
  }

  const checkoutPayment = async () => {
    console.log(import.meta.env.VITE_APP_STRIPE_PUBLISHIBLE_KEY);
    const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHIBLE_KEY);
    createPayment({ products: products, userId: currentCustomer?.id })
      .then((res) => {
        if(res.data.url){
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log('err', err.data);
      });

  }
  return (
    <div className="w-full p-3">
      <div className="w-full mt-5 flex flex-row justify-start items-center gap-5">
        <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/'>Home</Link>
        <IoIosArrowForward className="inline" size={15} />
        <span>Shopping Cart </span>
      </div>
      <div className="mt-10 w-full space-y-3">
        {
          products?.map(product => {
            return <div key={product?.id} className="w-full space-y-5">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <img className="w-full md:w-40 md:h-40 lg:w-28 lg:h-28 rounded" src={product?.thumbnail} alt="" />
                <div className="w-full space-y-3">
                  <h1 className="text-base font-medium">{product?.name}</h1>
                  <p className="text-sm font-light">{product?.description}</p>
                </div>
                <div className="w-full space-y-3 lg:ml-2">
                  <p className="w-full text-base font-medium">{FormatCurrency(product?.price)}</p>
                  <p className="w-full text-sm font-light line-through">{FormatCurrency(product?.discount)}</p>
                </div>
                <div className="w-full flex flex-row justify-start gap-3">
                  <div className="w-full flex flex-row justify-start items-start  gap-4">
                    <button className="px-3 py-1 text-lg font-medium" onClick={() => handleDecreaseQuantity(product)}> - </button>
                    <p>{product.quantity}</p>
                    <button className="px-3 py-1 text-lg font-medium" onClick={() => handleIncreaseQuantity(product)}> + </button>
                  </div>
                  <button className="w-fit h-fit px-3 py-1 rounded shadow text-lg font-normal tracking-widest" onClick={() => { dispatch(removeFromCart(product?.id)) }} > remove </button>
                </div>
              </div>
              <hr className="w-full" />
            </div>
          })
        }
      </div>
      <hr className="w-full" />
      <div className="w-full p-4 bg-[#FF6F61] text-white flex flex-row justify-end items-center">
        <div className="w-full lg:w-40">
          <h1 className="text-lg font-medium tracking-widest capitalize">Total price</h1>
          <p>{FormatCurrency(totalPrice)}</p>
         {
          totalPrice > 0 &&  <button className="mt-5 tracking-widest px-5 py-2 shadow rounded text-[#FF6F61] bg-white
          hover:bg-[#FF6F61] hover:text-white transition-all duration-300"
           onClick={() => checkoutPayment()}>Checkout</button>
         }
        </div>
      </div>
    </div>
  )
}

export default ItemCarts