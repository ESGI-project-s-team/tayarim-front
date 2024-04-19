import React, {useEffect, useState} from 'react';
import {useTranslationContext} from "@/app/[lng]/hooks";
import {getIconManagement, getIconMenu, getIconOthers} from "@/app/icon-export";

const SideNavDashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const {translation} = useTranslationContext();
    const menu_sidenav = translation?.t('menu_sidenav', {returnObjects: true}) ?? [];
    const management_sidenav = translation?.t('management_sidenav', {returnObjects: true}) ?? [];
    const others_sidenav = translation?.t('others_sidenav', {returnObjects: true}) ?? [];
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)"); // Change la taille en fonction de vos besoins
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsOpen(!e.matches); // Inverse isOpen si la condition est vraie (taille de l'écran <= 640px)
        };
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        setIsOpen(!mediaQuery.matches);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);


    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div style={{scrollbarWidth: "none"}}
             className={`absolute w-72 overflow-scroll inset-y-0 left-0 transition-all duration-300 ease-in-out bg-[#1c2434] ${
                 isOpen ? '' : '-translate-x-60'
             }`}
        >
            <div className=" fixed w-72 z-10 flex pt-10 pb-7 bg-[#1c2434] justify-around ">
                <div className="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-8 w-auto justify-center" src="/logo-contour.png" alt="logo"/>
                </div>
                <div className={`mt-1 cursor-pointer ${
                    isOpen ? '' : 'transform rotate-180 ml-10'
                }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6 text-[#dee4ee]" onClick={toggleOpen}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </div>
            </div>
            <div className="bg-[#1c2434]  overflow-scroll mt-24" style={{height: "auto"}}>
                <nav className="mt-9 px-6 text-[#dee4ee] ">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8a99af]">{translation?.t('menu_placeholder')}</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {menu_sidenav.map((page: string, index: number) => (
                                <li key={index}><a
                                    className=" relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-[#2b334a]"
                                    href="">
                                    {getIconMenu(index)}
                                    {page}
                                </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/*TODO - ONLY ADMIN*/}
                    <div><h3
                        className="mb-4 ml-4 text-sm font-semibold text-[#8a99af]">{translation?.t('management_placeholder')}</h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {management_sidenav.map((page: string, index: number) => (
                                <li key={index}><a
                                    className=" relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-[#2b334a]"
                                    href="">
                                    {getIconManagement(index)}
                                    {page}
                                </a>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div><h3
                        className="mb-4 ml-4 text-sm font-semibold text-[#8a99af]">{translation?.t('others_placeholder')}</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {others_sidenav.map((page: string, index: number) => (
                                <li key={index}><a
                                    className=" relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-[#2b334a]"
                                    href="">
                                    {getIconOthers(index)}
                                    {page}
                                </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </nav>
            </div>
        </div>
    );
};

export default SideNavDashboard;
