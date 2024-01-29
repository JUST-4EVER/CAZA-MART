import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormatCurrency } from "../utilities/Number_Formatter";
import { CiShoppingCart } from "react-icons/ci";
import { MdGridView } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import CardSkeleton from "../components/CardSkeleton";
import { useGetProductsQuery } from "../redux/slices/ProductSlices";
import { useGetCategoriesQuery } from "../redux/slices/CategorySlices";

const Shop = () => {
    const [filters, setToggleFilter] = useState(false);
    const { data, isLoading, isSuccess } = useGetProductsQuery();
    const products = data?.getProducts || [];
    const { data: categoriesData = [] } = useGetCategoriesQuery();
    const categories = categoriesData?.getCategories || [];
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

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
                                    {['black', 'red', 'blue','white'].map((color) => (
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
                        <Link
                            to={`/product-detail/${product?.id}`}
                            className="w-full p-4 space-y-3 hover:scale-110 transition-all ease-in-out"
                            key={product?.id}
                            state={product}
                        >
                            {product?.thumbnail ? (
                                <img
                                    className="w-full lg:w-64 h-64 bg-center object-center"
                                    src={product?.thumbnail}
                                    alt=""
                                />
                            ) : (
                                <Skeleton className="w-ull lg:w-64 h-64" />
                            )}
                            <div className="mt-3 space-y-3">
                                {product?.name ? (
                                    <h1 className="text-base font-light md:text-xl md:font-normal ">{product?.name}</h1>
                                ) : (
                                    <Skeleton className="w-full" />
                                )}
                                <p className="w-full flex flex-row justify-start items-center gap-5 text-sm font-light md:text-base md:font-normal">
                                    {product?.price ? (
                                        <span>{FormatCurrency(product?.price)}</span>
                                    ) : (
                                        <Skeleton className="w-full" />
                                    )}
                                    {product?.discount ? (
                                        <span className=" font-thin line-through">
                                            {FormatCurrency(product?.discount)}
                                        </span>
                                    ) : (
                                        <Skeleton className="w-full" />
                                    )}
                                </p>
                                <div className="w-full flex flex-row justify-start items-center gap-4">
                                    {product?.price ? (
                                        <CiShoppingCart className="text-[#FF6F61]" size={27} />
                                    ) : (
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                    )}
                                    {product?.price ? (
                                        <MdGridView className="text-[#FF6F61]" size={20} />
                                    ) : (
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    filteredProducts?.map((product) => (
                        <Link
                            to={`/product-detail/${product?.id}`}
                            className="w-full p-4 space-y-3 hover:scale-110 transition-all ease-in-out"
                            key={product?.id}
                            state={product}
                        >
                            {product?.thumbnail ? (
                                <img
                                    className="w-full lg:w-64 h-64 bg-center object-center"
                                    src={product?.thumbnail}
                                    alt=""
                                />
                            ) : (
                                <Skeleton className="w-ull lg:w-64 h-64" />
                            )}
                            <div className="mt-3 space-y-3">
                                {product?.name ? (
                                    <h1 className="text-base font-light md:text-xl md:font-normal ">{product?.name}</h1>
                                ) : (
                                    <Skeleton className="w-full" />
                                )}
                                <p className="w-full flex flex-row justify-start items-center gap-5 text-sm font-light md:text-base md:font-normal">
                                    {product?.price ? (
                                        <span>{FormatCurrency(product?.price)}</span>
                                    ) : (
                                        <Skeleton className="w-full" />
                                    )}
                                    {product?.discount ? (
                                        <span className=" font-thin line-through">
                                            {FormatCurrency(product?.discount)}
                                        </span>
                                    ) : (
                                        <Skeleton className="w-full" />
                                    )}
                                </p>
                                <div className="w-full flex flex-row justify-start items-center gap-4">
                                    {product?.price ? (
                                        <CiShoppingCart className="text-[#FF6F61]" size={27} />
                                    ) : (
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                    )}
                                    {product?.price ? (
                                        <MdGridView className="text-[#FF6F61]" size={20} />
                                    ) : (
                                        <Skeleton className="w-10 h-10 rounded-full" />
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shop;
