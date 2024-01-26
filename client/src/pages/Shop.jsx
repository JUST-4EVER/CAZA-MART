import axios from "axios";
import { useEffect, useState } from "react"
import { IoIosAdd, IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import { FormatCurrency } from "../utilities/Number_Formatter";
import { CiShoppingCart } from "react-icons/ci";
import { MdGridView } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "../components/CardSkeleton";
import { useGetProductsQuery } from "../redux/slices/ProductSlices";

const Shop = () => {
    const [filters, setToggleFilter] = useState(false);
    const { data, isLoading, isSuccess } = useGetProductsQuery();
    const getProducts = data?.getProducts || [];

    return (
        <div className="w-full">
            <div className="w-full p-3 bg-black rounded">
                <div className="w-full text-white text-base font-normal tracking-widest flex flex-col lg:flex-row justify-start items-center gap-5">
                    <p className=" hover:underline cursor-pointer">Accessories</p>
                    <p className=" hover:underline cursor-pointer">Bag</p>
                    <p className=" hover:underline cursor-pointer">Woman</p>
                    <p className=" hover:underline cursor-pointer">Men</p>
                    <p className=" hover:underline cursor-pointer">Electronic</p>
                    <p className=" hover:underline cursor-pointer">Others</p>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 justify-start items-center gap-5 mt-5">
                <div className="w-full">
                    <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/'>Home</Link>
                    <IoIosArrowForward className="inline" size={15} />
                    <span className="font-light">Shop</span>
                </div>
                <div className="w-full flex flex-row justify-end">
                    <p className="cursor-pointer" onClick={() => setToggleFilter((prev) => !prev)}> <span>Filters</span>  <IoIosAdd className="inline" size={20} /></p>
                </div>
            </div>
            {
                filters && <div className="w-full shadow rounded p-4 mt-10" onMouseLeave={() => setToggleFilter(false)}>
                    <div className="w-full flex flex-col md:flex-row justify-start items-center gap-5">
                        <div className="w-full">
                            <h1>Filter by colors</h1>
                            <div className="mt-5 w-full space-y-5">
                                <p>
                                    <span className="w-20 h-20 px-4 py-1 rounded-full bg-black"></span>
                                    <span className="ml-3">Black</span>
                                </p>
                                <p>
                                    <span className="w-20 h-20 px-4 py-1 rounded-full bg-red-500"></span>
                                    <span className="ml-3">Red</span>
                                </p>
                                <p>
                                    <span className="w-20 h-20 px-4 py-1 rounded-full bg-blue-500"></span>
                                    <span className="ml-3">Blue</span>
                                </p>
                                <hr className="w-full" />
                                <div className="w-full">
                                    <h1>Price range</h1>
                                    <input className="mt-5" type="range" name="" id="" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h1>Filter By Size</h1>
                            <div className="mt-5 w-full space-y-5">
                                <p className="space-x-4">
                                    <input type="checkbox" name="" id="" />
                                    <span>S (10)</span>
                                </p>
                                <p className="space-x-4">
                                    <input type="checkbox" name="" id="" />
                                    <span>M (5)</span>
                                </p>
                                <p className="space-x-4">
                                    <input type="checkbox" name="" id="" />
                                    <span>L (6)</span>
                                </p>
                                <p className="space-x-4">
                                    <input type="checkbox" name="" id="" />
                                    <span>Xl (6)</span>
                                </p>
                                <p className="space-x-4">
                                    <input type="checkbox" name="" id="" />
                                    <span>XS (6)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">

                {
                    isLoading && (
                        <>
                            {
                                [...Array(10)].map((_, index) => {
                                    return <CardSkeleton key={index} />
                                })
                            }
                        </>
                    )
                }

                {
                    isSuccess && getProducts?.map(product => {
                        return (
                            <Link to={`/product-detail/${product?.id}`} className='w-full p-4 space-y-3 hover:scale-110 transition-all ease-in-out' key={product?.id} state={product}>
                                {product?.thumbnail ? (<img className='w-full lg:w-64 h-64 bg-center object-center' src={product?.thumbnail} alt="" />)
                                    : (<Skeleton className="w-ull lg:w-64 h-64" />)}
                                <div className='mt-3 space-y-3'>

                                    {product?.name ? (<h1 className='text-base font-light md:text-xl md:font-normal '>{product?.name}</h1>)
                                        : (<Skeleton className="w-full" />)}
                                    <p className='w-full flex flex-row justify-start items-center gap-5 text-sm font-light md:text-base md:font-normal'>
                                        {product?.price ? (<span>{FormatCurrency(product?.price)}</span>) : (<Skeleton className="w-full" />)}
                                        {product?.discount ? (<span className=' font-thin line-through'>{FormatCurrency(product?.discount)}</span>) : (<Skeleton className="w-full" />)}
                                    </p>
                                    <div className='w-full flex flex-row justify-start items-center gap-4'>
                                        {product?.price ? (<CiShoppingCart className='text-[#FF6F61]' size={27} />) : (<Skeleton className="w-10 h-10 rounded-full" />)}
                                        {product?.price ? (<MdGridView className='text-[#FF6F61]' size={20} />) : (<Skeleton className="w-10 h-10 rounded-full" />)}

                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Shop