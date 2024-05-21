import {Listbox, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid';

// Define the type for a Person
interface Person {
    name: string;
}

// Sample data for the Listbox
const house: Person[] = [
    {name: 'John Doe'},
    {name: 'Jane Doe'},
    {name: 'Steve Smith'},
    {name: 'Emily Johnson'},
    {name: 'John Doe'},
    {name: 'Jane Doe'},
    {name: 'Steve Smith'},
    {name: 'Emily Johnson'},
    {name: 'John Doe'},
    {name: 'Jane Doe'},
    {name: 'Steve Smith'},
    {name: 'Emily Johnson'},
];

const MultiSelectListbox = () => {
    const [selected, setSelected] = useState<Person[]>([]);

    const handleSelectionChange = (newSelected: Person[]) => {
        // Update the state with the new array of selected house
        setSelected(newSelected);
    };

    const getSelectedNames = () => {
        if (selected.length === 0) return 'Select values...';
        return selected.map((person) => person.name).join(', ');
    };

    return (
        <Listbox
            value={selected} // This should be an array of Person for multi-select
            onChange={(newSelected: Person[]) => handleSelectionChange(newSelected)} // onChange receives an array of Person
            multiple // Indicates multi-selection mode
        >
            <div className="relative mt-1">
                <Listbox.Button
                    className="w-full rounded border-[1.5px] border-[#dee4ee]  bg-transparent px-5 py-3 text-black outline-none transition text-sm text-left"
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
                        className="absolute mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm "
                    >
                        {house.map((person, personIdx) => (
                            <Listbox.Option
                                key={personIdx}
                                className={({active}) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 mb-2 ${active ? 'bg-[#f1f5f9]' : 'text-gray-900'}`
                                }
                                value={person} // Value should be a Person object
                            >
                                {({selected}) => (
                                    <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {person.name}
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

export default MultiSelectListbox;
