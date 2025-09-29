import Image from 'next/image'
import React from 'react'

export default function FeatureSection() {
    return (
        <div className='bg-[#f2f2f2] min-h-[100vh] flex justify-center items-start pt-10 md:pt-20 px-4'>
            <div className='flex flex-col gap-8 md:gap-14 max-w-6xl w-full mb-20'>
                <p className='text-primary text-2xl md:text-3xl lg:text-4xl text-center'>
                    <span className='text-secondary text-2xl md:text-3xl lg:text-4xl'>
                        Cashwise
                    </span> Features
                </p>

                <div className='flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-14 items-center justify-center w-full'>
                    {/* First card - centered */}
                    <div className='flex items-start justify-center rounded-md shadow-lg border-t-4 border-secondary w-full xl:w-auto'>
                        <div className='flex flex-col px-6 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7 bg-white min-h-[200px] justify-between'>
                            <div className='flex flex-col gap-4 md:gap-5 lg:gap-7'>
                                <p className='text-primary font-semibold text-lg md:text-xl'>Solve complex bill splits</p>
                                <p className='text-primary text-sm md:text-base'>Easily split complex bills just enter the numbers and let Cashwise do the rest!</p>
                            </div>
                            <div className='flex items-end justify-end -mt-3 md:-mt-4 lg:-mt-5'>
                                <Image
                                    src="/handshake-transaction.svg"
                                    alt='handshake'
                                    width={80}
                                    height={80}
                                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Middle section - 2 stacked cards */}
                    <div className='flex flex-col gap-8 md:gap-10 lg:gap-14 w-full xl:w-auto'>
                        <div className='flex flex-col px-6 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7 bg-white items-end justify-center rounded-md shadow-lg border-t-4 border-primary min-h-[200px]'>
                            <div className='flex flex-col gap-4 md:gap-5 lg:gap-7 w-full justify-between h-full'>
                                <div>
                                    <p className='text-primary font-semibold text-lg md:text-xl'>Manage balances easily</p>
                                    <p className='text-primary text-sm md:text-base mt-4 md:mt-5 lg:mt-7'>Instantly see who owes and who gets paid, with clear and simple balance tracking.</p>
                                </div>
                                <div className='flex items-end justify-end -mt-3 md:-mt-4 lg:-mt-5'>
                                    <Image
                                        src="/images/balance.png"
                                        alt='balance'
                                        width={70}
                                        height={70}
                                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col px-6 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7 bg-white items-end justify-center rounded-md shadow-lg border-t-4 border-orange-500 min-h-[200px]'>
                            <div className='flex flex-col gap-4 md:gap-5 lg:gap-7 w-full justify-between h-full'>
                                <div>
                                    <p className='text-primary font-semibold text-lg md:text-xl'>Settlements card</p>
                                    <p className='text-primary text-sm md:text-base mt-4 md:mt-5 lg:mt-7'>Quickly find settlements in a clear list that makes paying back and splitting bills effortless.</p>
                                </div>
                                <div className='flex items-end justify-end -mt-3 md:-mt-4 lg:-mt-5'>
                                    <Image
                                        src="/images/solveMoney.png"
                                        alt='solve money'
                                        width={60}
                                        height={60}
                                        className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Last card - centered */}
                    <div className='flex items-start justify-center rounded-md shadow-lg border-t-4 border-teal-400 w-full xl:w-auto'>
                        <div className='flex flex-col px-6 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7 bg-white min-h-[200px] justify-between'>
                            <div className='flex flex-col gap-4 md:gap-5 lg:gap-7'>
                                <p className='text-primary font-semibold text-lg md:text-xl'>Save your expenses</p>
                                <p className='text-primary text-sm md:text-base'>Save your calculated expenses for future reference and access them anytime.</p>
                            </div>
                            <div className='flex items-end justify-end -mt-3 md:-mt-4 lg:-mt-5'>
                                <Image
                                    src="/images/monetary.png"
                                    alt='monetary'
                                    width={70}
                                    height={70}
                                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}