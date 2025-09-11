import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import countingCash from "../../public/images/counting.png"

export default function Options() {

    return (
        <div className='w-full flex bg-white h-[90vh]'>
            <div className='w-1/2 flex justify-center items-start pt-44'>
                <div className='flex flex-col gap-5'>

                    <span className="text-primary text-3xl">Choose your split <span className='text-3xl text-secondary'>option!</span></span>
                    <div className="flex flex-col gap-5">
                        <div className="mt-5 flex flex-row items-center justify-start gap-2 group cursor-pointer -ml-7">
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="inline-block -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-secondary"
                            />
                            <Link href='/splitBill'>
                                <p className="text-[#5E6282] text-4xl group-hover:text-secondary transition-all duration-300">
                                    Split Bill
                                </p>
                            </Link>
                        </div>

                        <div className="mt-5 flex flex-row items-center justify-start gap-2 group cursor-pointer -ml-7">
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="inline-block -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-secondary"
                            />
                            <Link href='/groupExpenses'>
                                <p className="text-[#5E6282] text-4xl group-hover:text-secondary transition-all duration-300">
                                    Group Expenses
                                </p>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
            <div className='w-1/2 flex justify-center items-start pt-44'>
                <Image
                    src={countingCash}
                    alt='Counting cash'
                    width={420}
                    height={420}
                />
            </div>
        </div >
    )
}
