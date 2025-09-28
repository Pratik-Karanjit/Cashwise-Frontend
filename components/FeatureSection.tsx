import Image from 'next/image'
import React from 'react'

export default function FeatureSection() {
    return (
        <div className='bg-[#f2f2f2] h-[100vh] flex justify-center items-start pt-20'>
            <div className='flex flex-col gap-14'>
                <p className='text-primary text-4xl'>
                    <span className='text-secondary text-4xl'>
                        Cashwise
                    </span> Features
                </p>

                <div className='flex flex-row gap-14 items-center justify-center'>
                    <div className='flex items-start justify-center rounded-md shadow-lg border-t-4 border-secondary'>
                        <div className='flex flex-col px-10 py-7 bg-white'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Solve complex bill splits</p>
                                <p className='text-primary'>Easily split complex bills just enter the <br /> numbers and let Cashwise <br /> do the rest!</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/handshake-transaction.svg" alt='handshake' width={80} height={80} />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-14'>
                        <div className='flex flex-col px-10 py-7 bg-white items-end justify-center rounded-md shadow-lg border-t-4 border-primary'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Manage balances easily</p>
                                <p className='text-primary'>Instantly see who owes and who gets <br /> paid, with clear and simple<br /> balance tracking.</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/images/balance.png" alt='handshake' width={70} height={70} />
                            </div>
                        </div>

                        <div className='flex flex-col px-10 py-7 bg-white items-end justify-center rounded-md shadow-lg border-t-4 border-orange-500'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Settlements card</p>
                                <p className='text-primary'>Quickly find settlements in a clear list <br /> that makes paying back and <br /> splitting bills effortless.</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/images/solveMoney.png" alt='handshake' width={60} height={60} />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-start justify-center rounded-md shadow-lg border-t-4 border-teal-400'>
                        <div className='flex flex-col px-10 py-7 bg-white'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Save your expenses</p>
                                <p className='text-primary'>Save your calculated expenses for <br /> future reference and access <br /> them anytime.</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/images/monetary.png" alt='handshake' width={70} height={70} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
