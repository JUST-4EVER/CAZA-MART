import { ErrorMessage, Field, Form, Formik } from "formik"
import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useChangeUserPasswordMutation } from "../redux/slices/UserSlices"
const UserChangePassword = () => {
  const [ChangeUserPassword] = useChangeUserPasswordMutation();
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New password is required'),
    confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  })

  const handleSubmit = async (values) => {
    const { oldPassword, newPassword } = values
    await ChangeUserPassword({
      oldPassword,
      newPassword
    }).then((res) => {
      const status = res?.data?.status
      if (status) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="w-full p-3">
      <div className="w-[95%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate-100 p-4">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="w-full text-2xl p-4">User Change Password</h1>
        </div>

        <div className="w-full p-5 shadow rounded bg-white">
          <div className="w-full">
            <Formik
              enableReinitialize
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <Form className="space-y-5 w-full lg:w-[70%] mt-10">
                <div className="w-full space-y-2">
                  <label className="ml-1" htmlFor="">Old Password</label>
                  <Field className='px-3 py-2  border outline-[#FF6F61] rounded w-full' type="password" placeholder="Old password" name='oldPassword' />
                  <ErrorMessage component='div' className="text-red-500" name="oldPassword" />
                </div>
                <div className="w-full space-y-2">
                  <label className="ml-1" htmlFor="">New Password</label>
                  <Field className='px-3 py-2  border outline-[#FF6F61] rounded w-full' type="password" placeholder="New password" name='newPassword' />
                  <ErrorMessage component='div' className="text-red-500" name="newPassword" />
                </div>
                <div className="w-full space-y-2">
                  <label className="ml-1" htmlFor="">Confirm Password</label>
                  <Field className='px-3 py-2  border outline-[#FF6F61] rounded w-full' type="password" placeholder="Confirm password" name='confirmPassword' />
                  <ErrorMessage component='div' className="text-red-500" name="confirmPassword" />
                </div>
                <button type="submit" className="w-full lg:w-[40%] px-4 py-2 bg-[#FF6F61] text-white">Change Password</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserChangePassword