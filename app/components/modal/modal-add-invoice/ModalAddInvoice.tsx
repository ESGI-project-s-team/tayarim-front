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
import {useIsErrorContext, useNavbarContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import clsx from "clsx";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {getAllOwnerInFun} from "@/app/components/modal/modal-add-housing/action";
import {createInvoiceInFun} from "@/app/components/modal/modal-add-invoice/actions";

interface FormValues {
    month: number;
    year: number;
    idProprietaire: number | null;
}

interface OwnerType {
    id: number;
    prenom: string;
    nom: string;
    email: string;
}

export default function ModalAddInvoice({isOpen, onClose, getAllInvoice}: {
    isOpen: boolean;
    onClose: () => void;
    getAllInvoice: any
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formValues, setFormValues] = useState<FormValues>({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        idProprietaire: null
    });
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const {translation} = useTranslationContext();
    const days = translation?.t('days', {returnObjects: true})
    const months = translation?.t('months', {returnObjects: true})
    const {theLanguage} = useNavbarContext();
    const [selectedOwner, setSelectedOwner] = useState<OwnerType | null>(null);
    const [query, setQuery] = useState('');
    const [owners, setOwners] = useState<OwnerType[]>([]);

    const locale: any = {
        localize: {
            day: (n: string | number) => days[n],
            month: (n: string | number) => months[n]
        },
        formatLong: {
            date: () => 'dd MMMM yyyy',
        },
        code: theLanguage,
    };
    useEffect(() => {
        const allFieldsFilled = Object.values(formValues).every(value => value !== "" && value !== null && value !== undefined);
        setButtonDisabled(!(allFieldsFilled));
    }, [formValues]);
    useEffect(() => {
        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
    }, []);
    useEffect(() => {
        const handleGetAllOwner = async () => {
            setLoading(true);
            try {
                const response = await getAllOwnerInFun();
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setOwners(response);
                    setError(null);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        handleGetAllOwner().then();
    }, [setError]);
    const handleChangeDate = (date: any) => {
        setSelectedDate(date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        setFormValues((prev) => ({...prev, month, year}));
    };

    const handleFocus = (e: any) => {
        e.preventDefault();
        e.target.blur();
    };

    const handleInputChange = (field: keyof FormValues, value: any) => {
        setFormValues((prev) => ({...prev, [field]: value}));
    };

    const filteredPeople = query === ''
        ? owners
        : owners.filter((person: OwnerType) => {
            const fullName = person.prenom + ' ' + person.nom;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });

    const handleActionCreateInvoice = async () => {
        setLoading(true);
        try {
            createInvoiceInFun(formValues).then((response) => {
                setLoading(false);
                if (typeof response !== "boolean" && response?.errors) {
                    setError(response.errors);
                    return;
                }
                getAllInvoice();
                setError(null);
                onClose();
                setSuccess(true);

            }); // Pass the updated form values
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => {
                null
            }}>
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

                <div className="fixed inset-0 overflow-y-auto">
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
                                className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
                                <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                                    <div className="flex flex-col gap-9">
                                        <div className="rounded-sm border stroke-1 bg-white shadow">
                                            <div className="border-b border-[#dee4ee] py-4 flex justify-between px-7">
                                                <h3 className="font-medium text-black">{translation?.t('form_add_invoice')}</h3>
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
                                                <div className="mb-7">
                                                    <label className="mb-3 block text-sm font-medium text-black">
                                                        {translation?.t('month_invoice')}
                                                    </label>
                                                    <DatePicker
                                                        id="datePicker"
                                                        selected={selectedDate}
                                                        showMonthYearPicker
                                                        dateFormat="yyyy, MMM"
                                                        onChange={handleChangeDate}
                                                        onChangeRaw={handleFocus}
                                                        onFocus={handleFocus}
                                                        locale={locale}
                                                        className=" border-1 border-solid border-gray-300 rounded-md cursor-pointer "
                                                    />
                                                </div>

                                                <div className="w-full mb-7">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">{translation?.t('choose_owner')}</label>
                                                    <Combobox value={selectedOwner} onChange={(value: OwnerType) => {
                                                        setSelectedOwner(value);
                                                        handleInputChange('idProprietaire', value?.id);
                                                    }}>
                                                        <div className="relative">
                                                            <ComboboxInput
                                                                className={clsx(
                                                                    "text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                )}
                                                                displayValue={(person: OwnerType) => person ? person.prenom + ' ' + person.nom : ''}
                                                                onChange={(event) => setQuery(event.target.value)}
                                                                placeholder={translation?.t('choose_owner_placeholder')}
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
                                                                {filteredPeople.map((person: any) => (
                                                                    <ComboboxOption
                                                                        key={person.id}
                                                                        value={person}
                                                                        className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 cursor-pointer"
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

                                                {isLoading ? (
                                                    <div className="flex justify-center">
                                                        <SpinnerUI/>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        ref={focusElementRef}
                                                        onClick={handleActionCreateInvoice}
                                                        disabled={isButtonDisabled}
                                                        className={`flex w-full justify-center rounded p-3 font-medium text-white ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                    >
                                                        {translation?.t('form_add_invoice')}
                                                    </button>
                                                )}
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
