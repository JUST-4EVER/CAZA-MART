import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link, useLocation } from "react-router-dom"
import * as Yup from 'yup'
import { useRegisterUserMutation, useUpdateUserMutation } from "../redux/slices/UserSlices"
import toast from "react-hot-toast";
function UserForm() {
    const user_state = useLocation().state;
    const [registerUser] = useRegisterUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const initialValues = {
        username: user_state?.username || '',
        email: user_state?.email || '',
        password: '',
        role: user_state?.role || '',
        status: user_state?.status || '',
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username required'),
        email: Yup.string().email('email required').required('Email required'),
        password: !user_state?.id && Yup.string().required('Password required'),
        role: Yup.string().required('Role required'),
        status: Yup.string().required('Status required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { username, email, password, role, status } = values;
            const id = user_state?.id;
            if (!id) {
                registerUser({ username, email, password, role, status })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message
                        if (status) {
                            toast.success(message);
                            resetForm()
                        } else {
                            toast.error(message);
                            // resetForm();
                        }
                    })
                    .catch((err) => {
                        toast.error(err?.data);
                        console.log('error occur after submitting form data', err.message);
                    })
            } else {
                updateUser({ id: id, updateUser: { username : username, email : email, role : role, status : status } })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message;
                        if (status) {
                            toast.success(message);
                        } else {
                            toast.error(message);
                        }
                    }).catch((err) => {
                        toast.error(err.data)
                    })
            }
        } catch (error) {
            toast.error(error?.message);
            console.log('Error submitting', error.message);
        }


    }
    return (
        <div className="w-full p-3">
            <div className="w-[95%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 p-4 shadow rounded border border-slate100">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">Create User</h1>
                    <Link to='/dashboard/users' className="px-4 py-2 shadow text-base font-thin rounded bg-[#FF6F61] text-white">Back</Link>
                </div>
                <div className="mt-10 w-full">
                    <Formik
                        enableReinitialize
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        <Form className="w-full space-y-4">
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-3">
                                <div className="w-full space-y-1">
                                    <label className="text-basen font-light tracking-widest" htmlFor="">Username</label>
                                    <Field name='username' type='text' className='w-full p-2 rounded shadow outline-[#FF6F61]'
                                        placeholder='Enter Username' />
                                    <ErrorMessage className="text-red-500" component='div' name="username" />
                                </div>

                                <div className="w-full space-y-1">
                                    <label className="text-basen font-light tracking-widest" htmlFor="">Email</label>
                                    <Field name='email' type='text' className='w-full p-2 outline-[#FF6F61] rounded shadow'
                                        placeholder='Enter Email' />
                                    <ErrorMessage className="text-red-500" component='div' name="email" />
                                </div>

                            </div>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-3">

                                <div className="w-full space-y-1">
                                    <label className="text-basen font-light tracking-widest" htmlFor="">Status</label>
                                    <Field name='status' as='select' className='w-full p-2 outline-[#FF6F61] rounded shadow'
                                    >
                                        <option value="">-- select status -- </option>
                                        <option value="active">active </option>
                                        <option value="inactive">inactive </option>
                                    </Field>
                                    <ErrorMessage className="text-red-500" component='div' name="status" />
                                </div>

                                <div className="w-full space-y-1">
                                    <label className="text-basen font-light tracking-widest" htmlFor="">Role</label>
                                    <Field name='role' as='select' className='w-full p-2 outline-[#FF6F61] rounded shadow'
                                    >
                                        <option value="">-- select role -- </option>
                                        <option value="user">user </option>
                                        <option value="admin">admin </option>
                                        <option value="staff">staff</option>
                                    </Field>
                                    <ErrorMessage className="text-red-500" component='div' name="role" />
                                </div>
                            </div>
                            {
                                !user_state?.id && <div className="w-full space-y-1">
                                    <label className="text-basen font-light tracking-widest" htmlFor="">Password</label>
                                    <Field name='password' type='password' className='w-full p-2 rounded shadow outline-[#FF6F61]'
                                        placeholder='Enter Password' />
                                    <ErrorMessage className="text-red-500" component='div' name="password" />
                                </div>
                            }
                            <button className="bg-[#FF6F61] text-white py-2 px-4 rounded
                        transition-all ease-in-out hover:bg-white hover:text-[#FF6F61]" type="submit"> {user_state?.id ? 'Update User' : 'Create user'}</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default UserForm