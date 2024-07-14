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
import {
    useIsErrorContext,
    useSuccessContext,
    useTranslationContext
} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {getAllHousingInFun} from "@/app/components/dashboard-components/ui/planning/action";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";
import {createReservationInFun} from "@/app/components/modal/modal-add-reservation/action";
import DatePickerRangerCustomForm from "@/app/components/ui/DatePickerRangerCustomForm";
import {getDatesIndispoByIdHousingInFun} from "@/app/components/details-result/actions";

interface FormValues {
    prenom: string;
    nom: string;
    email: string;
    numTel: string;
    nbPersonnes: number | null;
    montant: number | null;
    dateArrivee: string;
    dateDepart: string;
    idLogement: number | null;
    lang: string;
}

interface HouseType {
    id: number;
    titre: string;
}

export default function ModalAddReservation({isOpen, onClose, getAllReservations}: {
    isOpen: boolean;
    onClose: () => void;
    getAllReservations: any
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        prenom: '', nom: '', email: '', numTel: '',
        nbPersonnes: null, montant: null, dateArrivee: '', dateDepart: '', idLogement: null,
        lang: 'en'
    });
    const [step, setStep] = useState(1);
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const {translation} = useTranslationContext();
    const [housing, setHousing] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedHousing, setSelectedHousing] = useState<HouseType | null>(null);

    useEffect(() => {
        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
    }, []);

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

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;

        if (step === 1) {
            const allFieldsFilled = [formValues.prenom, formValues.nom].every(value => value.trim() !== '');
            const emailValid = formValues.email.trim() === '' || emailRegex.test(formValues.email);
            const phoneValid = formValues.numTel.trim() === '' || phoneRegex.test(formValues.numTel);
            setButtonDisabled(!(allFieldsFilled && emailValid && phoneValid));
        } else {
            const allFieldsFilled = [formValues.nbPersonnes, formValues.montant, formValues.dateArrivee, formValues.dateDepart, formValues.idLogement].every(value => value !== '' && value !== 0 &&
                value !== null);
            setButtonDisabled(!allFieldsFilled);
        }
    }, [formValues, step]);


    const handleInputChange = (field: keyof FormValues, value: any) => {
        setFormValues(prev => ({...prev, [field]: value}));
    };


    const handleActionCreateReservation = async () => {
        setLoading(true);
        let credentialsTmp = {
            prenom: formValues.prenom,
            nom: formValues.nom,
            nbPersonnes: formValues.nbPersonnes,
            montant: formValues.montant,
            dateArrivee: formValues.dateArrivee,
            dateDepart: formValues.dateDepart,
            idLogement: formValues.idLogement,
            lang: formValues.lang
        };
        let credentials;
        if (formValues.numTel.trim() !== '' && formValues.email.trim() !== '') {
            credentials = {
                ...credentialsTmp,
                numTel: formValues.numTel,
                email: formValues.email
            };
        } else {
            credentials = credentialsTmp;
        }

        try {
            createReservationInFun(credentials).then((response) => {
                if (response.errors) {
                    setError(response.errors);
                } else {
                    getAllReservations();
                    setError(null);
                    onClose();
                    setSuccess(true);
                }
            });
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };
    const filteredHousing = query === ''
        ? housing
        : housing.filter((h: HouseType) => h.titre.toLowerCase().includes(query.toLowerCase()
        ));

    const handleNextStep = () => {
        if (step === 1) {
            setStep(2);
        } else {
            handleActionCreateReservation().then(
                () => setLoading(false)
            );
        }
    };

    const handlePrevStep = () => {
        if (step === 2) {
            setStep(1);
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
                                                <h3 className="font-medium text-black">{translation?.t('form_add_reservation')}</h3>
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
                                                {step === 1 ? (
                                                    <>
                                                        <div className="mb-5 flex  gap-6 flex-row">
                                                            <div className="w-1/2">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black text-nowrap">
                                                                    {translation?.t('form_firstname_client')}
                                                                </label>
                                                                <input
                                                                    placeholder={translation?.t('first_name_placeholder_form')}
                                                                    className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 outline-none transition"
                                                                    type="text"
                                                                    value={formValues.prenom}
                                                                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                                                                />
                                                            </div>

                                                            <div className="w-1/2">
                                                                <label
                                                                    className="mb-3 block text-sm font-medium text-black text-nowrap">
                                                                    {translation?.t('form_lastname_client')}</label>
                                                                <input
                                                                    placeholder={translation?.t('last_name_placeholder_form')}
                                                                    className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                    type="text"
                                                                    value={formValues.nom}
                                                                    onChange={(e) => handleInputChange('nom', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label
                                                                className="mb-3 block text-sm font-medium text-black">{translation?.t('langue_owner')}</label>
                                                            <select
                                                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                defaultValue={'en'}
                                                                onChange={(e) => handleInputChange('lang', e.target.value)}
                                                            >
                                                                <option value="fr">{translation?.t('french')}</option>
                                                                <option
                                                                    value="en">{translation?.t('english')}</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label
                                                                className="mb-3 block text-sm font-medium text-black">{translation?.t('form_email_client')}</label>
                                                            <input
                                                                placeholder={translation?.t('email_placeholder_form')}
                                                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                type="email"
                                                                value={formValues.email}
                                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mb-5">
                                                            <label
                                                                className="mb-3 block text-sm font-medium text-black">
                                                                {translation?.t('form_numTel_client')}
                                                            </label>
                                                            <input
                                                                placeholder={translation?.t('phone_placeholder_form')}
                                                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                type="text"
                                                                value={formValues.numTel}
                                                                onChange={(e) => handleInputChange('numTel', e.target.value)}
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="mb-5">
                                                            <label
                                                                className="mb-3 block text-sm font-medium text-black">
                                                                {translation?.t('guest')}
                                                            </label>
                                                            <input
                                                                placeholder={translation?.t('number_of_people_placeholder_form')}
                                                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                type="number"
                                                                value={formValues.nbPersonnes ?? ''}
                                                                onChange={(e) => handleInputChange('nbPersonnes', e.target.value)}
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
                                                                {translation?.t('check')}
                                                            </label>
                                                            <DatePickerRangerCustomForm
                                                                placeholder={translation?.t('btn_date')}
                                                                days={translation?.t('days', {returnObjects: true})}
                                                                months={translation?.t('months', {returnObjects: true})}
                                                                handleInputChange={handleInputChange}
                                                                noMin={true}
                                                            />
                                                        </div>
                                                        <div className="mb-5">
                                                            <label
                                                                className="mb-3 block text-sm font-medium text-black">
                                                                {translation?.t('montant')}
                                                            </label>
                                                            <input
                                                                placeholder={translation?.t('montant')}
                                                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                                type="number"
                                                                value={formValues.montant ?? ''}
                                                                onChange={(e) => handleInputChange('montant', e.target.value)}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                <div className="mb-4">
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className={`bg-blue-600 h-2.5 rounded-full ${step === 1 ? 'w-1/2' : 'w-full'}`}/>
                                                    </div>
                                                </div>
                                                {isLoading ? <div className="flex justify-center">
                                                        <SpinnerUI/>
                                                    </div> :
                                                    <div className="flex justify-between">
                                                        {step === 2 && <button
                                                            type="button"
                                                            onClick={handlePrevStep}
                                                            className="flex justify-center rounded p-3 font-medium text-white bg-[#3c50e0] hover:bg-opacity-90"
                                                        >
                                                            {translation?.t('previous')}
                                                        </button>}
                                                        <button
                                                            type="button"
                                                            ref={focusElementRef}
                                                            onClick={handleNextStep}
                                                            disabled={isButtonDisabled}
                                                            className={`flex justify-center rounded p-3 font-medium text-white ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                        >
                                                            {step === 1 ? translation?.t('next') : translation?.t('form_add_reservation')}
                                                        </button>
                                                    </div>
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
