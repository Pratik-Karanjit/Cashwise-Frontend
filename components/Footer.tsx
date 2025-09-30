import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <div className='w-full flex flex-row items-center justify-around bg-primary'>
            <Image src="/images/Cashwise.png" alt='Cashwise Logo' width={300} height={300} className='object-contain h-32 md:h-40' />
            <p className='font-mono text-white hidden sm:flex md:text-xl'>Developed by: Pratik Karanjit</p>
        </div>
    )
}
