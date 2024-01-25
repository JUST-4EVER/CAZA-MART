import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useLoginUserMutation } from "../../redux/slices/UserSlices";
import toast from "react-hot-toast";
const UserLogin = () => {
    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation();
    const [showPassword, setShowPassword] = useState('password');
    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required")
    })
    const handleSubmit = (values, { resetForm }) => {
        try {
            const { email, password } = values;
            loginUser({ email, password })
                .then((res) => {
                    const status = res?.data?.status;
                    const message = res?.data?.message;
                    if (status) {
                        toast.success(message);
                        resetForm();
                        navigate('/dashboard');
                    } else {
                        toast.error(message);
                    }
                })
                .catch(err => {
                    toast.error(err?.data);
                })
        } catch (error) {
            console.log('error submitting user login ', error.message);
        }
    }
    return (
        <div className='w-full p-3'>
            <div className='w-full p-2 grid grid-cols-1 lg:grid-cols-2
        gap-5 justify-start items-center'>
                <img src="../../../public/images/join.png" alt="" />
                <div className="w-full">
                    <Formik
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        initialValues={initialValues}>
                        <Form className="w-full lg:w-[80%] space-y-5">
                            <h1 className="flex flex-row justify-between items-center gap-5">
                                <span>user Login</span>
                                <Link to='/customer-login' className="text-red-500">Are you customer ? </Link>
                            </h1>
                            <div className="w-full space-y-2">
                                <Field type='text' placeholder='Enter email' name="email"
                                    className="p-3 w-full rounded shadow bg-white outline-[#FF6F61]" />
                                <ErrorMessage name="email" className="text-red-500" component='div' />
                            </div>
                            <div className="w-full space-y-2 relative">
                                <Field type={showPassword} placeholder='Enter email' name="password"
                                    className="p-3 w-full rounded shadow bg-white outline-[#FF6F61]" />
                                {
                                    showPassword == 'password' ? <BiHide className=" absolute right-3 top-2 cursor-pointer" size={25} onClick={() => setShowPassword('text')} />
                                        : <BiShow size={25} className=" absolute right-3 top-2 cursor-pointer" onClick={() => setShowPassword('password')} />
                                }
                                <ErrorMessage component="div" name="password" className="text-red-500" />
                            </div>
                            <button className="px-3 py-2 rounded shadow bg-[#FF6F61] text-white w-full" type="submit">Login</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default UserLogin