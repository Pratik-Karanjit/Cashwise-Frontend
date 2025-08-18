import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ButtonProps {
    text: string;
    hasArrow?: boolean;
    fromColor?: string;
    toColor?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({
    text,
    hasArrow = true,
    fromColor = 'from-secondary',
    toColor = 'to-[#3563d9]',
    onClick,
    type = "button"
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`group px-8 cursor-pointer transition h-12 whitespace-nowrap rounded-lg bg-gradient-to-b ${fromColor} ${toColor} text-white shadow-button hover:from-[#3563d9] hover:to-secondary w-max`}
        >
            <p className="text-[0.8125rem] md:text-[0.875rem] leading-[1.21875] md:leading-[1.25rem] font-medium text-inherit flex items-center gap-2 drop-shadow-sm">
                {text}
                {hasArrow && (
                    <FontAwesomeIcon
                        className="h-4 w-3 transition-transform duration-300 group-hover:translate-x-2"
                        icon={faArrowRight}
                    />
                )}
            </p>
        </button>
    );
}
