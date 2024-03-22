import "../globals.css";

import React from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";


const NavbarScroll: React.FC = () => {
    const {translation} = useTranslationContext();

    const items: string[] = [translation?.t('nav_services'), translation?.t('nav_about'), translation?.t('nav_faq')];
    return (
        <div className="w-full bg-custom-scroll z-10 fixed top-32 bg-custom-scroll-opacity">
            <ul className="flex justify-around whitespace-nowrap">
                {items.map((item, index) => (
                    <li key={index}
                        className="py-5 cursor-pointer rounded font-normal ">
                        <a className="rounded">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default NavbarScroll;

