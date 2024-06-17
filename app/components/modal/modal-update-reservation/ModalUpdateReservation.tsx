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
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {updateReservationInFun} from "@/app/components/modal/modal-update-reservation/action";
import DatePickerRangerCustomForm from "@/app/components/ui/DatePickerRangerCustomForm";
import clsx from "clsx";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {getAllHousingInFun} from "@/app/components/dashboard-components/ui/planning/action";

interface ReservationUpdateDto {
    email: string;
    numTel: string;
    nom: string;
    prenom: string;
    nbPersonnes: number | null;
    montant: number | null;
    dateArrivee: string;
    dateDepart: string;
    idLogement: number;
}

interface HouseType {
    id: number;
    titre: string;
}

export default function ModalUpdateReservation({isOpen, onClose, reservationData, getAllReservations}: {
    isOpen: boolean;
    onClose: () => void;
    reservationData: any;
    getAllReservations: any;
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<ReservationUpdateDto>(reservationData);
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false);
    const {translation} = useTranslationContext();
    const [currentSection, setCurrentSection] = useState('personal');
    const [selectedHousing, setSelectedHousing] = useState<HouseType | undefined>(undefined);
    const [query, setQuery] = useState('');
    const [housing, setHousing] = useState([]);


    const updateReservation = async () => {
        setLoading(true);
        const requiredFields: Array<keyof ReservationUpdateDto> = [
            'email', 'numTel', 'nom', 'prenom', 'nbPersonnes', 'montant', 'dateArrivee', 'dateDepart', 'idLogement',
        ];
        const errorMessages: any = {
            'email': 'emailError',
            'numTel': 'numTelError',
            'nom': 'nomError',
            'prenom': 'prenomError',
            'nbPersonnes': 'nbPersonnesError',
            'montant': 'montantError',
            'dateArrivee': 'dateArriveeError',
            'dateDepart': 'dateDepartError',
            'idLogement': 'idLogementError'
        };

        const missingFields: string[] = [];

        requiredFields.forEach(field => {
            const value = formValues[field];
            if (value === null || value === undefined || (typeof value === 'string' && !value.trim())
                || (typeof value === 'number' && isNaN(value))) {
                missingFields.push(errorMessages[field]);
            }
        });

        if (missingFields.length > 0) {
            setError(missingFields);
            setLoading(false);
            return;
        }

        await updateReservationInFun(formValues).then(
            async (response: any) => {
                if (response.errors) {
                    setError(response.errors);
                } else {
                    await getAllReservations();
                    setSuccess('success');
                    onClose();
                }
                setLoading(false);
            }
        );
    };

    const handleInputChange = (field: keyof ReservationUpdateDto, value: any) => {
        setFormValues((prev: ReservationUpdateDto) => ({...prev, [field]: value}));
    };
    useEffect(() => {
        const handleGetAllHousing = async () => {
            setLoading(true);
            try {
                const response = await getAllHousingInFun();
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setHousing(response);
                    setSelectedHousing(response.find((h: any) => h.id === reservationData.idLogement));
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
    }, [reservationData.idLogement, setError]);

    const filteredHousing = query === ''
        ? housing
        : housing.filter((h: HouseType) => h.titre.toLowerCase().includes(query.toLowerCase()
        ));

    const renderSection = () => {
        switch (currentSection) {
            case 'personal':
                return (
                    <div className="mb-5 flex flex-col gap-3">
                        <div className="min-w-full flex  gap-x-14 flex-row mb-5 ">
                            <div>
                                <label className="mb-3 block text-sm font-medium text-black">
                                    {translation?.t('form_firstname_client')}
                                </label>
                                <input
                                    placeholder={translation?.t('first_name_placeholder_form')}
                                    className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                    type="text"
                                    value={formValues.prenom}
                                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-sm font-medium text-black">
                                    {translation?.t('form_lastname_client')}
                                </label>
                                <input
                                    placeholder={translation?.t('last_name_placeholder_form')}
                                    className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                    type="text"
                                    value={formValues.nom}
                                    onChange={(e) => handleInputChange('nom', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full mb-5">
                            <label className="mb-5 block text-sm font-medium text-black">
                                {translation?.t('form_email_client')}
                            </label>
                            <input
                                placeholder={translation?.t('email_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="email"
                                value={formValues.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        <div className="w-full mb-5">
                            <label className="mb-3 block text-sm font-medium text-black">
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
                    </div>
                );
            case 'details':
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('guest')}
                            </label>
                            <input
                                placeholder={translation?.t('number_of_people_placeholder_form')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.nbPersonnes || ''}
                                onChange={(e) => handleInputChange('nbPersonnes', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('montant')}
                            </label>
                            <input
                                placeholder={translation?.t('montant')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.montant || ''}
                                onChange={(e) => handleInputChange('montant', parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('check')}
                            </label>
                            <DatePickerRangerCustomForm
                                value={[formValues.dateArrivee, formValues.dateDepart]}
                                placeholder={translation?.t('btn_date')}
                                days={translation?.t('days', {returnObjects: true})}
                                months={translation?.t('months', {returnObjects: true})}
                                handleInputChange={handleInputChange}
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
                    </div>
                );
            default:
                return null;
        }
    };

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

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full  items-center justify-center p-4 text-center z-50">
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
                                className="max-h-[90vh] overflow-y-auto w-full max-w-3xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium text-black">{translation?.t('form_edit_reservation')}</h2>
                                    <button onClick={onClose} className="text-[#3c50e0] font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                             className="w-6 h-6 text-[#3c50e0]">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                <hr/>
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/3  p-4">
                                        <ul className="space-y-2">
                                            <li>
                                                <button onClick={() => setCurrentSection('personal')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg text-nowrap ${currentSection === 'personal' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-5 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                                    </svg>

                                                    {translation?.t('info_client')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('details')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg text-nowrap ${currentSection === 'details' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-5 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                                                    </svg>

                                                    {translation?.t('reservation_details')}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full md:w-3/4 p-4">
                                        {renderSection()}
                                        <div className="flex justify-end mt-5">
                                            <button
                                                type="button"
                                                ref={focusElementRef}
                                                onClick={updateReservation}
                                                disabled={isLoading}
                                                className={`flex justify-center rounded  p-3 font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                            >
                                                {isLoading ? <SpinnerUI/> : translation?.t('form_edit_reservation')}
                                            </button>
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
