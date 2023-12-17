import { FaBagShopping } from "react-icons/fa6";
const Navbar = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-5 space-y-5 md:space-y-0 p-3'>
			<div className='w-full space-y-5'>
				<h1 className=' text-3xl leading-loose'>Welcome to <span className=' text-[#FF6F61]'>CazaMart</span> - Your Ultimate Shopping Destination!</h1>
				<p className=' leading-loose'>At CazaMart, we think shopping ought to be a thrilling journey
					where you may explore a wide variety of goods and locate
					just what you're looking for. Our platform is made to ensure
					that your buying is easy, convenient, and fun.</p>
					<button className='p-3 rounded shadow bg-[#FF6F61] text-white flex flex-row gap-4' type='button'> 
					<FaBagShopping className="inline" size={25}/> <span>Shop Now</span></button>
			</div>
			<div className='w-full rounded-tl-[30%] rounded-br-[30%] rounded-tr-[30%] rounded-bl-[30%] border-2 border-slate-100'>
				<img className='rounded-tr-[30%] rounded-bl-[30%]' src="/images/men.jpg" alt="" />
			</div>
		</div>
	)
}

export default Navbar