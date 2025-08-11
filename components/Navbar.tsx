import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-around w-full bg-primary h-[10vh]'>
            <Image src="/images/Cashwise.png" width={150} height={150} alt='cashwise logo' />
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
            <Button />
            {/* <button className='text-white border'>Hello</button> */}
        </nav>
    )
}
