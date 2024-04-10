import React, {useState} from 'react';
import {Transition} from '@headlessui/react';

const SideNavDashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative bg-gray-800 h-screen w-64">
            {/* Burger Menu */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-5 right-5 lg:hidden text-white focus:outline-none"
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>

            {/* Side Nav Content */}
            <Transition
                show={isOpen}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="absolute top-0 left-0 bg-gray-800 h-screen w-64 lg:static lg:h-auto lg:w-auto">
                    <div className="p-5">
                        {/* Your Side Nav Content Here */}
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-white hover:text-gray-300">
                                    Link 1
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-gray-300">
                                    Link 2
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-gray-300">
                                    Link 3
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default SideNavDashboard;
