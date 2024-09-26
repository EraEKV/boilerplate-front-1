// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-bg fixed w-full border-b shadow-lg">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 text-primary">
                <div className="text-xl font-bold">
                    <Link href="/">MyLogo</Link>
                </div>

                <div className={"flex justify-between items-center gap-x-10"}>
                    <ul className="hidden md:flex space-x-8">
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
                    <Link href="/sign-in">
                        <button
                            className="bg-primary text-white px-4 py-2 hover:bg-secondary rounded-lg transition duration-300 ease-in-out">
                            Sign In
                        </button>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
