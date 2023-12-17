import { Link } from 'react-router-dom'
import { MdSearch, MdOutlineAccountCircle, MdShoppingCart } from "react-icons/md";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const Header = () => {
	const token = Cookies.get('customerToken');
	const [auth, setAuth] = useState(false);
	useEffect(() => {
		if (token) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [])
	const [scroll, setScroll] = useState(false);
	useEffect(() => {
		const windowScroll = () => {
			if (window.scrollY > 0) {
				setScroll(true)
			} else {
				setScroll(false)
			}
		}
		window.addEventListener('scroll', windowScroll);
		return () => {
			window.removeEventListener('scroll', windowScroll);
		}
	}, [])
	const [showMenu, setShowMenu] = useState(true);
	return (
		<div className={`w-full bg-[#FFFFFF] z-30 sticky top-0 flex flex-col justify-start items-center gap-5 space-y-3 ${scroll ? ' shadow' : ''}`}>
			<div className='w-[95%] md:w-[90%] mx-auto p-3 space-y-4'>
				<div className='w-full grid grid-cols-2 md:grid-cols-3 justify-between items-center gap-5 p-1'>
					<div className='w-full relative hidden md:block'>
						<input className='ml-4 w-full p-3 rounded outline-none border-none bg-[#FFFFFF]' type="text" />
						<MdSearch className=" absolute top-4 left-0" size={25} />
					</div>
					<div className='w-full'>
						<h1 className=' text-xl md:text-3xl text-start md:text-center'> <span>CAZA</span> <span className=' text-[#FF6F61]'>MART</span></h1>
					</div>
					<div className='w-full flex flex-row justify-end md:justify-start items-center gap-5'>
						<div className='w-fit md:w-full p-1 flex flex-row justify-start items-center gap-2'>
							{
								auth ?
									<>
										<Link to='/my-account'><MdOutlineAccountCircle className="inline cursor-pointer" size={20} /></Link>
										<Link to='/my-account' className='hidden md:block'>My account</Link>
									</>
									: <Link to='/customer-login' className='hidden md:block'>Login</Link>
							}
						</div>
						<div className='w-fit md:w-full p-1 flex flex-row justify-start items-center gap-2'>
							<MdShoppingCart className="inline cursor-pointer" size={20} />
							<Link to='/item-cart' className='hidden md:block'>Cart</Link>
							{
								showMenu ? <MdOutlineMenu onClick={() => setShowMenu(!showMenu)} className="ml-2 cursor-pointer block md:hidden" size={25} />
									: <MdClose onClick={() => setShowMenu(!showMenu)} className="ml-2 cursor-pointer block md:hidden" size={25} />
							}
						</div>
					</div>
				</div>
				<hr className='w-full' />
				<div className={`w-full px-3 py-5 md:px-2 md:py-2 flex flex-col justify-start items-start 
			space-y-5 md:space-y-0 md:flex-row md:justify-evenly md:items-center gap-5
			${showMenu ? 'hidden md:flex' : 'flex h-[100vh] lg:h-fit'}`} onClick={()=>setShowMenu(!showMenu)}>
					<Link to='/'>Home</Link>
					<Link to='/shop'>Shop</Link>
					<Link to='/about'>About</Link>
					<Link to='/contact'>Contact</Link>
				</div>
			</div>
		</div>
	)
}

export default Header