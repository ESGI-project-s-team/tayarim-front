import React from "react"
import {Menu, Transition} from "@headlessui/react"
import {ChevronDownIcon, LanguageIcon} from "@heroicons/react/20/solid"
import {Fragment} from "react"
import "../globals.css";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

interface CustomStyle extends React.CSSProperties {
    "--tw-ring-color"?: string; // Define the custom property here
}

interface LanguageDropdownProps {
    currentLanguage: string;
    onSelect: (language: string) => void;
    isOpen?: boolean;
    showBackground?: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({currentLanguage, onSelect, showBackground, isOpen}) => {
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
        onSelect(option)
    }

    const options = languageTable[currentLanguage] ? Object.entries(languageTable[currentLanguage]) : [];
    return (
        <div className="">
            <Menu as="div" className="relative inline-block cursor-pointer">
                <div>
                    <Menu.Button
                        style={{"--tw-ring-color": (showBackground) ? "rgb(0 0 0)" : ""} as CustomStyle}
                        className={isOpen ? "inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset lg:ring-white ring-black"
                            : "inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-white"}>
                        {languageTable[currentLanguage]?.[currentLanguage]} {/* Access the translation */}
                        <LanguageIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
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
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                        <div className="py-1">
                            {options.map(option => {
                                const selected = option[0] === currentLanguage
                                const nativeVersion = languageTable[option[0]][option[0]]
                                return (
                                    <Menu.Item key={option[0]}>
                                        {({active}) => (
                                            <div
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-300 text-gray-900"
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
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default LanguageDropdown;
