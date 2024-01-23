import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../redux/slices/ProductSlices"
import { FormatCurrency } from "../utilities/Number_Formatter";

const Products = () => {
    const { data } = useGetProductsQuery();
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
                        getProducts?.map(product => {
                            return <div key={product?.id}
                            className="w-full h-[90%] space-y-3 ">
                                <img src={product?.thumbnail} alt="" 
                                className="w-full md:w-72 md:h-72 bg-[#F6F6F6] p-3 rounded"/>
                                <div className="w-full space-y-2">
                                    <p className="text-base font-light italic tracking-widest">{product?.name}</p>
                                    <p className="text-base font-normal">{product?.description.slice(0,70)}..</p>
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