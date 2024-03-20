import React from "react";
import "../globals.css";

const NavbarScroll: React.FC = () => {
    const items: string[] = ["Home", "Our Services", "About us", "FAQ"];
    return (
        <div className="w-full bg-custom-scroll opacity-45 z-10 fixed top-32">
            <ul className="flex justify-around whitespace-nowrap">
                {items.map((item, index) => (
                    <li key={index}
                        className="py-5 cursor-pointer rounded font-normal text-sm text-white hover:underline">
                        <a className="rounded">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavbarScroll;
