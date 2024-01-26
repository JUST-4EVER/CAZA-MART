import axios from 'axios';
import { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FormatCurrency } from '../utilities/Number_Formatter';
import { Link } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { MdGridView } from "react-icons/md";
import { useGetProductsQuery } from '../redux/slices/ProductSlices';
import CardSkeleton from './CardSkeleton';
const Products = () => {
	const { data, isLoading, isSuccess } = useGetProductsQuery();
	const getProducts = data?.getProducts || [];
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 4
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2
		}
	};
	return (
		<div className='w-full p-3 mt-20 space-y-10'>
			<h1 className='text-center w-full p-1 text-3xl'>FEATURED PRODUCTS</h1>
			<div className='mt-10 w-full'>
				<Carousel responsive={responsive}>
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
						isSuccess && getProducts.map(product => {
							return (
								<Link to={`/product-detail/${product?.id}`} className='w-full p-4 space-y-3 hover:scale-110 transition-all ease-in-out' key={product?.id} state={product}>
									<img className='w-40 h-40 md:w-64 md:h-64 bg-center object-center' src={product?.thumbnail} alt="" />
									<div className='mt-3 space-y-3'>
										<h1 className='text-base font-light md:text-xl md:font-normal '>{product?.name}</h1>
										<p className='w-full flex flex-row justify-start items-center gap-5 text-sm font-light md:text-base md:font-normal'>
											<span>{FormatCurrency(product?.price)}</span>
											<span className=' font-thin line-through'>{FormatCurrency(product?.discount)}</span>
										</p>
										<div className='w-full flex flex-row justify-start items-center gap-4'>
											<CiShoppingCart className='text-[#FF6F61]' size={27} />
											<MdGridView className='text-[#FF6F61]' size={20} />
										</div>
									</div>
								</Link>
							)
						})
					}
				</Carousel>
			</div>
		</div>
	)
}

export default Products