import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-semibold">
                    <Link to="/">Logo</Link>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleNavbar}
                        className="text-white p-2 focus:outline-none"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <div className={`md:flex md:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
                    <Link to="/signIn" className="flex items-center text-white hover:underline">
                        <FaSignInAlt />
                        <span className="ml-1">Sign In</span>
                    </Link>
                    <Link to="/signup" className="flex items-center text-white hover:underline">
                        <FaUserPlus />
                        <span className="ml-1">Sign Up</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
