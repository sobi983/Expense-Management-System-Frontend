import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DialogBox from '../../components/DialogBox/DialogBox';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signupUser, validateJWT } from '../../services/expenseService'
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    username: Yup.string().required('Username is required').min(4, 'Username must be at least 4 characters'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const INITIAL_VALUES = {
    email: '',
    username: '',
    password: '',
};

const SignUp = () => {
    // State for Dialog visibility
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        validateJWT()
            .then(res => {
                if (res?.user) {
                    navigate('/expense')
                } else {
                    console.log("No user logged in!")
                }
            }).catch(err => {
                console.log("No user logged in!")
            })
    }, [])

    // Handle form submission
    const handleSubmit = (values, { resetForm }) => {
        let rData = {
            email: values?.email,
            username: values?.username,
            password: values?.password,
            role: 'user'
        }

        signupUser(rData)
            .then((response) => {
                console.log(response)

                if (response?.status === true) {
                    setDialogMessage(response?.message);
                    setOpenDialog(true);
                    navigate('/login')
                }
                else {
                    setDialogMessage(response?.message);
                    setOpenDialog(true);
                    // resetForm();
                }
            })
            .catch((err) => {
                console.log(err)
                setDialogMessage('Something Went Wrong!');
                setOpenDialog(true);
                // resetForm();
            })
    };

    // Handle Dialog Close
    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 px-2">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <motion.h2
                    className="text-3xl font-bold text-center mb-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Sign Up
                </motion.h2>
                <Formik
                    initialValues={INITIAL_VALUES}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, touched, errors }) => (
                        <Form>
                            <div className="flex flex-col gap-4">
                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Field name="email">
                                        {({ field }) => (
                                            <div>
                                                <input
                                                    {...field}
                                                    type="email"
                                                    placeholder="Your Email"
                                                    className={`w-full p-3 border-2 rounded-lg ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                />
                                                {touched.email && errors.email && (
                                                    <div className="text-red-500 text-sm">{errors.email}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </motion.div>

                                {/* UserName Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Field name="username">
                                        {({ field }) => (
                                            <div>
                                                <input
                                                    {...field}
                                                    type="username"
                                                    placeholder="Your Username"
                                                    className={`w-full p-3 border-2 rounded-lg ${touched.username && errors.username ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                />
                                                {touched.username && errors.username && (
                                                    <div className="text-red-500 text-sm">{errors.username}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </motion.div>

                                {/* Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Field name="password">
                                        {({ field }) => (
                                            <div>
                                                <input
                                                    {...field}
                                                    type="password"
                                                    placeholder="Your Password"
                                                    className={`w-full p-3 border-2 rounded-lg ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                />
                                                {touched.password && errors.password && (
                                                    <div className="text-red-500 text-sm">{errors.password}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className="bg-secondary text-white font-semibold rounded-full px-6 py-2 w-full mt-4 hover:bg-opacity-80 transition"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    Sign Up
                                </motion.button>
                            </div>

                            {/* Below the login button */}
                            <motion.div
                                className="mt-2 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                {/* Sign-up prompt */}
                                <span className="text-sm text-gray-600">Already have an account? </span>
                                <Link to={'/login'}>
                                    <button className="text-sm text-blue-600 hover:underline">Login here!</button>
                                </Link>
                            </motion.div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Reusable Dialog Box */}
            <DialogBox
                open={openDialog}
                onClose={handleDialogClose}
                message={dialogMessage}
            />
        </div>
    );
};

export default SignUp;
