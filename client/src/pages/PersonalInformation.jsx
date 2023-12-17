import { ErrorMessage, Field, Form, Formik } from "formik"
import { IoCloudUploadOutline } from "react-icons/io5"
import * as Yup from 'yup'
import { useGetCurrentCustomerProfileQuery, 
    useRegisterCustomerProfileMutation, 
    useUpdateCustomerProfileMutation
 } from "../redux/slices/CustomerProfileSlices"
import toast, {} from 'react-hot-toast'
import { useGetCurrentCustomerQuery } from "../redux/slices/CustomerSlices"
const PersonalInformation = () => {
    const { data: currentCustomer = [] } = useGetCurrentCustomerProfileQuery()
    const [ registerCustomerProfile ] = useRegisterCustomerProfileMutation();
    const [updateCustomerProfile] = useUpdateCustomerProfileMutation();
    const customerProfileStatus = currentCustomer?.status || [];
    const currentCustomerProfile = currentCustomer?.currentCustomerProfile || [];
    const { data : customer = {} } = useGetCurrentCustomerQuery();
    const initialValues = {
        username: customer?.customer?.username || '',
        email: customer?.customer?.email || '',
        fname: currentCustomerProfile?.fname || '',
        lname: currentCustomerProfile?.lname || '',
        phone: currentCustomerProfile?.phone || '',
        sex: currentCustomerProfile?.sex || '',
        address: currentCustomerProfile?.address || '',
        age: currentCustomerProfile?.age ||'',
        facebookLink: currentCustomerProfile?.facebookLink || '',
        twitterLink: currentCustomerProfile?.twitterLink || '',
        instagramLink: currentCustomerProfile?.instagramLink || '',
        linkedinLink: currentCustomerProfile?.linkedinLink || '',
        bio: currentCustomerProfile?.bio || '',
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
        const id = currentCustomerProfile?.id
        const {
            username , email,
            fname,lname,phone,sex, address,age,
            facebookLink,twitterLink,instagramLink,linkedinLink,bio,
        } = values;
        if(customerProfileStatus != true && !id){
            registerCustomerProfile({
                fname,lname,phone,sex, address,age,
                facebookLink,twitterLink,instagramLink,linkedinLink,bio,
            }).then((res) => {
                const status = res.data.status;
                if(status){
                    toast.success(res?.data?.message)
                }else{
                    toast.error(res?.data?.message)
                }
            }).catch((err) => {
                console.log(err);
            })
        }else{
            updateCustomerProfile({
                id,
                updateCustomerProfile : {
                    username , email,
                    fname,lname,phone,sex, address,age,
                    facebookLink,twitterLink,instagramLink,linkedinLink,bio,
                }
            }).then((res) => {
                const status = res.data.status;
                if(status){
                    toast.success(res?.data?.message)
                }else{
                    toast.error(res?.data?.message)
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <div className="w-full bg-white shadow rounded p-3 space-y-3">
            <div className="w-full">
                <h1 className="w-full text-2xl p-4">Personal Information</h1>
                <Formik
                    enableReinitialize
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    initialValues={initialValues}>
                    <Form className="w-full space-y-4 p-4">
                        <div className="w-full md:w-[30%] mx-auto p-3 rounded">
                            <IoCloudUploadOutline className="inline lg:ml-16" size={100} />
                            <p className="w-full text-center text-2xl"> Upload Image</p>
                        </div>


                        {
                            customerProfileStatus == true && <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
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
    )
}

export default PersonalInformation