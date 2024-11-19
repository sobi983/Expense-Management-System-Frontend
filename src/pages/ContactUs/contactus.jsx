import React, { useState } from 'react';
import { TextField, Typography, Container } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import DialogBox from '../../components/DialogBox/DialogBox';
import { motion } from 'framer-motion';

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const INITIAL_VALUES = {
    name: '',
    email: '',
    message: '',
};

const ContactUs = () => {
    // State for Dialog visibility
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    // Handle form submission
    const handleSubmit = (values, { resetForm }) => {
        console.log('Form submitted:', values);
        setDialogMessage('Thank you for reaching out! We will get back to you soon.');
        resetForm(); // Reset the form after submission

        // Open Dialog
        setOpenDialog(true);
    };

    // Handle Dialog Close
    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Contact Us
            </Typography>
            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, touched, errors }) => (
                    <Form>
                        <div className="flex flex-col gap-4">
                            {/* Name Field */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Field name="name">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Your Name"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    )}
                                </Field>
                            </motion.div>

                            {/* Email Field */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Field name="email">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Your Email"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    )}
                                </Field>
                            </motion.div>

                            {/* Message Field */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <Field name="message">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Your Message"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            error={touched.message && Boolean(errors.message)}
                                            helperText={touched.message && errors.message}
                                        />
                                    )}
                                </Field>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="text-white bg-secondary font-semibold rounded-full px-6 py-2 w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Send Message
                            </motion.button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* Reusable Dialog Box */}
            <DialogBox
                open={openDialog}
                onClose={handleDialogClose}
                message={dialogMessage}
            />
        </Container>
    );
};

export default ContactUs;
