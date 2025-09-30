'use client'

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerUser } from '../services/authService';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required")
});

export default function SignUp() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            console.log("Form submitted with values:", values);

            try {
                const res = await registerUser(values);
                console.log("res", res)
                router.push("/signIn")
            } catch (err: any) {
                setErrors({ email: err.response?.data?.message || "Registration failed" });
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className='flex flex-col items-center justify-center border border-[#ebe6e7] mt-24 w-fit mx-auto rounded-xl p-7'>
            <div className='flex flex-col gap-8 items-end'>
                <h1 className='font-semibold text-2xl font-primary mx-auto tracking-wide'>Create Your Account</h1>

                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex flex-row gap-6'>
                        <div className='flex flex-col gap-1'>
                            <label>First Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="First Name"
                                className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <span className="text-red-500 text-sm">{formik.errors.firstName}</span>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Last Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Last Name"
                                className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <span className="text-red-500 text-sm">{formik.errors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label>Email <span className='text-red-500'>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email address"
                            className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500 text-sm">{formik.errors.email}</span>
                        )}
                    </div>

                    <div className='flex flex-row gap-6'>
                        <div className='flex flex-col gap-1'>
                            <label>Password <span className='text-red-500'>*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Password"
                                className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <span className="text-red-500 text-sm">{formik.errors.password}</span>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Confirm Password <span className='text-red-500'>*</span></label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter password again"
                                className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <span className="text-red-500 text-sm">{formik.errors.confirmPassword}</span>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center w-full gap-5'>
                        <Button
                            text={formik.isSubmitting ? 'Submitting...' : 'Submit'}
                            type="submit"  // Add this line
                            hasArrow={false}
                            disabled={formik.isSubmitting}  // Add this line
                        />
                        <p className='text-primary text-sm'>
                            Already have an account? &nbsp;
                            <Link href='/signIn'>
                                <span className='text-secondary cursor-pointer'>Sign In</span>
                            </Link>
                        </p>
                    </div>
                </form>

                {/* <div className="w-full py-5 flex items-center relative">
                    <div className='h-px bg-[#E4E1E1] w-full'></div>
                    <span className='absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2'>Or</span>
                </div>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/signIn" })}
                    className="w-full px-5 py-2 rounded-xl text-black border border-[#A39999] transition mx-auto cursor-pointer"
                >
                    <span className='mr-1 text-[#CE4343] text-sm font-medium'><FontAwesomeIcon icon={faGoogle} /></span>
                    Google
                </button> */}
            </div>
        </div>
    );
}
