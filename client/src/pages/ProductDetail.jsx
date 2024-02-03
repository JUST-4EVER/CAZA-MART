import { Link, useLocation } from "react-router-dom"
import { FormatCurrency } from "../utilities/Number_Formatter";
import { Review } from "../ExportFiles";
import { useState } from "react";
import { useGetCategoriesQuery } from "../redux/slices/CategorySlices";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/toolkit/slices/cartSlices";

const ProductDetail = () => {
    const itemcart = useSelector(state => state?.cart?.cart)
    console.log('item cart', itemcart);
    const dispatch = useDispatch();
    const { data: categoryData = [] } = useGetCategoriesQuery();
    const categories = categoryData?.getCategories || [];
    const [showReview, setShowReview] = useState(false);
    const product_detail = useLocation().state;
    const category = categories?.find(res => res?.id == product_detail?.category_id);
    return (
        <div className="w-full p-4 bg-white mt-5 space-y-4">
            <div className="w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                <img className="w-[95%] h-96  object-center bg-cover" src={product_detail?.thumbnail} alt="" />
                <div className="w-full space-y-4">
                    <p className="text-2xl tracking-widest font-bold">{product_detail?.brand}</p>
                    <p className="w-full flex flex-row justify-start items-center gap-5">
                        <span>{FormatCurrency(product_detail?.price)}</span>
                        <span className=" line-through text-red-500">{FormatCurrency(product_detail?.discount)}</span>
                    </p>
                    <hr className="w-full" />
                    <p className=" text-lg"> Category : <span className=" font-bold ">{category?.category_name}</span></p>
                    <p className="text-lg"> Availibility : <span className="text-green-500 font-bold">{product_detail?.availibility}</span></p>
                    <div className="w-full flex flex-row justify-start gap-3">
                        <span className="text-lg">Size:</span>
                        <div className="w-full flex flex-row justify-start items-center gap-2">
                            {
                                product_detail?.size.map((size, index) => {
                                    return <span key={index}>{size.toUpperCase()}</span>
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-start gap-3">
                        <span className="text-lg">Color:</span>
                        <div className="w-full flex flex-row justify-start items-center gap-2">
                            {
                                product_detail?.color.map((color, index) => {
                                    return <span key={index}>{color.slice(0, 1).toUpperCase() + color.slice(1)}</span>
                                })
                            }
                        </div>
                    </div>
                    <hr className="w-full" />
                    <p>Description</p>
                    <p className="mt-3 text-base">{product_detail?.description}</p>
                    <hr className="w-full" />
                    <div className="w-full flex flex-row justify-start items-center gap-3">
                        <button className="px-4 py-2  shadow bg-[#FF6F61] text-lg text-white"
                            onClick={() => dispatch( addToCart(product_detail) )}> Add Cart </button>
                        <button className="px-4 py-2  shadow text-[#FF6F61] text-lg bg-white"
                            onClick={() => setShowReview(!showReview)}> Create Review</button>
                    </div>
                    <div className="w-full">
                        {
                            showReview && <Review showReview={showReview} setShowReview={setShowReview} />
                        }
                    </div>
                </div>
            </div>
            <div className="mt-10 p-1 shadow bg-white">
            </div>
        </div>
    )
}

export default ProductDetail