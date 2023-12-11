import { Link, useLocation } from "react-router-dom"
import { FormatCurrency } from "../utilities/Number_Formatter";
import { Review } from "../ExportFiles";
import { useState } from "react";

const ProductDetail = () => {
    const [showReview, setShowReview] = useState(false);
    const product_detail = useLocation().state;
    console.log(product_detail);
    return (
        <div className="w-full p-4 bg-white mt-5 space-y-4">
            <div className="w-full p-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                <img className="w-[95%] h-96  object-center bg-cover" src={product_detail?.thumbnail} alt="" />
                <div className="w-full space-y-4">
                    <p className="flex flex-row justify-start items-center gap-5">
                        <Link to='/'>Home</Link>
                        <span> / </span>
                        <span>{product_detail?.brand}</span>
                    </p>
                    <p className="text-2xl tracking-widest font-bold">{product_detail?.brand}</p>
                    <p className="w-full flex flex-row justify-start items-center gap-5">
                        <span>{FormatCurrency(product_detail?.price)}</span>
                        <span className=" line-through text-red-500">{FormatCurrency(product_detail?.discountPercentage)}</span>
                    </p>
                    <hr className="w-full" />
                    <p className=" text-lg"> Category : <span className=" font-bold ">{product_detail?.category}</span></p>
                    <p className="text-lg"> Availibility : <span className="text-green-500 font-bold">In a stock</span></p>
                    <hr className="w-full" />
                    <p>Description</p>
                    <p className="mt-3 text-base">{product_detail?.description}</p>
                    <hr className="w-full" />
                    <div className="w-full flex flex-row justify-start items-center gap-3">
                        <button className="px-4 py-2 shadow bg-[#F5F5F5]"> - </button>
                        <p className="px-4 py-2  shadow bg-[#F5F5F5]">0</p>
                        <button className="px-4 py-2  shadow bg-[#F5F5F5]"> + </button>
                        <button className="px-4 py-2  shadow bg-[#FF6F61] text-lg"> Add Cart </button>
                    </div>
                    <hr className="w-full" />
                    <div className="w-full" onMouseLeave={() => setShowReview(false)}>
                        <button onClick={() => setShowReview(!showReview)}>Review</button>
                        {
                            showReview && <Review />
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