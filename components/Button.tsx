import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Button() {
    return (
        <button className='flex flex-row justify-center items-center bg-secondary text-white px-9 py-3 gap-2 w-max rounded-md font-medium drop-shadow-2xl cursor-pointer mt-5 hover:bg-primary'>
            Start Now <FontAwesomeIcon className='h-4 w-3' icon={faArrowRight} />
        </button>
    )
}
