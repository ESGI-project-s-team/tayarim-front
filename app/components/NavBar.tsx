import LanguageDropdown from "@/app/components/ui/LanguageDropdown";
import {usePathname} from 'next/navigation';
import React, {useEffect, useState} from "react";
import {useIsOpenContext, useNavbarContext, useTranslationContext} from "@/app/[lng]/hooks";
import "../globals.css";


const Navbar: React.FC = () => {

    const pathname = usePathname();
    const {theLanguage, setTheLanguage} = useNavbarContext();
    const [showBackground, setShowBackground] = useState(false);
    const {translation} = useTranslationContext();
    const {isOpen, setIsOpen} = useIsOpenContext();
    const pages: string[] = [translation?.t('nav_home')];
    const TOP_OFFSET = 100;

    function switchLocale(locale: React.SetStateAction<string>) {
        // e.g. '/en/about' or '/fr/contact'
        const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
        const newPath = `${newPathname}${window.location.search}${window.location.hash}`;
        window.history.replaceState(null, '', newPath);
    }

    const onLanguageSelected = (option: string) => {
        setTheLanguage(option);
        switchLocale(option);
    };

    const toggleNavbar = (): void => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollableDiv = document.getElementById('scrollableDiv');
            if (scrollableDiv!.scrollTop > TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, []);

    return (
        <div>
            <div style={{
                backgroundColor: showBackground ? "white" : "",
                transition: !isOpen ? "background-color 0.5s" : ""
            }}
                 className={isOpen ? "m-auto p-3 flex justify-between items-center z-30 fixed w-full top-0 bg-white lg:bg-transparent lg:transform lg:transition lg:duration-500"
                     : " m-auto p-3 flex justify-between items-center z-30 fixed w-full top-0"}>
                <div className="flex  cursor-pointer lg:mt-2 mt-4 ml-7 z-30">
                    <img className="h-8 w-auto" src="/logo-contour.png" alt="logo"/>
                </div>
                <nav className={isOpen ? "flex " : "hidden lg:flex"}>
                    <ul className={isOpen ? "flex  absolute lg:relative flex-col lg:flex-row w-full shadow bg-white lg:bg-transparent lg:shadow-none text-center left-0 top-20 lg:top-0 lg:mr-10" : "flex  absolute lg:relative flex-col lg:flex-row w-full shadow lg:shadow-none text-center mr-10"}>
                        {pages.map((person, index) => (
                            <li key={index}
                                style={{color: (showBackground) ? "black" : ""}}
                                className={isOpen ? "px-8 py-8 mt-5 cursor-pointer rounded font-semibold   hover:scale-110 lg:text-white text-black"
                                    : "px-8 py-8 mt-5 cursor-pointer rounded font-semibold  hover:scale-110 text-white"}>
                                <a className="p-2 rounded">{person}</a>
                            </li>
                        ))}
                        <div style={{color: (showBackground) ? "black" : ""}}
                             className={isOpen ? "mt-5 lg:mt-11 lg:ml-9 lg:text-white text-black" : "mt-11  ml-10 text-white"}>
                            <LanguageDropdown
                                onSelect={onLanguageSelected}
                                currentLanguage={theLanguage}
                                isOpen={isOpen}
                                showBackground={showBackground}
                            />
                        </div>
                        <div className={isOpen ? "w-full mb-5 lg:mb-0 lg:ml-20" : "ml-20 w-full "}>
                            <button
                                style={{
                                    borderColor: showBackground ? "black" : "",
                                    color: showBackground ? "black" : ""
                                }}
                                className={isOpen ? "bg-transparent font-semibold border border-black rounded h-10 mt-11 px-6 my-2 lg:text-white text-black lg:border-white "
                                    : "bg-transparent font-semibold border border-white rounded h-10 mt-11 px-6 my-2 text-white"}>
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
                    <button className="flex justify-center items-center mt-4 mr-5" onClick={toggleNavbar}
                            style={{color: (showBackground) ? "black" : "white"}}>
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
                            color="black"
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
