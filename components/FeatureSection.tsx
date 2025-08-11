import Image from 'next/image'
import React from 'react'

export default function FeatureSection() {
    return (
        <div className='bg-[#FFEEFE] h-[90vh] flex justify-center items-start pt-20'>
            <div className='flex flex-col gap-14'>
                <p className='text-primary text-4xl'>
                    <span className='text-secondary text-4xl'>
                        Cashwise
                    </span> features
                </p>

                <div className='flex flex-row gap-14 items-center justify-center'>
                    <div className='flex items-start justify-center rounded-md shadow-lg border-t-4 border-secondary'>
                        <div className='flex flex-col px-10 py-7'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Solve complex bill splits</p>
                                <p className='text-primary'>Simply write down the <br /> numbers and calculate <br /> the split!</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/handshake-transaction.svg" alt='handshake' width={80} height={80} />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-14'>
                        <div className='flex flex-col px-10 py-7 items-end justify-center rounded-md shadow-lg border-t-4 border-primary'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Solve complex bill splits</p>
                                <p className='text-primary'>Simply write down the <br /> numbers and calculate <br /> the split!</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/handshake-transaction.svg" alt='handshake' width={80} height={80} />
                            </div>
                        </div>

                        <div className='flex flex-col px-10 py-7 items-end justify-center rounded-md shadow-lg border-t-4 border-orange-500'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Solve complex bill splits</p>
                                <p className='text-primary'>Simply write down the <br /> numbers and calculate <br /> the split!</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/handshake-transaction.svg" alt='handshake' width={80} height={80} />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-start justify-center rounded-md shadow-lg border-t-4 border-teal-400'>
                        <div className='flex flex-col px-10 py-7'>
                            <div className='flex flex-col gap-7'>
                                <p className='text-primary font-semibold text-xl'>Solve complex bill splits</p>
                                <p className='text-primary'>Simply write down the <br /> numbers and calculate <br /> the split!</p>
                            </div>
                            <div className='flex items-end justify-end -mt-5'>
                                <Image src="/handshake-transaction.svg" alt='handshake' width={80} height={80} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
