import React, {Fragment, useEffect, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/16/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface SelectMenusCustomProps {
    value: { id: number, name: string }[];
    valueSelected: { id: number | null, name: string | null };
    placeholder: string;
    icon: React.ReactNode | null;
    onChange: (selected: { id: number | null, name: string }) => void;
}

const SelectMenusCustom: React.FC<SelectMenusCustomProps> = ({
                                                                 valueSelected,
                                                                 value,
                                                                 placeholder,
                                                                 icon,
                                                                 onChange
                                                             }) => {
    const [selected, setSelected] = useState<{ id: number | null, name: string | null }>(valueSelected);

    useEffect(() => {
        setSelected(valueSelected);
    }, [valueSelected]);

    const handleSelection = (value: { id: number, name: string }) => {
        setSelected(value);
        onChange(value);
    };

    const clearSelection = () => {
        setSelected({id: null, name: null});
        onChange({id: null, name: ""});
    };

    return (
        <Listbox value={selected} onChange={handleSelection}>
            {({open}) => (
                <>
                    <div className="relative rounded border border-gray-400">
                        <Listbox.Button
                            className="cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left text-black focus:outline-none text-sm w-60">
                            <span className="flex items-center">
                                {icon}
                                <span className={selected?.name ? "ml-3 truncate" : "ml-3 truncate text-gray-400"}>
                                    {selected?.name ? selected?.name : placeholder}
                                </span>
                            </span>
                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </span>
                        </Listbox.Button>
                        {selected?.name && (
                            <button
                                className="absolute top-1/2 right-9 transform -translate-y-1/2 focus:outline-none"
                                onClick={clearSelection}
                                tabIndex={0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor"
                                     className="h-5 w-5 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        )}
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 w-full overflow-auto rounded bg-white py-1 sm:text-sm">
                                {value.map((person: any) => (
                                    <Listbox.Option
                                        key={person.id}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-gray-200' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={person}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block')}>
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
};

export default SelectMenusCustom;
