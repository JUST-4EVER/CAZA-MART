import { Link } from 'react-router-dom'
const Users = () => {
    return (
        <div className="w-full p-3">
            <div className="w-[95%] mx-auto lg:w-[75%] lg:ml-[20%] mt-16">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">User Lists </h1>
                    <Link to='/dashboard/user-form' className="px-4 py-2 shadow text-base font-thin rounded bg-[#FF6F61] text-white">Add User</Link>
                </div>
                <div className="mt-10 w-full bg-slate-50  rounded px-4 lg:px-2 py-5">
                </div>
            </div>
        </div>
    )
}

export default Users