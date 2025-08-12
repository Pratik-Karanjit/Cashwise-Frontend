'use client'

import React from 'react'
import Button from '../../components/Button'
import Link from 'next/link'
import { signIn, signOut } from "next-auth/react"

export default function SignUp() {
    return (
        <div className='flex flex-col items-center justify-center border border-[#ebe6e7] mt-24 w-fit mx-auto rounded-xl p-7'>
            <div className='flex flex-col gap-8 items-end'>
                <h1 className='font-semibold text-2xl font-primary mx-auto tracking-wide'>Create Your Account</h1>
                <form className='flex'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-row gap-6'>
                            <div className='flex flex-col gap-1'>
                                <label>First Name <span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Last Name <span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label>Email <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter your email address"
                                className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                            />
                        </div>

                        <div className='flex flex-row gap-6'>
                            <div className='flex flex-col gap-1'>
                                <label>Password <span className='text-red-500'>*</span></label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Confirm Password <span className='text-red-500'>*</span></label>
                                <input
                                    type="password"
                                    placeholder="Enter password again"
                                    className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />
                            </div>
                        </div>
                    </div>
                </form>

                <div className='flex flex-col justify-center items-center w-full gap-5'>
                    <Button text='Submit' hasArrow={false} />
                    <p className='text-primary text-sm'>
                        Already have an account? &nbsp;
                        <Link href='/signIn'>
                            <span className='text-secondary cursor-pointer'>Sign In</span>
                        </Link>
                    </p>
                </div>

                <div className="w-full py-5 flex items-center relative">
                    <div className='h-px bg-[#E4E1E1] w-full'></div>
                    <span className='absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2'>Or</span>
                </div>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/signIn" })}
                    className="w-full px-5 py-2 rounded-xl text-black border border-[#A39999] transition mx-auto"
                >
                    Google
                </button>
                {/* <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="mt-6 px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                    Sign Out
                </button> */}
            </div>
        </div>
    )
}
