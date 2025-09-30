'use client'

import React from 'react'
import Button from '../../components/Button'
import Link from 'next/link'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string().min(6, "At least 6 characters required.").required("Password is required.")
})

export default function SignIn() {
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            error: ""
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const res = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });
                console.log("response from login", res)

                if (res?.ok) {
                    // Wait a bit for session to update, then redirect
                    setTimeout(() => {
                        router.push("/")
                        router.refresh() // Refresh to update session state
                    }, 100)
                } else {
                    setErrors({
                        error: res?.error || "Login failed",
                    })
                }
            } catch (error) {
                const err = error as any;
                console.log("error is: ", err)
                setErrors({
                    error: err?.response?.data?.message || "Login failed",
                })
            }
            finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className='flex flex-col items-center justify-center border border-[#ebe6e7] mt-24 w-fit mx-auto rounded-xl p-7'>
            <div className='flex flex-col gap-7 items-end'>
                <h1 className='font-semibold text-2xl font-primary mx-auto tracking-wide'>Login To Your Account</h1>
                <form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-8'>
                    {formik.errors.error && (
                        <span className='text-red-500 text-sm'>{formik.errors.error}</span>
                    )}
                    <div className='flex flex-col gap-1'>
                        <label className=''>Email <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your email address"
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className='text-red-500 text-sm'>{formik.errors.email}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className=''>Password <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            placeholder="Password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className='text-red-500 text-sm'>{formik.errors.password}</span>
                        )}
                    </div>
                    <div className='w-full flex flex-col items-center justify-center gap-5'>
                        <Button text={formik.isSubmitting ? 'Submitting...' : 'Submit'} type="submit" hasArrow={false} />
                    </div>
                    {/* <button onClick={() => signIn("google")}>Sign in with Google</button> */}

                </form>
            </div>
        </div>
    )
}
