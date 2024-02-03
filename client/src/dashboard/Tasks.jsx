import { Modal } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../redux/slices/TaskSlices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useState } from "react";
import { MdModeEdit, MdOutlineDelete } from 'react-icons/md';
const Tasks = () => {
    const navigate = useNavigate()
    const { data: tasks = [] } = useGetTasksQuery();
    const userTasks = tasks?.getTasks || [];
    const params_row = useLocation().state;
    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const initialValues = {
        title: params_row?.title || '',
        description: params_row?.description || '',
        status: params_row?.status || ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('title is required'),
        description: Yup.string().required('descriptionis required'),
        status: params_row?.id ? Yup.string().required('status is required') : '',
    })


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const { title, description, status } = values;
            const id = params_row?.id;
            if (!id) {
                createTask({ title, description })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message;
                        if (status) {
                            toast.success(message);
                            resetForm();
                        } else {
                            toast.error(message);
                        }
                    })
                    .catch(err => {
                        toast.error(err?.data);
                    });
            } else {
                updateTask({ id: id, updateTask: { title: title, description: description, status: status } })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message;
                        if (status) {
                            toast.success(message);
                            resetForm();
                            navigate('/dashboard/tasks');
                            handleClose();
                        } else {
                            toast.error(message);
                        }
                    })
                    .catch(err => {
                        toast.error(err?.data);
                    });

            }
        } catch (error) {
            console.log('error submitting task', error.message);
        }
    }


    const handleDeleteTask = async (id) => {
        if (confirm('Are you sure you want to delete')) {
            await deleteTask(id).then((res) => {
                const status = res?.data?.status;
                const message = res?.data?.message;
                if (status) {
                    toast.success(message);
                    navigate('/dashboard/tasks');
                } else {
                    toast.error(message);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    const ModelForm = (
        <div>
            <Modal open={open} onClose={handleClose}>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="w-[80%] md:w-[30%] bg-white p-4 rounded-lg">
                        <label htmlFor="" className="text-base font-medium ml-1">Add Tasks</label>
                        <hr className='w-full mt-3' />
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <Form className='w-full space-y-2 p-4'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1">Title</label>
                                    <Field className="p-3 rounded border w-full outline-[#FF6F61]" type="text" placeholder='Enter title' name="title" />
                                    <ErrorMessage name='title' className='text-red-600' component="div" />
                                </div>
                                <div className="w-full space-y-3">
                                    <label htmlFor="" className="text-base font-medium ml-1">Description</label>
                                    <Field as="textarea" rows='4' className="w-full px-3 py-2 rounded border outline-[#FF6F61]" name='description' placeholder='Enter description' />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>

                                {
                                    params_row?.id &&
                                    (<div className="w-full space-y-3">
                                        <label htmlFor="" className="text-base font-medium ml-1 text-black ">Status</label>
                                        <Field as="select" rows='4' className="w-full p-2 text-black rounded border outline-[#322F64]" name='status'>
                                            <option value="">--select status--</option>
                                            <option value="Todo">Todo</option>
                                            <option value="Doing">Doing</option>
                                            <option value="Done">Done</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="text-red-500" />
                                    </div>)

                                }

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <button className='w-full p-3 rounded shadow border border-[#FF6F61] text-[#FF6F61]' onClick={handleClose}>Close</button>
                                    <button className='w-full p-3 rounded shadow bg-[#FF6F61] text-white' type='submit'>{!params_row?.id ? 'Create Task' : 'Update Task'}</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    )
    return (
        <div className="w-full p-3">
            <div className="w-[90%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow 
        rounded border border-slate100 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">Task Lists </h1>
                    <button onClick={handleOpen} className="px-4 py-2 shadow text-base font-thin
                 rounded bg-[#FF6F61] text-white">Create Task</button>
                </div>

                <div className='w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black'>
                    {
                        userTasks?.map(task => {
                            return (
                                <div
                                    key={task?.id}
                                    className={`bg-white p-3 mt-2 rounded-md shadow
                                    space-y-4 relative ${task?.status == 'Done' ? 'line-through' : ''}`}
                                >
                                    <span className={`absolute bottom-0 left-0  rounded shadow px-4 py-2 ${task?.status == 'Done' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>{task?.status}</span>
                                    <h1 className='text-base font-medium'>
                                        {task?.title}
                                    </h1>
                                    <hr className='w-full' />
                                    <p className='text-base font-light'>
                                        {task?.description}
                                    </p>
                                    <div className='w-full flex flex-row justify-end items-center gap-3'>
                                        <button
                                            onClick={() => handleDeleteTask(task?.id)}
                                        >
                                            <MdOutlineDelete className='text-red-500' size={20} />
                                        </button>
                                        <Link to={`/dashboard/tasks/${task?.id}`} state={task} onClick={handleOpen}>
                                            <MdModeEdit className='text-green-500' size={20} />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {
                    ModelForm
                }
            </div>
        </div>
    )
}

export default Tasks