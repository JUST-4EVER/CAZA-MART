import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useGetCurrentCustomerQuery } from "../redux/slices/CustomerSlices";
import { useGetCurrentCustomerProfileQuery } from "../redux/slices/CustomerProfileSlices";
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const CustomerProfile = () => {
    const { data: currentCustomer = [] } = useGetCurrentCustomerProfileQuery()
    const { data: customer = {} } = useGetCurrentCustomerQuery();
    const customerProfile = currentCustomer?.currentCustomerProfile || []
    return (
        <div className="w-full space-y-7 relative">
            <div className="w-full flex flex-row justify-start items-center gap-2 md:gap-5 text-base font-light md:text-lg md:font-normal">
                <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={14} />
                <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/my-account'>My account</Link>
                <IoIosArrowForward className="inline" size={14} />
                <span>My profile</span>
            </div>
            {
                customerProfile.length > 0
                    ? (
                        <div className="w-full">
                            <div className="w-full p-5 bg-white shadow rounded
            flex flex-col lg:flex-row justify-start items-start gap-5">
                                {customerProfile?.avatar ? (
                                    <img className="w-full lg:w-32 lg:h-32 rounded" src={customerProfile.avatar} alt="" />
                                ) : (
                                    <Skeleton className="w-full lg:w-32 lg:h-32 rounded" />
                                )}
                                <div className="space-y-3">
                                    <div>
                                        {
                                            customer?.customer?.username ? (
                                                <p className=" text-xl">{customer?.customer?.username}</p>
                                            ) : (<Skeleton className="w-96" />)
                                        }

                                        {
                                            customer?.customer?.email ? (
                                                <p className=" font-light">{customer?.customer?.email}</p>
                                            ) : (<Skeleton className="w-96" />)
                                        }
                                    </div>
                                    {
                                        customerProfile?.bio ? (customerProfile?.bio) : (<Skeleton className="w-96" />)
                                    }
                                </div>
                            </div>

                            <div className="w-full bg-white shadow rounded p-5 space-y-3">
                                <div className="w-full flex flex-row justify-between items-center gap-2">
                                    <p className="text-2xl">Personal Detail</p>
                                    <Link className="px-3 p-2 rounded bg-[#FF6F61] text-white" to='/my-account/personal-information'>Edit</Link>
                                </div>

                                <div className="w-full space-y-3">
                                    {customerProfile?.fname ? (<p className="w-full">
                                        <span className=" font-light text-end">Name : </span>
                                        <span className="text-start">{customerProfile?.fname}</span>
                                        <span className="text-start">{customerProfile?.lname}</span>
                                    </p>) : (<Skeleton className="w-full" />)}

                                    {customer?.customer?.email ? (<p className="w-full">
                                        <span className=" font-light text-end">Email : </span>
                                        <span className="text-start">{customer?.customer?.email}</span>
                                    </p>) : (<Skeleton className="w-full" />)}

                                    {customerProfile?.phone ? (<p className="w-full">
                                        <span className=" font-light text-end">Phone : </span>
                                        <span className="text-start">{customerProfile?.phone}</span>
                                    </p>) : (<Skeleton className="w-full" />)}
                                    {customerProfile?.address ? (<p className="w-full">
                                        <span className=" font-light text-end">Address : </span>
                                        <span className="text-start">{customerProfile?.address}</span>
                                    </p>) : (<Skeleton className="w-full" />)}
                                </div>
                                <hr className="w-full" />
                                <div className="w-full">
                                    <h1 className="text-2xl">Social Meia Links</h1>
                                    <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                        {
                                            customerProfile?.facebookLink ?
                                                (<Link to={`https://www.facebook.com/${customerProfile?.facebookLink}`} target="_blank"><FaFacebook className="inline" size={20} /></Link>)
                                                : (<Skeleton className="w-8 h-8 rounded-full" />)
                                        }
                                        {
                                            customerProfile?.twitterLink ? (<Link to={`https://twitter.com/${customerProfile?.twitterLink}`} target="_blank"><FaTwitter className="inline" size={20} /></Link>)
                                                : (<Skeleton className="w-8 h-8 rounded-full" />)
                                        }
                                        {
                                            customerProfile?.instagramLink ? (<Link to={`https://www.instagram.com/${customerProfile?.instagramLink}`} target="_blank"><FaInstagram className="inline" size={20} /></Link>)
                                                : (<Skeleton className="w-8 h-8 rounded-full" />)
                                        }
                                        {
                                            customerProfile?.linkedinLink ? (<Link to={`https://www.linkedin.com/in/${customerProfile?.linkedinLink}`} target="_blank"><FaLinkedin className="inline" size={20} /></Link>)
                                                : (<Skeleton className="w-8 h-8 rounded-full" />)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                    : (
                        <div className="w-full flex flex-row justify-center items-center absolute top-36 left-0">
                            <h1 className="w-full text-center">
                                <span className="inline text-base font-light">you don't have Profile</span>
                                <Link className="inline text-base font-medium text-red-500" to='/my-account/personal-information'> Fill Your Personal Information</Link>
                            </h1>
                        </div>
                    )
            }
        </div>
    )
}

export default CustomerProfile