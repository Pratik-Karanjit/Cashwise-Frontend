interface ButtonProps {
    text: string;
    hasArrow?: boolean;
    fromColor?: string;
    toColor?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({
    text,
    hasArrow = true,
    fromColor = 'from-secondary',
    toColor = 'to-[#3563d9]',
    onClick,
    type = "button",
    disabled = false
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`group px-8 cursor-pointer transition h-12 whitespace-nowrap rounded-lg bg-gradient-to-b ${fromColor} ${toColor} text-white shadow-button hover:from-[#3563d9] hover:to-secondary w-max ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {text}
            {hasArrow && (
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                </span>
            )}
        </button>
    );
}