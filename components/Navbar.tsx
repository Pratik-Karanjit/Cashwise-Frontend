"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
    const { data: session, status } = useSession();
    console.log("session data: ", session)

    if (status === "loading") {
        // Show nothing or a skeleton while session is being fetched
        return (
            <nav className="flex items-center justify-around bg-primary h-[10vh] fixed right-0 left-0 z-50">
                <p className="text-white">Loading...</p>
            </nav>
        );
    }

    return (
        <nav className='flex items-center justify-around bg-primary h-[10vh] fixed right-0 left-0 z-50'>
            <Link href="/" className="cursor-pointer">
                <Image src="/images/Cashwise.png" width={150} height={150} alt='cashwise logo' className='cursor-pointer' />
            </Link>
            <ul className='flex items-center justify-center gap-20'>
                <li>
                    <Link href="/" className="hover:underline text-white">Home</Link>
                </li>
                <li>
                    <Link href="/about" className="hover:underline text-white">About</Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:underline text-white">Contact</Link>
                </li>
            </ul>
            <div className='flex flex-row gap-5'>
                {!session ? (
                    <>
                        <Link href='/signUp'>
                            <Button text='Sign Up' />
                        </Link>
                        <Link href='/signIn'>
                            <Button text='Sign In' />
                        </Link>
                    </>
                ) : (
                    <div className='flex items-center justify-center flex-row gap-5'>
                        {/* <p className="text-white">Hello, {session.user?.email}</p> */}
                        <Button text='Logout' onClick={() => signOut()} />

                    </div>
                )}
            </div>
        </nav>
    )
}