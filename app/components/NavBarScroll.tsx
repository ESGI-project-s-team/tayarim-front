import React from "react";
import "../globals.css";

const NavbarScroll: React.FC = () => {
    const items: string[] = ["Home", "Our Services", "About us", "FAQ"];
    return (
        <div className="w-full bg-custom-scroll z-10 fixed top-32 bg-custom-scroll-opacity">
            <ul className="flex justify-around whitespace-nowrap">
                {items.map((item, index) => (
                    <li key={index}
                        className="py-5 cursor-pointer rounded font-normal text-sm">
                        <a className="rounded">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default NavbarScroll;
/*export default NavbarScroll;
import React from "react";
import "../globals.css";

const NavbarScroll: React.FC = () => {
    const items: string[] = ["Home", "Our Services", "About us", "FAQ"];
    return (
        <div className="w-full bg-custom-scroll fixed top-32">
            <div className="bg-custom-scroll-opacity">
                <ul className="flex justify-around whitespace-nowrap">
                    {items.map((item, index) => (
                        <li key={index}
                            className="py-5 cursor-pointer rounded font-normal text-sm text-white hover:underline">
                            <a>{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

*/
