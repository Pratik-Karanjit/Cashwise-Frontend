import React from 'react'
import Button from '../../components/Button'
import Link from 'next/link'

export default function SignIn() {
    return (
        <div className='flex flex-col items-center justify-center border border-[#ebe6e7] mt-24 w-fit mx-auto rounded-xl p-7'>
            <div className='flex flex-col gap-7 items-end'>
                <h1 className='font-semibold text-2xl font-primary mx-auto tracking-wide'>Login To Your Account</h1>
                <form className='w-full flex flex-col gap-8'>

                    <div className='flex flex-col gap-1'>
                        <label className=''>Email <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            placeholder="Enter your email address"
                            className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className=''>Password <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            placeholder="Password"
                            className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                        />
                    </div>
                </form>
                <div className='w-full flex flex-col items-center justify-center gap-5'>
                    <Button text='Submit' hasArrow={false} />
                    <p className='text-primary text-sm'>
                        Don't have an account? &nbsp;
                        <Link href='/signUp'>
                            <span className='text-secondary cursor-pointer'>Sign Up</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
