import React from "react"
import {Menu, Transition} from "@headlessui/react"
import {ChevronDownIcon, LanguageIcon} from "@heroicons/react/20/solid"
import {Fragment} from "react"
import "../../globals.css";
import {usePathname} from "next/navigation";
import {useNavbarContext} from "@/app/[lng]/hooks";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

interface CustomStyle extends React.CSSProperties {
    "--tw-ring-color"?: string; // Define the custom property here
}

interface LanguageDropdownProps {
    isOpen?: boolean;
    showBackground?: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
                                                               showBackground, isOpen
                                                           }) => {
    const pathname = usePathname();
    const {theLanguage, setTheLanguage} = useNavbarContext();

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

    const languageTable: any = {
        en: {
            en: "English",
            fr: "French",
        },
        fr: {
            en: "Anglais",
            fr: "Français",
        },
    }

    const handleOptionSelect = (option: string) => {
        onLanguageSelected(option)
    }

    const options = languageTable[theLanguage] ? Object.entries(languageTable[theLanguage]) : [];
    return (
        <div>
            <Menu as="div" className="relative inline-block cursor-pointer">
                <div>
                    <Menu.Button
                        style={{"--tw-ring-color": (showBackground) ? "rgb(0 0 0)" : ""} as CustomStyle}
                        className={isOpen ? "inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold ring-1 ring-inset lg:ring-white ring-black"
                            : "inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-white sm:ml-0 ml-5"}>

                        <div className={isOpen ? "" : "sm:inline-flex hidden"}>
                            {languageTable[theLanguage]?.[theLanguage]} {/* Access the translation */}
                        </div>
                        <div>
                            <LanguageIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                        <div>
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className={`z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ml-5 sm:ml-0 ${isOpen ? "" : "sm:absolute fixed sm:right-0 "}`}
                    >
                        <div className={isOpen ? "" : "sm:right-0"}>
                            <div className="py-1  ">
                                {options.map(option => {
                                    const selected = option[0] === theLanguage
                                    const nativeVersion = languageTable[option[0]][option[0]]
                                    return (
                                        <Menu.Item key={option[0]}>
                                            {({active}) => (
                                                <div
                                                    className={classNames(
                                                        active
                                                            ? "bg-[#f1f5f9] text-gray-900"
                                                            : "text-gray-700",
                                                        selected ? "font-bold" : "font-normal",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                    onClick={() => handleOptionSelect(option[0])}
                                                >
                                                    {option[1]} ({nativeVersion})
                                                </div>
                                            )}
                                        </Menu.Item>
                                    )
                                })}
                            </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default LanguageDropdown;
