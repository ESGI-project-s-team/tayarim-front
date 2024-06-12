import {Listbox, ListboxOption, ListboxOptions, Transition} from '@headlessui/react';
import {Fragment, useState, useEffect} from 'react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid';
import {useTranslationContext} from "@/app/[lng]/hooks";

interface MultiSelectListboxProps {
    items: any[];
    selectedItems: any[];
    setSelected: any;
}

const MultiSelectListboxUpdate = ({items, setSelected, selectedItems}: MultiSelectListboxProps) => {
    const {translation} = useTranslationContext();

    const handleSelectionChange = (newSelected: any[]) => {
        // Update the state with the new array of selected items
        setSelected(newSelected);
    };

    const getSelectedNames = () => {
        if (selectedItems.length === 0) return translation?.t('select_placeholder_form');
        return selectedItems.map((item) => translation?.t(item.nom)).join(', ');
    }

    return (
        <Listbox
            value={items.filter((item) => selectedItems.some((selectedItem) => selectedItem.nom === item.nom))}
            onChange={(newSelected: any[]) => handleSelectionChange(newSelected)}
            multiple
        >
            <div className="relative mt-1">
                <Listbox.Button
                    className="w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition text-sm text-left"
                >
                    <span className="block truncate">{getSelectedNames()}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm
                        z-30"
                    >
                        {items.map((item, itemIdx) => (
                            <Listbox.Option
                                defaultValue={selectedItems}
                                key={itemIdx}
                                className={({focus}) =>
                                    `cursor-pointer relative select-none py-2 pl-10 pr-4 mb-2 ${focus ? 'bg-[#f1f5f9]' : 'text-gray-900'}`
                                }
                                value={item}
                            >

                                {({selected}) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {item.nom}
                                        </span>
                                        {selected ? (
                                            <span
                                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#3c50e0]">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default MultiSelectListboxUpdate;
