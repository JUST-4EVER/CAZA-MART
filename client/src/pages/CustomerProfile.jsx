import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useGetCurrentCustomerQuery } from "../redux/slices/CustomerSlices";
import { useGetCurrentCustomerProfileQuery } from "../redux/slices/CustomerProfileSlices";
import { IoIosArrowForward } from "react-icons/io";

const CustomerProfile = () => {
    const { data: currentCustomer = [] } = useGetCurrentCustomerProfileQuery()
    const { data: customer = {} } = useGetCurrentCustomerQuery();
    const customerProfile = currentCustomer?.currentCustomerProfile || []
    return (
        <div className="w-full space-y-7">
            <div className="w-full flex flex-row justify-start items-center gap-2 md:gap-5 text-base font-light md:text-lg md:font-normal">
                <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/'>Home</Link>
                <IoIosArrowForward className="inline" size={14} />
                <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/my-account'>My account</Link>
                <IoIosArrowForward className="inline" size={14} />
                <span>My profile</span>
            </div>
            <div className="w-full p-5 bg-white shadow rounded
            flex flex-col lg:flex-row justify-start items-start gap-5">
                <img className="w-full lg:w-32 lg:h-32 rounded" src="/images/men.jpg" alt="" />
                <div className="space-y-3">
                    <div>
                        <p className=" text-xl">{customer?.customer?.username}</p>
                        <p className=" font-light">{customer?.customer?.email}</p>
                    </div>
                    <p>{customerProfile?.bio}</p>
                </div>
            </div>

            <div className="w-full bg-white shadow rounded p-5 space-y-3">
                <div className="w-full flex flex-row justify-between items-center gap-2">
                    <p className="text-2xl">Personal Detail</p>
                    <Link className="px-3 p-2 rounded bg-[#FF6F61] text-white" to='/my-account/personal-information'>Edit</Link>
                </div>

                <div className="w-full space-y-3">
                    <p className="w-full">
                        <span className=" font-light text-end">Name : </span>
                        <span className="text-start">{customerProfile?.fname}</span>
                        <span className="text-start">{customerProfile?.lname}</span>
                    </p>
                    <p className="w-full">
                        <span className=" font-light text-end">Email : </span>
                        <span className="text-start">{customer?.customer?.email}</span>
                    </p>
                    <p className="w-full">
                        <span className=" font-light text-end">Phone : </span>
                        <span className="text-start">{customerProfile?.phone}</span>
                    </p>
                    <p className="w-full">
                        <span className=" font-light text-end">Address : </span>
                        <span className="text-start">{customerProfile?.address}</span>
                    </p>
                </div>
                <hr className="w-full" />
                <div className="w-full">
                    <h1 className="text-2xl">Social Meia Links</h1>
                    <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                        {
                            customerProfile?.facebookLink && <Link to={`https://www.facebook.com/${customerProfile?.facebookLink}`} target="_blank"><FaFacebook className="inline" size={20} /></Link>
                        }
                        {
                            customerProfile?.twitterLink && <Link to={`https://twitter.com/${customerProfile?.twitterLink}`} target="_blank"><FaTwitter className="inline" size={20} /></Link>
                        }
                        {
                            customerProfile?.instagramLink && <Link to={`https://www.instagram.com/${customerProfile?.instagramLink}`} target="_blank"><FaInstagram className="inline" size={20} /></Link>
                        }
                        {
                            customerProfile?.linkedinLink && <Link to={`https://www.linkedin.com/in/${customerProfile?.linkedinLink}`} target="_blank"><FaLinkedin className="inline" size={20} /></Link>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerProfile