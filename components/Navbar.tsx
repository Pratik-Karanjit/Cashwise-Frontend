"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import Button from './Button'
import { useSession, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { ExtendedUser } from '../types/types'

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { data: session, status } = useSession()
    const dropdownRef = useRef<HTMLDivElement>(null)

    console.log("session data: ", session)

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        // Add event listener when dropdown is open
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    // Handle escape key to close dropdown
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isDropdownOpen])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    if (status === "loading") {
        return (
            <nav className="flex items-center justify-around bg-primary h-[10vh] fixed right-0 left-0 z-50">
                <div className="flex items-center">
                    <div className="w-[150px] h-8 bg-gray-300 animate-pulse rounded"></div>
                </div>
                <div className="flex gap-20">
                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                </div>
                <div className="flex gap-4">
                    <div className="w-20 h-8 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-20 h-8 bg-gray-300 animate-pulse rounded"></div>
                </div>
            </nav>
        )
    }
    //Needed this because NextAuth does not provide hasExpenses variable. 
    //So I created an interface called ExtendedUser and casted it to user variable which now allows me to type safe the properties as per my needs
    const user = session?.user as ExtendedUser | undefined

    return (
        <nav className='flex items-center justify-around bg-primary h-[10vh] fixed right-0 left-0 z-50'>
            <Link href="/" className="cursor-pointer">
                <Image
                    src="/images/Cashwise.png"
                    width={150}
                    height={150}
                    alt='cashwise logo'
                    className='cursor-pointer'
                />
            </Link>

            <ul className='flex items-center justify-center gap-20'>
                <li>
                    <Link href="/" className="hover:underline text-white transition-all duration-200">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="hover:underline text-white transition-all duration-200">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:underline text-white transition-all duration-200">
                        Contact
                    </Link>
                </li>
            </ul>

            <div className='flex flex-row gap-10 justify-center items-center'>
                {!session ? (
                    <>
                        <Link href='/signUp'>
                            <Button text='Sign Up' />
                        </Link>
                        <Link href='/signIn'>
                            <Button text='Sign In' />
                        </Link>
                    </>
                ) : null}

                {/* Profile Dropdown */}
                {user?.hasExpenses && (
                    <div className='relative' ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className='flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-200 p-2 rounded-md hover:bg-white/10'
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className='text-lg'
                            />
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`text-sm transition-transform duration-100 ${isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className='absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-50'>
                                {/* Arrow pointer */}
                                <div className='absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45'></div>

                                {/* User Info */}
                                <div className='px-4 py-2 border-b border-gray-100'>
                                    <p className='text-sm font-medium text-gray-900'>
                                        {user?.name || user?.email}
                                    </p>
                                </div>

                                {/* Menu Items */}
                                <div className='py-1'>
                                    <Link
                                        href="/myExpenses"
                                        onClick={closeDropdown}
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150'
                                    >
                                        My Expenses
                                    </Link>
                                </div>

                                {/* Divider and Sign Out */}
                                <div className='border-t border-gray-100 py-1'>
                                    <button
                                        onClick={() => {
                                            closeDropdown()
                                            signOut()
                                        }}
                                        className='block w-full text-left px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}