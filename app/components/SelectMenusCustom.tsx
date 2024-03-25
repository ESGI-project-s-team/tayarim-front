import React, {Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/16/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface SelectMenusCustomProps {
    value: { id: number, name: string }[];
    placeholder: string;
    icon: React.ReactNode | null;
}

const SelectMenusCustom: React.FC<SelectMenusCustomProps> = ({
                                                                 value,
                                                                 placeholder,
                                                                 icon
                                                             }: SelectMenusCustomProps) => {

    const [selected, setSelected] = useState({id: null, name: null});

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({open}) => (
                <>
                    <div className="relative">
                        <Listbox.Button
                            className="cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left
                            text-black focus:outline-none text-sm w-60">
                             <span className="flex items-center">
                                {icon}
                                 <span
                                     className = {selected.name ? "ml-3 truncate":"ml-3 truncate text-gray-400" }>{selected.name ? selected.name : placeholder}</span>
                             </span>
                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400"
                                               aria-hidden="true"/>
                            </span>
                        </Listbox.Button>
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 w-full overflow-auto rounded bg-white py-1  sm:text-sm">
                                {value.map((person: any) => (
                                    <Listbox.Option
                                        key={person.id}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-gray-300' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={person}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <div className="flex items-center ">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block ')}>
                                                    {person.name}
                                                    </span>
                                                </div>
                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                    <CheckIcon className="h-5 w-5 text-black" aria-hidden="true"/>
                                                </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
export default SelectMenusCustom;
