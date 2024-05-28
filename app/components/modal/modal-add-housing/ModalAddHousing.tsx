import {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import {createOwnerInFun} from "@/app/components/modal/modal-create-owner/actions";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'
import {CheckIcon, ChevronDownIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import {getAllOwnerInFun} from "@/app/components/modal/modal-add-housing/action";

interface FormValues {
    url: string;
    idOwner: string;
    title: string;
}


interface OwnerType {
    id: number;
    prenom: string;
    nom: string;
    email: string;
}

export default function ModalAddHousing({isOpen, onClose, getAllOwners}: {
    isOpen: boolean;
    onClose: () => void;
    getAllOwners: any
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({url: '', idOwner: '', title: ''});
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext()
    const [isLoading, setLoading] = useState(false)
    const {translation} = useTranslationContext();
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<string>()
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [owners, setOwners] = useState<OwnerType[]>([]);

    useEffect(() => {
        if (formValues.url && formValues.title && selected) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [formValues, selected]);

    useEffect(() => {
        const handleGetAllOwner = async () => {
            setLoading(true);
            try {
                getAllOwnerInFun().then((response) => {
                    if (response.errors) {
                        setError(response.errors);
                    } else {
                        setOwners(response);
                        setError(null);
                    }
                    setLoading(false);
                }); // Pass the updated form values
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };

        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
        handleGetAllOwner().then();
    }, [setError]);

    const filteredPeople =
        query === ''
            ? owners
            : owners.filter((person: OwnerType) => {
                // Combine the first name and last name into a single string
                const fullName = person.prenom + ' ' + person.nom;
                // Return the person if the full name includes the query
                return fullName.toLowerCase().includes(query.toLowerCase());
            })

    const handleInputChange = (field: keyof any, value: any) => {
        setFormValues((prev: any) => ({...prev, [field]: value})); // Update the specific field
    };

    const handleActionCreateOwner = async () => {
        setLoading(true)
        try {
            createOwnerInFun(formValues).then((response) => {
                if (response.errors) {
                    setError(response.errors)
                } else {
                    getAllOwners();
                    setError(null)
                    onClose(); // Close the modal
                    setSuccess(true)
                }
                setLoading(false)
            }); // Pass the updated form values
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={
                () => {
                    null
                }
            }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center  z-50">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50 ">
                                <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                                    <div className="flex flex-col gap-9">
                                        <div className="rounded-sm border stroke-1 bg-white shadow">
                                            <div className="border-b border-[#dee4ee] py-4 flex justify-between px-7">
                                                <h3 className="font-medium text-black">{translation?.t('form_add_housing')}</h3>
                                                <button onClick={onClose} className="text-[#3c50e0] font-medium">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                         className="w-6 h-6 text-[#3c50e0]">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="p-7">
                                                <div className="mb-5 flex flex-col gap-6 ">
                                                    <div className="w-full">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            {translation?.t('title_house')}</label>
                                                        <input
                                                            placeholder={translation?.t('last_name_placeholder_form')}
                                                            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                            type="text"
                                                            onChange={(e) => handleInputChange('title', e.target.value)} // Add onChange handler
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            Url
                                                        </label>
                                                        <input
                                                            placeholder="https://www.airbnb.fr/rooms/660723434387433968"
                                                            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 outline-none transition"
                                                            type="text"
                                                            onChange={(e) => handleInputChange('url', e.target.value)} // Add onChange handler
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">{translation?.t('choose_owner')}</label>
                                                    <Combobox value={selected}
                                                              onChange={(value: string) => setSelected(value)}
                                                    >
                                                        <div className="relative">
                                                            <ComboboxInput
                                                                className={clsx(
                                                                    "text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                )}
                                                                displayValue={(person: OwnerType) => {
                                                                    if (person)
                                                                        return person.prenom + ' ' + person.nom
                                                                    else
                                                                        return ''
                                                                }}
                                                                onChange={(event) => setQuery(event.target.value)}
                                                                placeholder={translation?.t('form_add_owner')}
                                                            />
                                                            <ComboboxButton
                                                                className="group absolute inset-y-0 right-0 px-2.5">
                                                                <ChevronDownIcon
                                                                    className="size-6"/>
                                                            </ComboboxButton>
                                                        </div>
                                                        <Transition
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                            afterLeave={() => setQuery('')}
                                                        >
                                                            <ComboboxOptions
                                                                anchor="bottom"
                                                                className="w-[var(--input-width)] rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                                            >
                                                                {filteredPeople.map((person: any) => (
                                                                    <ComboboxOption
                                                                        key={person.id}
                                                                        value={person}
                                                                        className="group flex  items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 cursor-pointer"
                                                                    >
                                                                        <CheckIcon
                                                                            className="invisible size-5 fill-black group-data-[selected]:visible"/>
                                                                        <div
                                                                            className="text-sm/6 text-black">{person.prenom} {person.nom}</div>
                                                                    </ComboboxOption>
                                                                ))}
                                                            </ComboboxOptions>
                                                        </Transition>
                                                    </Combobox>
                                                </div>
                                                {isLoading ? <div className="flex justify-center">
                                                        <SpinnerUI/>
                                                    </div> :
                                                    <button
                                                        type="button"
                                                        ref={focusElementRef}
                                                        onClick={handleActionCreateOwner}
                                                        disabled={isButtonDisabled}
                                                        className={`flex w-full justify-center rounded  p-3 font-medium text-white ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                    >
                                                        {translation?.t('form_add_housing')}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
