import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormatCurrency } from "../utilities/Number_Formatter";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { MdGridView } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "../components/CardSkeleton";
import { useGetProductsQuery } from "../redux/slices/ProductSlices";
import { useGetCategoriesQuery } from "../redux/slices/CategorySlices";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/toolkit/slices/cartSlices";
import { FaCartPlus } from "react-icons/fa6";
import { GrView } from "react-icons/gr";

const Shop = () => {
    const [filters, setToggleFilter] = useState(false);
    const { data, isLoading, isSuccess } = useGetProductsQuery();
    const products = data?.getProducts || [];
    const { data: categoriesData = [] } = useGetCategoriesQuery();
    const categories = categoriesData?.getCategories || [];
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const disPatch = useDispatch()

    const handleCategories = (categoryId) => {
        if (selectedCategoryIds.includes(categoryId)) {
            setSelectedCategoryIds(selectedCategoryIds.filter((id) => id !== categoryId));
        } else {
            setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
        }
    };

    const handleSizeFilter = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter((selectedSize) => selectedSize !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const handleColorFilter = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const filteredProducts = products.filter((product) => {
        const sizeMatch = selectedSizes.length === 0 || selectedSizes.some((size) => product.size.includes(size));
        const colorMatch =
            selectedColors.length === 0 || selectedColors.some((color) => product.color.includes(color.toLowerCase()));
        return sizeMatch && colorMatch && selectedCategoryIds.includes(product?.category_id);
    });

    return (
        <div className="w-full">
            <div className="w-full p-3 bg-black rounded">
                <div className="w-full text-white text-base font-normal tracking-widest grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-start items-center gap-2">
                    {categories?.map((category) => (
                        <div key={category?.id} className="w-full flex flex-row justify-start items-center gap-2">
                            <input
                                className="hover:underline cursor-pointer"
                                type="checkbox"
                                checked={selectedCategoryIds.includes(category?.id)}
                                onChange={() => handleCategories(category?.id)}
                            />
                            <span>{category?.category_name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full grid grid-cols-2 justify-start items-center gap-5 mt-5">
                <div className="w-full">
                    <Link className="hover:text-[#FF6F61] transition-all ease-in-out" to="/">
                        Home
                    </Link>
                    <IoIosArrowForward className="inline" size={15} />
                    <span className="font-light">Shop</span>
                </div>
                {
                    !selectedCategoryIds.length == 0 && <div className="w-full flex flex-row justify-end">
                        <p className="cursor-pointer" onClick={() => setToggleFilter((prev) => !prev)}>
                            <span>Filters</span> <IoIosAdd className="inline" size={20} />
                        </p>
                    </div>
                }
            </div>
            {
                filters && (
                    <div className="w-full shadow rounded p-4 mt-10" onMouseLeave={() => setToggleFilter(false)}>
                        <div className="w-full flex flex-col md:flex-row justify-start items-center gap-5">
                            <div className="w-full">
                                <h1>Filter by colors</h1>
                                <div className="mt-5 w-full space-y-5">
                                    {['black', 'red', 'blue', 'white'].map((color) => (
                                        <p key={color} className="space-x-4">
                                            <input
                                                type="checkbox"
                                                name={`color-${color.toLowerCase()}`}
                                                id={`color-${color.toLowerCase()}`}
                                                checked={selectedColors.includes(color.toLowerCase())}
                                                onChange={() => handleColorFilter(color.toLowerCase())}
                                            />
                                            <span>{`${color} (${products.filter((product) => product.color.includes(color.toLowerCase())).length})`}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full">
                                <h1>Filter By Size</h1>
                                <div className="mt-5 w-full space-y-5">
                                    {['SM', 'MD', 'LG', 'XL', 'XS'].map((size) => (
                                        <p key={size} className="space-x-4">
                                            <input
                                                type="checkbox"
                                                name={`size-${size.toLowerCase()}`}
                                                id={`size-${size.toLowerCase()}`}
                                                checked={selectedSizes.includes(size)}
                                                onChange={() => handleSizeFilter(size)}
                                            />
                                            <span>{`${size} (${products.filter((product) => product.size.includes(size.toLowerCase())).length})`}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
                {isLoading && (
                    <>
                        {[...Array(10)].map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </>
                )}

                {isSuccess && selectedCategoryIds.length === 0 ? (
                    products?.map((product) => (
                        <div key={product?.id}
                            className=" relative w-full h-[90%] space-y-3 group">
                            <div className="relative w-full h-60 mb-5 bg-[#F6F6F6] p-3">
                                <img src={product?.thumbnail} alt=""
                                    className=" w-full h-full object-cover rounded" />
                                <div className="absolute w-full h-full bg-black/20 group -bottom-10 
                            group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300
                            flex  flex-row justify-center items-center gap-5">
                                    <CiHeart
                                        onClick={() => disPatch(addToCart(product))}
                                        className="text-white bg-[#FF6F61] p-3 rounded-full shadow mr-5 mb-5" size={45} />
                                    <FaCartPlus
                                        onClick={() => disPatch(addToCart(product))}
                                        className="text-white bg-[#FF6F61] p-3 rounded-full shadow mr-5 mb-5" size={45} />
                                    <Link to={`/product-detail/${product?.id}`} state={product}
                                    ><GrView className="text-white bg-[#FF6F61] p-3 rounded-full shadow mr-5 mb-5" size={45} /></Link>
                                </div>
                            </div>

                            <div className="w-full space-y-2">
                                <Link to={`/product-detail/${product?.id}`} state={product} className="text-base font-light italic tracking-widest
                                hover:text-[#FF6F61] transition-all duration-300">{product?.name}</Link>
                                <p className="text-base font-normal">{product?.description.slice(0, 70)}..</p>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <p className="text-base font-light italic tracking-widest">{FormatCurrency(product?.price)}</p>
                                    <p className="text-base font-light italic tracking-widest line-through">{FormatCurrency(product?.discount)}</p>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    filteredProducts?.map((product) => (
                        <div key={product?.id}
                            className=" relative w-full h-[90%] space-y-3 group">
                            <div className="relative w-full h-60 mb-5 bg-[#F6F6F6] p-3">
                                <img src={product?.thumbnail} alt=""
                                    className=" w-full h-full object-cover rounded" />
                                <div className="absolute w-full h-full bg-black/20 group -bottom-10 
                                group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300
                                flex flex-col justify-end items-end gap-5">
                                    <CiShoppingCart
                                        onClick={() => disPatch(addToCart(product))}
                                        className="text-white bg-[#FF6F61] p-1 rounded-full shadow mr-5 mb-5" size={30} />
                                </div>
                            </div>
                            <div className="w-full space-y-2">
                                <Link to={`/product-detail/${product?.id}`} state={product} className="text-base font-light italic tracking-widest
                                 hover:text-[#FF6F61] transition-all duration-300">{product?.name}</Link>
                                <p className="text-base font-normal">{product?.description.slice(0, 70)}..</p>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <p className="text-base font-light italic tracking-widest">{FormatCurrency(product?.price)}</p>
                                    <p className="text-base font-light italic tracking-widest line-through">{FormatCurrency(product?.discount)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shop;
