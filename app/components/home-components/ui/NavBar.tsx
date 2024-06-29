import LanguageDropdown from "@/app/components/ui/LanguageDropdown";
import React, {useEffect, useState} from "react";
import {useIsErrorContext, useIsOpenContext, useTranslationContext} from "@/app/[lng]/hooks";
import "../../../globals.css";
import Link from 'next/link';
import {logoutInFun} from "@/app/components/dashboard-components/ui/drop-profile-items/action";
import {useRouter} from "next/navigation";
import {checkTokenInFun} from "@/app/components/ui/signin/action";


const Navbar: React.FC = () => {
    const [showBackground, setShowBackground] = useState(false);
    const {translation} = useTranslationContext();
    const {isOpen, setIsOpen} = useIsOpenContext();
    const [isFirstConnection, setIsFirstConnection] = useState(false);
    const pages: string[] = [translation?.t('nav_home')];
    const TOP_OFFSET = 100;
    const router = useRouter()
    const {setError} = useIsErrorContext();
    const toggleNavbar = (): void => {
        setIsOpen(!isOpen);
    };

    async function handleLoginPage() {
        router.push("/owner-connection")
        setIsOpen(false)
    }

    async function handleModificationReservationPage() {
        router.push("/modification-reservation")
        setIsOpen(false)
    }

    async function handleLogout() {
        await logoutInFun().then(
            async (response) => {
                if (response.errors) {
                    setError(response.errors)
                } else {
                    router.replace("/")
                }
                setIsOpen(false)
            }
        )
    }

    const closeNavbar = (): void => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (window.location.pathname.includes("/first-connection")) {
            setIsFirstConnection(true);
        } else {
            setIsFirstConnection(false);
        }
        const handleScroll = () => {
            if (window.scrollY > TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll, true);
        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsOpen(!e.matches);
        };
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };

    }, [setIsOpen]);

    return (
        <div>
            <div style={{
                backgroundColor: showBackground ? "white" : "",
                transition: !isOpen && showBackground ? "background-color 0.5s" : ""
            }}
                 className={isOpen ? "m-auto p-3 flex justify-between items-center z-30 fixed w-full top-0 bg-white lg:bg-transparent lg:transform lg:transition lg:duration-500"
                     : " m-auto p-3 flex justify-between items-center z-30 fixed w-full top-0 lg:transform lg:transition lg:duration-500"}>
                <Link href="/">
                    <div className="flex cursor-pointer top-14 ml-7 z-30 absolute">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="h-8 w-auto" src="/logo-contour.png" alt="logo"/>
                    </div>
                </Link>
                <nav className={isOpen ? "flex " : "hidden lg:flex"}>

                    <ul className={isOpen ? "flex  absolute lg:relative flex-col lg:flex-row w-full  bg-white lg:bg-transparent lg:shadow-none text-center left-0 top-20 lg:top-0 lg:mr-10" : "flex  absolute lg:relative flex-col lg:flex-row w-full shadow lg:shadow-none text-center mr-10"}>

                        {pages.map((page, index) => (
                            <li key={index}
                                style={{color: (showBackground) ? "black" : ""}}
                                onClick={closeNavbar}
                                className={isOpen ? "px-8 py-7  cursor-pointer rounded font-semibold   lg:text-white text-black"
                                    : "px-8 py-7 cursor-pointer rounded font-semibold   text-white "}>
                                <Link className="p-2 rounded " href="/">
                                    <div className="hover:scale-110   ">{page}</div>
                                </Link>
                            </li>
                        ))}

                        <div style={{color: (showBackground) ? "black" : ""}}
                             className={isOpen ? "mt-5 lg:mt-11 lg:ml-9 lg:text-white text-black" : "mt-11  ml-10 text-white"}>
                            <LanguageDropdown
                                isOpen={isOpen}
                                showBackground={showBackground}
                            />
                        </div>
                        <div className={isOpen ? "w-full  lg:ml-20" : "ml-20 w-full "}>
                            <button
                                style={{
                                    borderColor: showBackground ? "black" : "",
                                    color: showBackground ? "black" : ""
                                }}
                                onClick={handleModificationReservationPage}
                                className={isOpen ? "bg-transparent font-semibold border border-black rounded h-10 mt-11 px-6 my-2 lg:text-white text-black lg:border-white text-nowrap"
                                    : "bg-transparent font-semibold border border-white rounded h-10 mt-11 px-6 my-2 text-white text-nowrap"}>
                                <div className="flex">
                                    <span>{translation?.t('btn_modification_reservation')}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor"
                                         className="w-5 h-6 ml-2 mt-0.5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                        <div className={isOpen ? "w-full mb-5 lg:mb-0 lg:ml-20" : "ml-20 w-full "}>
                            {isFirstConnection ? (
                                <button
                                    style={{
                                        borderColor: showBackground ? "black" : "",
                                        color: showBackground ? "black" : ""
                                    }}
                                    onClick={handleLogout}
                                    className={isOpen ? "bg-transparent font-semibold border border-black rounded h-10 mt-11 px-6 my-2 lg:text-white text-black lg:border-white "
                                        : "bg-transparent font-semibold border border-white rounded h-10 mt-11 px-6 my-2 text-white"}>
                                    <div className="flex">
                                        <span>{translation?.t('btn_owner_log_out')}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-6 ml-2 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                        </svg>
                                    </div>
                                </button>
                            ) : (
                                <button
                                    style={{
                                        borderColor: showBackground ? "black" : "",
                                        color: showBackground ? "black" : ""
                                    }}
                                    onClick={handleLoginPage}
                                    className={isOpen ? "bg-transparent font-semibold border border-black rounded h-10 mt-11 px-6 my-2 lg:text-white text-black lg:border-white "
                                        : "bg-transparent font-semibold border border-white rounded h-10 mt-11 px-6 my-2 text-white"}>
                                    <div className="flex">
                                        <span>{translation?.t('btn_owner')}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-6 ml-2 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                        </svg>
                                    </div>
                                </button>
                            )}
                        </div>
                    </ul>
                </nav>
                <div className="lg:hidden py-7 z-30">
                    <button className="flex justify-center items-center mt-5 mr-5" onClick={toggleNavbar}
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
