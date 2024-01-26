import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../redux/slices/ProductSlices"
import { FormatCurrency } from "../utilities/Number_Formatter";
import CardSkeleton from "../components/CardSkeleton";
import { MdDelete, MdEdit } from "react-icons/md";

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    const getProducts = data?.getProducts || [];

    return (
        <div className="w-full p-3">
            <div className="w-[90%] h-auto mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate100 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">Product Lists </h1>
                    <Link to='/dashboard/product-form' className="px-4 py-2 shadow text-base font-thin rounded bg-[#FF6F61] text-white">Create Product</Link>
                </div>
                <div className="w-full h-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                justify-start items-center gap-4 mb-10">
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
                        getProducts.map(product => {
                            return <div key={product?.id}
                                className="w-full h-[90%] space-y-3 group">
                                <div className="relative w-full h-60 mb-5 bg-[#F6F6F6] p-3">
                                    <img src={product?.thumbnail} alt=""
                                        className=" w-full h-full object-cover rounded" />
                                </div>
                                <div className="absolute w-full h-full bg-black/20 group -bottom-10 
                                        group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300
                                        flex flex-col justify-end items-end gap-5">
                                    <Link to={`/dashboard/product-form/${product?.id}`} state={product}>
                                        <MdEdit className="text-white bg-[#FF6F61] p-1 rounded-full shadow mr-5" size={30} />
                                    </Link>
                                    <MdDelete className="text-white bg-[#FF6F61] p-1 rounded-full shadow mr-5 mb-5" size={30} />
                                </div>
                                <div className="w-full space-y-2">
                                    <p className="text-base font-light italic tracking-widest">{product?.name}</p>
                                    <p className="text-base font-normal">{product?.description.slice(0, 70)}..</p>
                                    <div className="w-full flex flex-row justify-between items-center">
                                        <p className="text-base font-light italic tracking-widest">{FormatCurrency(product?.price)}</p>
                                        <p className="text-base font-light italic tracking-widest line-through">{FormatCurrency(product?.discount)}</p>

                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Products