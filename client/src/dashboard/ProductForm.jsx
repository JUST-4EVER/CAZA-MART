import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import { FaCloudUploadAlt } from "react-icons/fa";
import { useGetCategoriesQuery } from '../redux/slices/CategorySlices';
import { useCreateProductMutation, useUpdateProductMutation } from '../redux/slices/ProductSlices';
import toast from 'react-hot-toast';
const ProductForm = () => {
    const product_state = useLocation().state;
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const { data } = useGetCategoriesQuery();
    const Categories = data?.getCategories || [];
    console.log('categories', Categories);
    const [images, setImages] = useState(product_state?.thumbnail || null);
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
        name: product_state?.name || '',
        description: product_state?.description || '',
        price: product_state?.price || '',
        discount: product_state?.discount || '',
        stock: product_state?.stock || '',
        category_id: product_state?.category_id || '',
        availibility: product_state?.availibility || '',
        size: product_state?.size || '',
        color: product_state?.color || '',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('name required'),
        description: Yup.string().required('name description'),
        price: Yup.number().required('price required'),
        discount: Yup.number().required('discount required'),
        stock: Yup.number().required('stock required'),
        category_id: Yup.string().required('category name required'),
        availibility: Yup.string().required('availibility required'),
    })

    console.log('images', images);
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const id = product_state?.id;
            const thumbnail = images;
            const { name, price, discount, stock, description, color, size, availibility, category_id } = values;
            if (!id) {
                createProduct({ name, price, discount, stock, description, color, size, category_id, availibility, thumbnail })
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
                const thumbnail = images;
                updateProduct({
                    id: id, updateProduct: {
                        name: name, price: price, discount: discount, stock: stock
                        , description: description, color: color, size : size, category_id : category_id, 
                        availibility : availibility, thumbnail : thumbnail
                    }
                })
                    .then((res) => {
                        const status = res?.data?.status;
                        const message = res?.data?.message;
                        if (status) {
                            toast.success(message);
                        } else {
                            toast.error(message);
                        }
                    })
                    .catch(err => {
                        toast.error(err?.data);
                    });

            }
        } catch (error) {
            console.log('Error submitting category', error.message);
        }

    }
    return (
        <div className="w-full p-3">
            <div className="w-[90%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate100 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">Create Product </h1>
                    <Link to='/dashboard/products' className="px-4 py-2 shadow text-base font-thin rounded bg-[#FF6F61] text-white">Back</Link>
                </div>

                <div className='w-full mt-5'>
                    <Formik
                        enableReinitialize
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        <Form className='w-full space-y-3'>

                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="">Name</label>
                                    <Field name='name' className='w-full outline-[#FF6F61] rounded border p-3' type='text' placeholder='Enter product name' />
                                    <ErrorMessage name='name' component='div' className='text-red-500' />
                                </div>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="">Price</label>
                                    <Field name='price' className='w-full outline-[#FF6F61] rounded border p-3' type='number' placeholder='Enter product price' />
                                    <ErrorMessage name='price' component='div' className='text-red-500' />
                                </div>
                            </div>

                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="">Discount</label>
                                    <Field name='discount' className='w-full outline-[#FF6F61] rounded border p-3' type='number' placeholder='Enter product discount' />
                                    <ErrorMessage name='discount' component='div' className='text-red-500' />
                                </div>
                                <div className='w-full space-y-2'>
                                    <label htmlFor="">stock</label>
                                    <Field name='stock' className='w-full outline-[#FF6F61] rounded border p-3' type='number' placeholder='Enter product stock' />
                                    <ErrorMessage name='stock' component='div' className='text-red-500' />
                                </div>
                            </div>

                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div className='w-full space-y-1'>
                                    <label htmlFor="">Category Name</label>
                                    <Field name='category_id' className='w-full outline-[#FF6F61] rounded border p-3' as='select' >
                                        <option value="">--select category data-- </option>
                                        {
                                            Categories?.map((category, index) => {
                                                return <option key={index} value={`${category?.id}`}>{category?.category_name}</option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name='category_id' component='div' className='text-red-500' />
                                </div>
                                <div className='w-full space-y-1'>
                                    <label htmlFor="">Availibility</label>
                                    <Field name='availibility' className='w-full outline-[#FF6F61] rounded border p-3' as='select' >
                                        <option value="">--select avalibility --</option>
                                        <option value="availible">availible</option>
                                        <option value="unavailible">unavailible</option>
                                    </Field>
                                    <ErrorMessage name='availibility' component='div' className='text-red-500' />
                                </div>
                            </div>


                            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                <div className='w-full space-y-2 border rounded p-2'>
                                    <label htmlFor="">Colors</label>
                                    <div className='w-full grid grid-cols-2 lg:grid-cols-3 gap-3'>
                                        <div className='w-full space-x-2'>
                                            <Field name='color' type='checkbox' value='blue' />
                                            <span>Blue</span>
                                        </div>
                                        <div className='w-full space-x-2'>
                                            <Field name='color' type='checkbox' value='red' />
                                            <span>Red</span>
                                        </div>
                                        <div className='w-full space-x-2'>
                                            <Field name='color' type='checkbox' value='black' />
                                            <span>Black</span>
                                        </div>
                                        <div className='w-full space-x-2'>
                                            <Field name='color' type='checkbox' value='white' />
                                            <span>White</span>
                                        </div>
                                    </div>
                                    <ErrorMessage name='color' component='div' className='text-red-500' />
                                </div>


                                <div className='w-full space-y-2 border rounded p-2'>
                                    <label htmlFor="">Size</label>
                                    <div className='w-full grid grid-cols-2 lg:grid-cols-3 gap-3'>
                                        <div className='w-full space-x-2'>
                                            <Field name='size' type='checkbox' value='sm' />
                                            <span>SM</span>
                                        </div>
                                        <div className='w-full space-x-2'>
                                            <Field name='size' type='checkbox' value='md' />
                                            <span>MD</span>
                                        </div>
                                        <div className='w-full space-x-2'>
                                            <Field name='size' type='checkbox' value='lg' />
                                            <span>LG</span>
                                        </div>
                                        <div className='w-full space-x-2'>
                                            <Field name='size' type='checkbox' value='xl' />
                                            <span>XL</span>
                                        </div>
                                        <div className='w-full space-x-2'>
                                            <Field name='size' type='checkbox' value='xs' />
                                            <span>XS</span>
                                        </div>
                                    </div>
                                    <ErrorMessage name='size' component='div' className='text-red-500' />
                                </div>
                            </div>
                            <div className='w-full space-y-2'>
                                <label htmlFor="">Description</label>
                                <Field name='description' as='textarea' rows='5' className='w-full p-3 rounded border outline-[#FF6F61]' placeholder='Enter product description' />
                                <ErrorMessage name='description' component='div' className='text-red-500' />
                            </div>
                            <div className='w-full space-y-2' onClick={handleImageUpload}>
                                <label htmlFor="">Upload thumbnail</label>
                                <div className='w-full p-4 rounded border-slate-100 shadow border-4 border-dotted flex flex-row justify-center items-center'>
                                    <FaCloudUploadAlt size={50} onClick={handleImageUpload} />
                                </div>
                            </div>

                            <button className="w-full bg-[#FF6F61] text-white py-2 px-4 rounded
                        transition-all ease-in-out hover:bg-white hover:text-[#FF6F61]" type='submit'>{product_state?.id ? 'Update product' : 'Create Product'}</button>

                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ProductForm