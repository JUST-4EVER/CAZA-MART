import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ViewProfile = () => {
    return (
        <div className="w-full p-3">
            <div className="w-[95%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate-100 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">User Profile</h1>
                </div>
                <div className='w-full space-y-5 mt-10'>
                    <div className="w-full p-5 bg-white shadow rounded
            flex flex-col lg:flex-row justify-start items-start gap-5">
                        <img className="w-full lg:w-32 lg:h-32 rounded" src={`/public/images/userProfile.png`} alt="" />
                        <div className="space-y-3">
                            <div>
                                <p className=" text-xl">miirshe</p>
                                <p className=" font-light">miirshe@gmail.com</p>
                            </div>
                            {/* {
                            customerProfile?.bio ? (customerProfile?.bio) : (<Skeleton className="w-96" />)
                        } */}
                            I`m web developer with two years of professional experience. Proficient in front-end and back-end development, with a strong understanding of web technologies and best practices
                        </div>
                    </div>

                    <div className="w-full bg-white shadow rounded p-5 space-y-3">
                        <div className="w-full flex flex-row justify-between items-center gap-2">
                            <p className="text-2xl">Personal Detail</p>
                            <Link className="px-3 p-2 rounded bg-[#FF6F61] text-white" to='/dashboard/user-profile-form'>Edit</Link>
                        </div>

                        <div className="w-full space-y-3">
                            <p className="w-full">
                                <span className=" font-light text-end">Name : </span>
                                <span className="text-start">Abdikafi</span>
                                <span className="text-start">Isse</span>
                            </p>
                            <p className="w-full">
                                <span className=" font-light text-end">Email : </span>
                                <span className="text-start">Miirshe@gmail.com</span>
                            </p>
                            <p className="w-full">
                                <span className=" font-light text-end">Phone : </span>
                                <span className="text-start">252618302314</span>
                            </p>
                            <p className="w-full">
                                <span className=" font-light text-end">Address : </span>
                                <span className="text-start">Xamar jajab</span>
                            </p>
                        </div>
                        <hr className="w-full" />
                        <div className="w-full">
                            <h1 className="text-2xl">Social Meia Links</h1>
                            <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                <Link to={`https://www.facebook.com/miirshe`} target="_blank"><FaFacebook className="inline" size={20} /></Link>
                                <Link to={`https://twitter.com/miirshe`} target="_blank"><FaTwitter className="inline" size={20} /></Link>
                                <Link to={`https://www.instagram.com/miirshe`} target="_blank"><FaInstagram className="inline" size={20} /></Link>
                                <Link to={`https://www.linkedin.com/in/miirshe`} target="_blank"><FaLinkedin className="inline" size={20} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile