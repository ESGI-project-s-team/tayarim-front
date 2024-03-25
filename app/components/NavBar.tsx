import LanguageDropdown from "@/app/components/LanguageDropdown";
import {usePathname} from 'next/navigation'
import React from "react";
import {useIsOpenContext, useNavbarContext, useTranslationContext} from "@/app/[lng]/hooks";
import DatePickerRangeCustom from "@/app/components/DatePickerCustom";


const Navbar: React.FC = () => {

    const pathname = usePathname()
    const {theLanguage, setTheLanguage} = useNavbarContext();
    const {translation} = useTranslationContext();
    const {isOpen, setIsOpen} = useIsOpenContext();
    const pages: string[] = [translation?.t('nav_home')];

    function switchLocale(locale: React.SetStateAction<string>) {
        // e.g. '/en/about' or '/fr/contact'
        const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`)
        const newPath = `${newPathname}${window.location.search}${window.location.hash}`
        window.history.replaceState(null, '', newPath)
    }

    const onLanguageSelected = (option: string) => {
        setTheLanguage(option);
        switchLocale(option)
    }

    const toggleNavbar = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div
                className={isOpen ? "m-auto p-3 flex justify-between items-center z-30 fixed w-full top-0 bg-gray-950 lg:bg-transparent" : " m-auto p-3 flex justify-between items-center z-30 fixed w-full top-0"}>
                <div className="flex  cursor-pointer mt-2 z-30">
                    <img className="h-12 w-auto" src="/black-logo-remove-bg.png" alt="logo"/>
                </div>
                <nav className={isOpen ? "flex " : "hidden lg:flex"}>
                    <ul className={isOpen ? "flex  absolute lg:relative flex-col lg:flex-row w-full shadow bg-gray-950 lg:bg-transparent lg:shadow-none text-center left-0 top-20 lg:top-0 lg:mr-10" : "flex  absolute lg:relative flex-col lg:flex-row w-full shadow lg:shadow-none text-center mr-10"}>
                        {pages.map((person, index) => (
                            <li key={index}
                                className="px-8 py-8 mt-5 cursor-pointer rounded font-semibold transform transition duration-500 hover:scale-110 text-white">
                                <a className="p-2 rounded">{person}</a>
                            </li>
                        ))}
                        <div className={isOpen ? "mt-5 lg:mt-11 lg:ml-9" : "mt-11  ml-10"}>
                            <LanguageDropdown
                                onSelect={onLanguageSelected}
                                currentLanguage={theLanguage}
                            />
                        </div>
                        <div className={isOpen ? "w-full mb-5 lg:mb-0 lg:ml-20" : "ml-20 w-full"}>
                            <button
                                className="bg-transparent font-semibold border border-white rounded h-10 mt-11 px-6 my-2 text-white">
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
                            color="white"
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
                            color="white"
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