import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface ButtonProps {
    text: string
    bgColor?: string
    textColor?: string
    hoverColor?: 'primary' | 'secondary' | 'purple'
}

const hoverClasses = {
    primary: 'hover:bg-primary',
    secondary: 'hover:bg-secondary',
    purple: 'hover:bg-[#2035d4]'
}

export default function Button({ text, bgColor = 'bg-secondary', textColor = 'text-white', hoverColor = 'primary' }: ButtonProps) {
    return (
        <button className={`group flex flex-row justify-center items-center ${bgColor} ${textColor} px-9 py-3 gap-2 w-max rounded-md font-medium drop-shadow-2xl cursor-pointer transition-all duration-300 ${hoverClasses[hoverColor]}`}>
            {text}
            <FontAwesomeIcon
                className='h-4 w-3 transition-transform duration-300 group-hover:translate-x-2'
                icon={faArrowRight}
            />
        </button>
    )
}