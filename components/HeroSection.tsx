"use client"

import { faArrowRight, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import countingCash from "../public/images/counting.png"
import Button from './Button'

export default function HeroSection() {
    return (
        <div className='w-full flex bg-white h-[90vh]'>
            <div className='w-1/2 flex justify-center items-center pl-32'>
                <div className='flex flex-col gap-5'>
                    <div className='px-4 py-2 w-max rounded-full bg-[#E5EDFF] flex flex-row justify-center items-center gap-3'>
                        <FontAwesomeIcon icon={faMoneyBill1Wave} className='h-6 w-6 text-secondary' />
                        <p className='text-[#4F7DF3] text-sm'>
                            Explore our features!
                        </p>
                    </div>
                    <div>
                        <span className="text-primary text-5xl">Count & pay</span>
                        <span className="text-secondary text-5xl"> responsibly</span>
                        <p className='text-primary text-5xl mt-3'>By using <span className='text-6xl text-secondary'>Cashwise!</span></p>
                    </div>
                    <div className='mt-5'>
                        <p className='text-[#5E6282]'>
                            With the help of Cashwise, you can monitor,
                            count any cash interaction,  <br /> and have a
                            customized dashboard to track your expenses!
                            Stay on top <br /> of your finances, gain valuable insights into your spending habits, and <br /> make smarter financial decisions.
                        </p>
                    </div>

                    <Button text='Start Now' hasArrow={true} />
                </div>

            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <Image
                    src={countingCash}
                    alt='Counting cash'
                    width={420}
                    height={420}
                />
            </div>
        </div>
    )
}
