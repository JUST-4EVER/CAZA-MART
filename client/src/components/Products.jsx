import axios from 'axios';
import { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FormatCurrency } from '../utilities/Number_Formatter';
import { Link } from 'react-router-dom';
const Products = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		getProducts();
	}, [])
	const getProducts = async () => {
		await axios.get('https://dummyjson.com/products').then(res => {
			setProducts(res.data?.products)
		}).catch(err => console.log(err))
	}
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
				<Carousel responsive={responsive}>{
					products.map(product => {
						return (
							<Link to={`/product-detail/${product?.id}`} className='w-full' key={product?.id} state={product}>
								<img className='w-40 h-40 md:w-64 md:h-64 bg-center object-center' src={product?.thumbnail} alt="" />
								<h1 className='text-base font-light md:text-xl md:font-normal '>{product?.title}</h1>
								<p className='text-sm font-light md:text-base md:font-normal'>{FormatCurrency(product?.price)}</p>
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