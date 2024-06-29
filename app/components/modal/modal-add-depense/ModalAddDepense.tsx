import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Dialog,
    Transition
} from '@headlessui/react';
import {useIsErrorContext, useLoaderContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import clsx from "clsx";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {getAllHousingInFun} from "@/app/components/dashboard-components/ui/planning/action";
import {createReservationInFun} from "@/app/components/modal/modal-add-depense/action";

interface FormValues {
    libelle: string;
    date: string;
    idLogement: number;
    prix: number;
}

interface HouseType {
    id: number;
    titre: string;
}

export default function ModalAddDepense({isOpen, onClose, getAllDepense}: {
    isOpen: boolean;
    onClose: () => void;
    getAllDepense: any
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({libelle: '', date: '', idLogement: 0, prix: 0});
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext()
    const [isLoading, setLoading] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const {translation} = useTranslationContext();
    const [selectedHousing, setSelectedHousing] = useState<HouseType | null>(null);
    const [query, setQuery] = useState('');
    const [housing, setHousing] = useState([]);

    useEffect(() => {
        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const allFieldsFilled = Object.values(formValues).every(value => value?.toString().trim() !== '');
        setButtonDisabled(!allFieldsFilled);
    }, [formValues]);

    useEffect(() => {
        const handleGetAllHousing = async () => {
            setLoading(true);
            try {
                const response = await getAllHousingInFun();
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setHousing(response);
                    setError(null);
                }

            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };

        handleGetAllHousing().then(
            () => setLoading(false)
        );
    }, [setError]);
    const handleInputChange = (field: keyof FormValues, value: any) => {
        setFormValues((prev: FormValues) => ({...prev, [field]: value})); // Update the specific field
    };

    const handleActionCreateDepense = async () => {
        setLoading(true)
        try {
            createReservationInFun(formValues).then((response) => {
                if (response.errors) {
                    setError(response.errors)
                } else {
                    getAllDepense();
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
    const filteredHousing = query === ''
        ? housing
        : housing.filter((h: HouseType) => h.titre.toLowerCase().includes(query.toLowerCase()
        ));
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => null}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center z-50">
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
                                                <h3 className="font-medium text-black">{translation?.t('form_add_depense')}</h3>
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
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">
                                                        {translation?.t('housing_titre')}
                                                    </label>
                                                    <input
                                                        placeholder={translation?.t('title_house_depense')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 outline-none transition"
                                                        type="text"
                                                        onChange={(e) => handleInputChange('libelle', e.target.value)} // Add onChange handler
                                                    />
                                                </div>

                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">Date</label>
                                                    <input
                                                        placeholder={translation?.t('date_placeholder_form')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="date"
                                                        onChange={(e) => handleInputChange('date', e.target.value)} // Add onChange handler
                                                    />
                                                </div>

                                                <div className="w-full mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">{translation?.t('house')}</label>
                                                    <Combobox value={selectedHousing}
                                                              onChange={(value: HouseType) => {
                                                                  setSelectedHousing(value);
                                                                  handleInputChange('idLogement', value?.id);
                                                              }}>
                                                        <div className="relative">
                                                            <ComboboxInput
                                                                className={clsx(
                                                                    "text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                )}
                                                                displayValue={(house: HouseType) => house ? house.titre : ''}
                                                                onChange={(event) => setQuery(event.target.value)}
                                                                placeholder={translation?.t('house')}
                                                            />
                                                            <ComboboxButton
                                                                className="group absolute inset-y-0 right-0 px-2.5">
                                                                <ChevronDownIcon className="size-6"/>
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
                                                                {filteredHousing.map((house: any) => (
                                                                    <ComboboxOption
                                                                        key={house.id}
                                                                        value={house}
                                                                        className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 cursor-pointer"
                                                                    >
                                                                        <CheckIcon
                                                                            className="invisible size-5 fill-black group-data-[selected]:visible"/>
                                                                        <div
                                                                            className="text-sm/6 text-black">{house.titre}</div>
                                                                    </ComboboxOption>
                                                                ))}
                                                            </ComboboxOptions>
                                                        </Transition>
                                                    </Combobox>
                                                </div>

                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">
                                                        {translation?.t('montant')}
                                                    </label>
                                                    <input
                                                        placeholder={translation?.t('amount_placeholder')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="number"
                                                        onChange={(e) => handleInputChange('prix', parseFloat(e.target.value))} // Add onChange handler
                                                    />
                                                </div>
                                                {isLoading ? <div className="flex justify-center">
                                                        <SpinnerUI/>
                                                    </div> :
                                                    <button
                                                        type="button"
                                                        ref={focusElementRef}
                                                        onClick={handleActionCreateDepense}
                                                        disabled={isButtonDisabled}
                                                        className={`flex w-full justify-center rounded p-3 font-medium text-white ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                    >
                                                        {translation?.t('form_add_depense')}
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
