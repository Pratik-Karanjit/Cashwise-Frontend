import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-center w-full bg-primary h-[8vh]'>
            <ul className='flex w-full items-center justify-center gap-20'>
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
        </nav>
    )
}
