import { MdAttachMoney } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
const Article = () => {
	return (
		<article className='w-full p-3 mt-10 space-y-4'>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				<div className='flex flex-col justify-center items-center gap-2 space-y-2
		rounded shadow p-5'>
					<h1 className=' text-xl tracking-widest capitalize'>money back gurantee</h1>
					<MdAttachMoney size={30} />
				</div>
				<div className='flex flex-col justify-center items-center gap-2 space-y-2
		rounded shadow p-5'>
					<h1 className=' text-xl tracking-widest capitalize'>Always Support</h1>
					<BiSupport size={30} />
				</div>
				<div className='flex flex-col justify-center items-center gap-2 space-y-2
		rounded shadow p-5'>
					<h1 className=' text-xl tracking-widest capitalize'>Secure Payment</h1>
					<RiSecurePaymentFill size={30} />
				</div>
			</div>
			<div className='w-full mt-5'>
				<p className='mt-10 w-[90%] md:w-[60%] text-lg md:text-3xl text-center mx-auto tracking-widest' style={{ lineHeight: "2em" }}> CAZAMART is better than any other platform we've played with, and we've played with them all. </p>
			</div>

		</article>
	)
}

export default Article