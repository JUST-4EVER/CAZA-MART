import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa6'
const Review = ({ setShowReview }) => {
    const star = Array(5).fill(0)
    const [currentValue, setCurrentValues] = useState(0);
    const [hoverValue, setHoverValues] = useState(undefined);

    const handleClick = (value) => {
        setCurrentValues(value);
    }
    const handleMouseHover = (value) => {
        setHoverValues(value);
    }

    const handleMouseLeave = () => {
        setHoverValues(undefined);
    }
    const initialValues = {
        comment: ''
    }
    const handleSubmit = (values) => {
        const { comment } = values;
        console.log({
            comment, rating: currentValue
        });
    }
    return (
        <div className="w-full">
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}>
                <Form className='w-full flex flex-col justify-start items-start space-y-3'>
                    <div className='w-full flex flex-row justify-start items-center gap-3'>
                        <p>Your rating</p>
                        {
                            star.map((item, index) => {
                                return (
                                    <FaStar key={index}
                                        onClick={() => handleClick(index + 1)}
                                        name='rating'
                                        className={(hoverValue || currentValue) > index ? "text-orange-500 cursor-pointer" : "text-gray-400 cursor-pointer"}
                                        onMouseOver={() => handleMouseHover(index + 1)}
                                        onMouseLeave={() => handleMouseLeave()} />
                                )
                            })
                        }
                    </div>
                    <Field className="p-3 w-full rounded shadow outline-[#FF6F61]" rows='5' as='textarea' name='comment' placeholder='Enter review comment' />
                    <button className='p-3 rounded shadow bg-[#FF6F61] text-white' type='submit' onMouseLeave={() => setShowReview(false)}>submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Review