import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-around bg-primary h-[10vh] fixed top-0 right-0 left-0 z-50'>
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
                <Button text='Sign In' hoverColor='purple' />
                <Button text='Sign Up' hoverColor='purple' />
            </div>
        </nav>
    )
}
