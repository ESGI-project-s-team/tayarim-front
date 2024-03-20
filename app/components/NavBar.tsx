"use client";
import React, {useState} from "react";


const people: string[] = ["Home", "Properties"];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleNavbar = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container relative m-auto p-2 flex justify-between items-center">
            <div className="flex mt-3 cursor-pointer">
                <img className="h-6 w-auto" src="/white-logo-short.jpg" alt="logo"/>
            </div>
            <nav className={isOpen ? "flex" : "hidden md:flex"}>
                <ul className="flex bg-white absolute md:relative flex-col md:flex-row w-full shadow md:shadow-none text-center top-12 left-0 md:top-0 md:flex">
                    {people.map((person, index) => (
                        <li key={index}
                            className="px-8 py-8 cursor-pointer rounded font-semibold transform transition duration-500 hover:scale-110">
                            <a className=" p-2 rounded">{person}</a>
                        </li>
                    ))}
                    <div className="px-10 w-full">
                        <button
                            className="bg-transparent font-semibold border border-black rounded h-10 mt-6 px-4 my-5">
                            <span>I am an owner</span>
                        </button>
                    </div>
                </ul>
            </nav>
            <div className="md:hidden">
                <button className="flex justify-center items-center" onClick={toggleNavbar}>
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isOpen ? "hidden" : "flex"}
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isOpen ? "flex" : "hidden"}
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Navbar;