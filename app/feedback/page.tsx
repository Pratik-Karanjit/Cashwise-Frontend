"use client"

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { sendFeedback } from '../services/feedbackService';

export interface FeedbackFormValues {
    name: string;
    email: string;
    message: string;
}

const FeedbackPage = () => {
    const initialValues = {
        name: '',
        email: '',
        message: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        message: Yup.string().required('Message is required')
    });

    const onSubmit = async (values: FeedbackFormValues, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
    ) => {
        try {
            const response = await sendFeedback(values);
            console.log("response in onSubmit", response.data.message)
            if (response?.data?.message === "Form submitted successfully!") {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Message sent successfully!',
                });
                resetForm();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to send message. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to send message. Please try again.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex flex-col min-h-screen bg-white">
                {/* Header Banner */}
                <div className="relative  md:bg-gray-50">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2">
                            <h1 className="hidden md:flex text-3xl lg:text-5xl font-bold text-primary mb-4">Feedback</h1>
                        </div>
                        <div className="hidden md:block md:w-1/2 mt-7 md:mt-0 h-72 relative justify-end">
                            <Image
                                src="/Feedback.svg"
                                width={300}
                                height={300}
                                alt='Feedback Image'
                                className='cursor-pointer absolute top-20 right-20'
                            />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-6 sm:py-16">
                    <div className="border-l-4 border-secondary pl-4 mb-8">
                        <h2 className="text-3xl font-bold text-secondary">Feedback time!</h2>
                    </div>
                    <div className="max-w-4xl">
                        <div className="max-w-4xl">
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                Found a bug? Have feedback to share? Or simply want to connect?
                                I'd love to hear from you! Drop your details in the form below and I'll reach out personally.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto pt-2 pb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className=" rounded-lg overflow-hidden border border-slate-200">
                            <div className="bg-secondary py-4 px-6">
                                <h2 className="text-base sm:text-2xl font-bold text-white">Feedback Form</h2>
                                <p className="text-sm sm:text-base text-blue-100 mt-1">I'd love to hear from you</p>
                            </div>
                            <div className="p-8">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ isSubmitting, touched, errors }) => (
                                        <Form className="space-y-6">
                                            <div>
                                                <label htmlFor="name" className="block text-gray-700 text-sm sm:text-base font-medium mb-2">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <Field
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        placeholder="Enter your name"
                                                        className={`block w-full border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
                                                            } rounded-lg shadow-sm p-4 pl-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm"></span>
                                                    </div>
                                                </div>
                                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-gray-700 text-sm sm:text-base font-medium mb-2">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <Field
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="you@example.com"
                                                        className={`block w-full border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                                                            } rounded-lg shadow-sm p-4 pl-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
                                                    />
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm"></span>
                                                    </div>
                                                </div>
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-gray-700 text-sm sm:text-base font-medium mb-2">
                                                    Your Message
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    id="message"
                                                    name="message"
                                                    rows="6"
                                                    placeholder="How can we help you?"
                                                    className={`block w-full border ${touched.message && errors.message ? 'border-red-500' : 'border-gray-300'
                                                        } rounded-lg shadow-sm p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
                                                />
                                                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1 font-medium" />
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    className="w-full cursor-pointer bg-secondary text-white px-6 py-4 rounded-lg transition duration-300 font-medium flex items-center justify-center"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center">
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Sending...
                                                        </span>
                                                    ) : (
                                                        'Send Message'
                                                    )}
                                                </button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;