"use client";
import React, {useEffect, useState} from "react";
import LanguageDropdown from "@/app/components/LanguageDropdown";
import {useTranslation} from "@/app/il8n";


interface NavbarProps {
    lang: string;
}

const Navbar: React.FC<NavbarProps> = (props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [theLanguage, setTheLanguage] = useState("en")
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);

    useEffect(() => {
        async function fetchTranslation() {
            return await useTranslation(props.lang);
        }

        fetchTranslation().then((t) => {
            setTranslation(t);
        });
    }, [props]);

    console.log(translation);
    const pages: string[] = [translation?.t('nav_home'), translation?.t('nav_properties')];

    const onLanguageSelected = (option: React.SetStateAction<string>) => {
        setTheLanguage(option)
    }

    const toggleNavbar = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="m-auto p-3 flex justify-between items-center z-30 fixed w-full top-0 bg-white">
                <div className="flex mt-6 cursor-pointer ml-10">
                    <img className="h-6 w-auto" src="/white-logo-short.jpg" alt="logo"/>
                </div>
                <nav className={isOpen ? "flex" : "hidden lg:flex"}>
                    <ul className={isOpen ? "flex bg-white absolute lg:relative flex-col lg:flex-row w-full shadow lg:shadow-none text-center left-0  top-28" : "flex bg-white absolute lg:relative flex-col lg:flex-row w-full shadow lg:shadow-none text-center mr-10"}>
                        {pages.map((person, index) => (
                            <li key={index}
                                className="px-8 py-8 mt-5 cursor-pointer rounded font-semibold transform transition duration-500 hover:scale-110">
                                <a className="p-2 rounded">{person}</a>
                            </li>
                        ))}
                        <div className={isOpen ? "mt-11" : "mt-11  ml-10"}>
                            <LanguageDropdown
                                onSelect={onLanguageSelected}
                                currentLanguage={theLanguage}
                            />
                        </div>
                        <div className={isOpen ? "w-full" : "ml-20 w-full"}>
                            <button
                                className="bg-transparent font-semibold border border-black rounded h-10 mt-11 px-6 my-2">
                                <div className="flex">
                                    <span>{translation?.t('btn_owner')}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-5 h-6 ml-2 mt-0.5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </ul>
                </nav>
                <div className="lg:hidden py-7 z-30">
                    <button className="flex justify-center items-center mt-6 mr-5" onClick={toggleNavbar}>
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
        </div>
    );
};

export default Navbar;