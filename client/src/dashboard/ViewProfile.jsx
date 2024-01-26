import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGetCurrentUserProfileQuery } from '../redux/slices/UserProfileSlices'
import { useGetCurrentUserQuery } from '../redux/slices/UserSlices'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ViewProfile = () => {

    const { data, isLoading, isSuccess } = useGetCurrentUserProfileQuery();
    const { data: user = [] } = useGetCurrentUserQuery();
    const currentUser = user?.userExist || [];
    const currentUserProfile = data?.currentUserProfile || [];
    console.log('current user profile', currentUserProfile);
    return (
        <div className="w-full p-3">
            <div className="w-[95%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate-100 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="w-full text-2xl p-4">User Profile</h1>
                </div>
                <div className='w-full space-y-5 mt-10'>

                    {
                        isLoading && <div className="w-full p-5 bg-white shadow rounded
                    flex flex-col lg:flex-row justify-start items-start gap-5">
                            <Skeleton className="w-full lg:w-32 lg:h-32 rounded" alt="" />
                            <div className="space-y-3">
                                <div className='w-full space-y-2'>
                                    <Skeleton className="w-96 h-2" />
                                    <Skeleton className="w-96 h-2" />
                                </div>
                                <Skeleton className="w-96 h-2" />
                                <Skeleton className="w-96 h-2" />
                                <Skeleton className="w-96 h-2" />
                                <Skeleton className="w-96 h-2" />
                            </div>
                        </div>
                    }

                    {
                        isSuccess && <div className="w-full p-5 bg-white shadow rounded
                        flex flex-col lg:flex-row justify-start items-start gap-5">
                            <img className="w-full lg:w-32 lg:h-32 rounded" src={currentUserProfile?.avatar} alt="" />
                            <div className="space-y-3">
                                <div>
                                    <p className=" text-xl">{currentUser?.username}</p>
                                    <p className=" font-light">{currentUser?.email}</p>
                                </div>
                                {currentUserProfile?.bio}

                            </div>
                        </div>
                    }

                    {
                        isLoading && <div className="w-full bg-white shadow rounded p-5 space-y-3">
                            <div className="w-full flex flex-row justify-between items-center gap-2">
                                <p className="text-2xl">Personal Detail</p>
                                <Link className="px-3 p-2 rounded bg-[#FF6F61] text-white" to='/dashboard/user-profile-form'>Edit</Link>
                            </div>

                            <div className="w-full space-y-3">

                                <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                    <Skeleton className="w-20 h-4 " />
                                    <Skeleton className="w-40 h-4 " />
                                    <Skeleton className="w-40 h-4 " />
                                </div>

                                <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                    <Skeleton className="w-20 h-4 " />
                                    <Skeleton className="w-40 h-4 " />
                                </div>

                                <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                    <Skeleton className="w-20 h-4 " />
                                    <Skeleton className="w-40 h-4 " />
                                </div>

                                <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                    <Skeleton className="w-20 h-4 " />
                                    <Skeleton className="w-40 h-4 " />
                                </div>

                            </div>

                            <hr className="w-full" />
                            <div className="w-full">
                                <h1 className="text-2xl">Social Meia Links</h1>
                                <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                    <Skeleton className="w-10 h-10 text-xl rounded-full" />
                                    <Skeleton className="w-10 h-10 text-xl rounded-full" />
                                    <Skeleton className="w-10 h-10 text-xl rounded-full" />
                                    <Skeleton className="w-10 h-10 text-xl rounded-full" />
                                </div>
                            </div>
                        </div>

                    }

                    {
                        isSuccess && <div className="w-full bg-white shadow rounded p-5 space-y-3">
                            <div className="w-full flex flex-row justify-between items-center gap-2">
                                <p className="text-2xl">Personal Detail</p>
                                <Link className="px-3 p-2 rounded bg-[#FF6F61] text-white" to='/dashboard/user-profile-form'>Edit</Link>
                            </div>

                            <div className="w-full space-y-3">
                                <p className="w-full">
                                    <span className=" font-light text-end">Name : </span>
                                    <span className="text-start">{currentUserProfile?.fname}</span>
                                    <span className="text-start ml-2">{currentUserProfile?.lname}</span>
                                </p>
                                <p className="w-full">
                                    <span className=" font-light text-end">Email : </span>
                                    <span className="text-start">{currentUser?.email}</span>
                                </p>
                                <p className="w-full">
                                    <span className=" font-light text-end">Phone : </span>
                                    <span className="text-start">{currentUserProfile?.phone}</span>
                                </p>
                                <p className="w-full">
                                    <span className=" font-light text-end">Address : </span>
                                    <span className="text-start">{currentUserProfile?.address}</span>
                                </p>
                            </div>
                            <hr className="w-full" />
                            <div className="w-full">
                                <h1 className="text-2xl">Social Meia Links</h1>
                                <div className="mt-5 w-full flex flex-row justify-start items-center gap-3">
                                    <Link to={`https://www.facebook.com/${currentUserProfile?.facebookLink}`} target="_blank"><FaFacebook className="inline" size={20} /></Link>
                                    <Link to={`https://twitter.com/${currentUserProfile?.twitterLink}`} target="_blank"><FaTwitter className="inline" size={20} /></Link>
                                    <Link to={`https://www.instagram.com/${currentUserProfile?.instagramLink}`} target="_blank"><FaInstagram className="inline" size={20} /></Link>
                                    <Link to={`https://www.linkedin.com/in/${currentUserProfile?.linkedinLink}`} target="_blank"><FaLinkedin className="inline" size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewProfile