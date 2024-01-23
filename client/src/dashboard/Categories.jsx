import { Modal } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup'
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../redux/slices/CategorySlices';
import toast from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete, MdEdit } from 'react-icons/md';
const Categories = () => {
    const [updateCategory] = useUpdateCategoryMutation();
    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const params_row = useLocation().state;
    const [searchText, setSearchText] = useState('');
    const { data } = useGetCategoriesQuery();
    const Categories = data?.getCategories || [];
    const initialValues = {
        category_name: '',
        description: ''
    }

    const validationSchema = Yup.object({
        category_name: Yup.string().required('category_name is required'),
        description: Yup.string().required('descriptionis required'),
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
            const { category_name, description } = values;
            const id = params_row?.id;
            if (!id) {
                createCategory({ category_name, description })
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
                updateCategory({ id: id, updateCategory: { category_name, description } })
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

            }
        } catch (error) {
            console.log('error submitting category', error.message);
        }
    }
    const ModelForm = (
        <div>
            <Modal open={open} onClose={handleClose}>
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="w-[90%] md:w-[45%] bg-white p-4 rounded-lg">
                        <label htmlFor="" className="text-base font-medium ml-1">Add Categories</label>
                        <hr className='w-full mt-3' />
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <Form className='w-full space-y-2 p-4'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="" className="text-base font-medium ml-1">Category Name</label>
                                    <Field className="p-3 rounded border w-full outline-[#FF6F61]" type="text" placeholder='Enter Category Name' name="category_name" />
                                    <ErrorMessage name='category_name' className='text-red-600' component="div" />
                                </div>
                                <div className="w-full space-y-3">
                                    <label htmlFor="" className="text-base font-medium ml-1">Description</label>
                                    <Field as="textarea" rows='4' className="w-full px-3 py-2 rounded border outline-[#FF6F61]" name='description' placeholder='Enter description' />
                                    <ErrorMessage name="description" component="div" className="text-red-500" />
                                </div>

                                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <button className='w-full p-3 rounded shadow border border-[#FF6F61] text-[#FF6F61]' onClick={handleClose}>Close</button>
                                    <button className='w-full p-3 rounded shadow bg-[#FF6F61] text-white' type='submit'>{!params_row?.id ? 'Create category' : 'Update category'}</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    )



    const filteringData = Categories?.filter(res => {
        return res.category_name.toLowerCase().includes(searchText.toLowerCase());
    })
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete')) {
            await deleteCategory(id).then((res) => {
                const status = res?.data?.status;
                const message = res?.data?.message;
                if (status) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'category_name', headerName: 'Category Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 350 },
        {
            field: 'action', headerName: 'Actions', width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/dashboard/categories/${params.row.id}`} state={params.row}>
                        <MdEdit size={20} className="cursor-pointer text-[#FF6F61]" />
                    </Link>
                    <MdDelete
                        size={20}
                        className="cursor-pointer ml-2 text-[#FF6F61]"
                        onClick={() => handleDelete(params.row.id)}
                    />
                </>
            ),
        },
    ];

    return (
        <div className="w-full p-3">
            <div className="w-[90%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow 
            rounded border border-slate100 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">Category Lists </h1>
                    <button onClick={handleOpen} className="px-4 py-2 shadow text-base font-thin
                     rounded bg-[#FF6F61] text-white">Create Category</button>
                </div>
                <div className="w-full md:w-[50%] mt-4">
                    <input type="text" className="w-full px-3 py-2 rounded border outline-[#FF6F61]" placeholder="search category name ..."
                        onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <div className="mt-10 w-full h-[400px]">
                    <DataGrid
                        rows={filteringData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        getRowId={(row) => row.id}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection />
                </div>
            </div>

            {
                ModelForm
            }
        </div>
    )
}

export default Categories