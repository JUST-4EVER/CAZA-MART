const Section = () => {
	return (
		<div className='w-full p-3 mt-20 space-y-10'>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
				<div className='row-span-3 col-span-1 rounded md:row-span-2 md:col-span-1 lg:row-span-3'>
					<img className='cursor-pointer  rounded hover:scale-105 transition-all ease-in-out' src="/public/images/women.jpg" alt="" />
				</div>
				<div className='row-span-2 col-span-1 md:row-span-2 md:col-span-1 lg:row-span-2'>
					<img className=' cursor-pointer  rounded hover:scale-105 transition-all ease-in-out' src="/public/images/watch.jpg" alt="" />
				</div>
				<div className='row-span-3 col-span-1 md:row-span-3 md:col-span-1 lg:row-span-3'>
					<img className='cursor-pointer rounded hover:scale-105 transition-all ease-in-out' src="/public/images/bag.jpg" alt="" />
				</div>
				<div className='row-span-5 col-span-1 md:row-span-2 md:col-span-1 lg:row-span-4'>
					<img className='cursor-pointer  rounded hover:scale-105 transition-all ease-in-out' src="/public/images/suit.jpg" alt="" />
				</div>
				<div className='row-span-5 col-span-1  md:row-span-2 md:col-span-1 lg:row-span-4'>
					<img className=' cursor-pointer  rounded hover:scale-105 transition-all ease-in-out' src="/public/images/sunglass.jpg" alt="" />

				</div>
				<div className='row-span-5 col-span-1 md:row-span-2 md:col-span-1 lg:row-span-5'>
					<img className='cursor-pointer rounded hover:scale-105 transition-all ease-in-out' src="/public/images/shoes.jpg" alt="" />
				</div>
			</div>
		</div>
	)
}

export default Section