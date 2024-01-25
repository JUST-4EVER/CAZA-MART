import { ErrorMessage, Field, Form, Formik } from "formik"
import { IoCloudUploadOutline } from 'react-icons/io5';
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useEffect, useRef, useState } from "react"
import { useGetCurrentUserQuery } from "../redux/slices/UserSlices";
import { useCreateUserProfileMutation, useGetCurrentUserProfileQuery, useUpdateUserProfileMutation } from "../redux/slices/UserProfileSlices";
const UserProfileForm = () => {
    const { data: currentUser = [] } = useGetCurrentUserProfileQuery()
    const [createUserProfile] = useCreateUserProfileMutation();
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const userProfileStatus = currentUser?.status || [];
    const currentUserProfile = currentUser?.currentUserProfile || [];
    const { data: user = {} } = useGetCurrentUserQuery();
    console.log('user',user);
    const [images, setImages] = useState(currentUserProfile?.avatar || null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const setupCloudinaryWidget = () => {
        if (window.cloudinary) {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget(
                {
                    cloudName: import.meta.env.VITE_APP_CLOUD_NAME,
                    uploadPreset: import.meta.env.VITE_APP_UPLOAD_PRESET,
                    maxFiles: 30,
                },
                (err, result) => {
                    if (err) {
                        console.error(err);
                    } else if (result.event === "success") {
                        // setImages((prevImages) => [...prevImages, result.info.secure_url]);
                        setImages(result.info.secure_url);
                    }
                }
            );
        }
    };

    useEffect(() => {
        setupCloudinaryWidget();
    }, []);


    const handleImageUpload = () => {
        widgetRef.current?.open();
    };

    const initialValues = {
        username: user?.userExist?.username || '',
        email: user?.userExist?.email || '',
        fname: currentUserProfile?.fname || '',
        lname: currentUserProfile?.lname || '',
        phone: currentUserProfile?.phone || '',
        sex: currentUserProfile?.sex || '',
        address: currentUserProfile?.address || '',
        age: currentUserProfile?.age || '',
        facebookLink: currentUserProfile?.facebookLink || '',
        twitterLink: currentUserProfile?.twitterLink || '',
        instagramLink: currentUserProfile?.instagramLink || '',
        linkedinLink: currentUserProfile?.linkedinLink || '',
        bio: currentUserProfile?.bio || '',
    }
    const validationSchema = Yup.object({
        fname: Yup.string().required("First name is required"),
        lname: Yup.string().required("Last name is required"),
        phone: Yup.number().required("Phone number is required"),
        sex: Yup.string().required("Sex is required"),
        address: Yup.string().required("Address is required"),
        age: Yup.number().required("Age is required"),
    })
    const handleSubmit = (values) => {
        const id = currentUserProfile?.id
        const {
            username, email,
            fname, lname, phone, sex, address, age,
            facebookLink, twitterLink, instagramLink, linkedinLink, bio,
        } = values;
        if (userProfileStatus != true && !id) {
            createUserProfile({
                fname, lname, phone, sex, address, age,
                facebookLink, twitterLink, instagramLink, linkedinLink, bio,
                avatar: images
            }).then((res) => {
                const status = res.data.status;
                if (status) {
                    toast.success(res?.data?.message)
                } else {
                    toast.error(res?.data?.message)
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            updateUserProfile({
                id,
                updateUserProfile: {
                    username, email,
                    fname, lname, phone, sex, address, age,
                    facebookLink, twitterLink, instagramLink, linkedinLink, bio,
                    avatar: images
                }
            }).then((res) => {
                const status = res.data.status;
                if (status) {
                    toast.success(res?.data?.message)
                } else {
                    toast.error(res?.data?.message)
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <div className="w-full p-3">
            <div className="w-[95%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate-100 p-4">
                <div className="w-full">
                    <h1 className="w-full text-2xl p-4">Personal Information</h1>
                    <div className="w-full md:w-[30%] mx-auto p-3 rounded">
                        <button onClick={handleImageUpload}>
                            <IoCloudUploadOutline size={100} />
                        </button>
                        <p className="w-full text-center text-2xl"> Upload Image</p>
                    </div>
                    <Formik
                        enableReinitialize
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        initialValues={initialValues}>
                        <Form className="w-full space-y-4 p-4">
                            {
                                userProfileStatus == true && <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    <div className="w-full space-y-2">
                                        <Field name='username' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Username" />
                                        <ErrorMessage name='username' component='div' className="text-red-500" />
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Field name='email' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Email" />
                                        <ErrorMessage name='email' component='div' className="text-red-500" />
                                    </div>
                                </div>
                            }

                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                                <div className="w-full space-y-2">
                                    <Field name='fname' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="First Name" />
                                    <ErrorMessage name='fname' component='div' className="text-red-500" />
                                </div>
                                <div className="w-full space-y-2">
                                    <Field name='lname' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Last Name" />
                                    <ErrorMessage name='lname' component='div' className="text-red-500" />
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                                <div className="w-full space-y-2">
                                    <Field name='phone' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="number" placeholder="Phone" />
                                    <ErrorMessage name='phone' component='div' className="text-red-500" />
                                </div>
                                <div className="w-full space-y-2">
                                    <Field name='sex' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' as="select">
                                        <option value=''>--select sex --</option>
                                        <option value='male'>male</option>
                                        <option value='female'>female</option>
                                    </Field>
                                    <ErrorMessage name='sex' component='div' className="text-red-500" />
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                                <div className="w-full space-y-2">
                                    <Field name='address' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Address" />
                                    <ErrorMessage name='address' component='div' className="text-red-500" />
                                </div>
                                <div className="w-full space-y-2">
                                    <Field name='age' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="number" placeholder="Age" />
                                    <ErrorMessage name='age' component='div' className="text-red-500" />
                                </div>
                            </div>
                            <hr className="w-full" />
                            <h1 className="w-full text-2xl p-4">Social Media Links</h1>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                                <div className="w-full space-y-2">
                                    <Field name='facebookLink' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Facebook Link" />
                                    <ErrorMessage name='facebookLink' component='div' className="text-red-500" />
                                </div>
                                <div className="w-full space-y-2">
                                    <Field name='twitterLink' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Twitter Link" />
                                    <ErrorMessage name='twitterLink' component='div' className="text-red-500" />
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                                <div className="w-full space-y-2">
                                    <Field name='instagramLink' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Instagram Link" />
                                    <ErrorMessage name='instagramLink' component='div' className="text-red-500" />
                                </div>
                                <div className="w-full space-y-2">
                                    <Field name='linkedinLink' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' type="text" placeholder="Linkedin Link" />
                                    <ErrorMessage name='linkedinLink' component='div' className="text-red-500" />
                                </div>
                            </div>
                            <div className="w-full space-y-2">
                                <Field name='bio' className='w-full px-3 py-2 shadow rounded outline-[#FF6F61]' as="textarea" rows="5" placeholder="Bio" />
                                <ErrorMessage name='bio' component='div' className="text-red-500" />
                            </div>
                            <button type="submit" className="px-4 py-2 rounded shadow bg-[#FF6F61] text-white">submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>

    )
}

export default UserProfileForm