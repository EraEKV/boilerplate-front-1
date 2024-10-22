"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../shared/ui/button';

const Navbar = () => {
    const hiddenPaths = ["/sign-in", "/sign-up", "/chat"];
    const path = usePathname();
    const isHiding = hiddenPaths.some((el) => path === el);

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
        window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    
    return (
        !isHiding && (
            <nav className="bg-bg fixed w-full border-b shadow-lg">
                <div className={`mx-auto flex justify-between items-center px-6 text-primary z-50 transition-all duration-300 ease-in-out
                    ${isScrolled ? "py-3" : "py-5"}`}>
                    <div className="text-xl font-bold">
                        <Link href="/">MyLogo</Link>
                    </div>

                    <div className={`flex justify-between items-center gap-x-10 ${isScrolled ? "text-base" : "text-lg"}`}>
                        <ul className={`hidden md:flex space-x-8`}>
                            <li>
                                <Link href="/homepage" className="text-gray-600 hover:text-gray-900">Home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                            </li>
                            <li>
                                <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                            </li>
                        </ul>
                        <Button className='text-base'>
                            <Link href="/sign-up">
                                Sign up
                            </Link>
                        </Button>
                    </div>

                </div>
            </nav>
        )
    );
};

export default Navbar;
