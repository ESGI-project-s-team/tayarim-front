import {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react';
import {
    CheckIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    CalendarIcon
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import {getAllOwnerInFun} from "@/app/components/modal/modal-add-housing/action";
import countryList from 'react-select-country-list';

interface FormValues {
    titre: string;
    idProprietaire: number | null;
    nombresDeChambres: number | null;
    nombresDeLits: number | null;
    nombresSallesDeBains: number | null;
    capaciteMaxPersonne: number | null;
    nombresNuitsMin: number | null;
    description: string;
    prixParNuit: number | null;
    defaultCheckIn: string;
    defaultCheckOut: string;
    intervalReservation: number | null;
    ville: string;
    rue: string;
    numero: number | null;
    suffixeNumero: string;
    codePostal: string;
    pays: string;
    etage: string;
    numeroDePorte: string;
    idTypeLogement: number | null;
}

interface OwnerType {
    id: number;
    prenom: string;
    nom: string;
    email: string;
}

export default function ModalUpdateHousing({isOpen, onClose, housingData}: {
    isOpen: boolean;
    onClose: () => void;
    housingData: any;
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<FormValues>(housingData);
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false);
    const {translation} = useTranslationContext();
    const [query, setQuery] = useState('');
    const [selectedOwner, setSelectedOwner] = useState<OwnerType | null>(null);
    const [owners, setOwners] = useState<OwnerType[]>([]);
    const [currentSection, setCurrentSection] = useState('general');
    const [countries] = useState(countryList().getData());
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [countryQuery, setCountryQuery] = useState('');
    const [checkInQuery, setCheckInQuery] = useState('');
    const [checkOutQuery, setCheckOutQuery] = useState('');

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

        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
        handleGetAllOwner().then();
    }, [setError]);

    const updateHousingInFun = async () => {
        // Code to update housing goes here
    };

    const filteredPeople = query === ''
        ? owners
        : owners.filter((person: OwnerType) => {
            const fullName = person.prenom + ' ' + person.nom;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });

    const filteredCountries = countryQuery === ''
        ? countries
        : countries.filter((country: { label: string; }) => {
            return country.label.toLowerCase().includes(countryQuery.toLowerCase());
        });

    const hoursOptions = Array.from({length: 24}, (_, i) => {
        const hour = (i % 24).toString().padStart(2, '0') + ':00';
        return {
            value: hour,
            label: hour,
        };
    });
    hoursOptions.push({
        value: '00:00',
        label: '00:00',
    });

    const filteredCheckInOptions = checkInQuery === ''
        ? hoursOptions
        : hoursOptions.filter((option) => {
            return option.label.includes(checkInQuery);
        });

    const filteredCheckOutOptions = checkOutQuery === ''
        ? hoursOptions
        : hoursOptions.filter((option) => {
            return option.label.includes(checkOutQuery);
        });

    const handleInputChange = (field: keyof FormValues, value: any) => {
        setFormValues((prev: FormValues) => ({...prev, [field]: value}));
    };

    const renderSection = () => {
        switch (currentSection) {
            case 'general':
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('title_house')}
                            </label>
                            <input
                                placeholder={translation?.t('title_house_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.titre}
                                onChange={(e) => handleInputChange('titre', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('description')}
                            </label>
                            <textarea
                                placeholder={translation?.t('description_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                value={formValues.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
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
                                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
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
                                                <div className="text-sm/6 text-black">{person.prenom} {person.nom}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Transition>
                            </Combobox>
                        </div>
                    </div>
                );
            case 'pieces':
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('nombres_de_chambres')}</label>
                            <input
                                placeholder={translation?.t('nombres_de_chambres_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.nombresDeChambres || ''}
                                onChange={(e) => handleInputChange('nombresDeChambres', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('nombres_de_lits')}</label>
                            <input
                                placeholder={translation?.t('nombres_de_lits_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.nombresDeLits || ''}
                                onChange={(e) => handleInputChange('nombresDeLits', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('nombres_de_salles_de_bains')}</label>
                            <input
                                placeholder={translation?.t('nombres_de_salles_de_bains_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.nombresSallesDeBains || ''}
                                onChange={(e) => handleInputChange('nombresSallesDeBains', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                );
            case 'adresse':
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('pays')}</label>
                            <Combobox value={selectedCountry} onChange={(value: any) => {
                                setSelectedCountry(value?.label);
                                handleInputChange('pays', value?.label);
                            }}>
                                <div className="relative">
                                    <ComboboxInput
                                        className={clsx(
                                            "text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                        )}
                                        displayValue={(country: string) => country}
                                        onChange={(event) => setCountryQuery(event.target.value)}
                                        placeholder={translation?.t('pays_placeholder')}
                                    />
                                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                        <ChevronDownIcon className="size-6"/>
                                    </ComboboxButton>
                                </div>
                                <Transition
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setCountryQuery('')}
                                >
                                    <ComboboxOptions
                                        anchor="bottom"
                                        className="w-[var(--input-width)] rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                    >
                                        {filteredCountries.map((country: any) => (
                                            <ComboboxOption
                                                key={country.value}
                                                value={country}
                                                className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 cursor-pointer"
                                            >
                                                <CheckIcon
                                                    className="invisible size-5 fill-black group-data-[selected]:visible"/>
                                                <div className="text-sm/6 text-black">{country.label}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Transition>
                            </Combobox>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('ville')}</label>
                            <input
                                placeholder={translation?.t('ville_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.ville}
                                onChange={(e) => handleInputChange('ville', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('code_postal')}</label>
                            <input
                                placeholder={translation?.t('code_postal_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.codePostal}
                                onChange={(e) => handleInputChange('codePostal', e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 'detailsAdresse':
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="flex gap-4">
                            <div className="w-1/4">
                                <label
                                    className="mb-3 block text-sm font-medium text-black">{translation?.t('numero')}</label>
                                <input
                                    placeholder={translation?.t('numero_placeholder')}
                                    className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                    type="number"
                                    min="1"
                                    value={formValues.numero || ''}
                                    onChange={(e) => handleInputChange('numero', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="w-3/4">
                                <label
                                    className="mb-3 block text-sm font-medium text-black">{translation?.t('rue')}</label>
                                <input
                                    placeholder={translation?.t('rue_placeholder')}
                                    className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                    type="text"
                                    value={formValues.rue}
                                    onChange={(e) => handleInputChange('rue', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('suffixe_numero')}</label>
                            <input
                                placeholder={translation?.t('suffixe_numero_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.suffixeNumero}
                                onChange={(e) => handleInputChange('suffixeNumero', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('etage')}</label>
                            <input
                                placeholder={translation?.t('etage_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.etage}
                                onChange={(e) => handleInputChange('etage', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('numero_de_porte')}</label>
                            <input
                                placeholder={translation?.t('numero_de_porte_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.numeroDePorte}
                                onChange={(e) => handleInputChange('numeroDePorte', e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 'reservation':
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('capacite_max_personne')}</label>
                            <input
                                placeholder={translation?.t('capacite_max_personne_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.capaciteMaxPersonne || ''}
                                onChange={(e) => handleInputChange('capaciteMaxPersonne', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('nombres_nuits_min')}</label>
                            <input
                                placeholder={translation?.t('nombres_nuits_min_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.nombresNuitsMin || ''}
                                onChange={(e) => handleInputChange('nombresNuitsMin', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('default_check_in')}</label>
                            <Combobox value={formValues.defaultCheckIn}
                                      onChange={(value) => handleInputChange('defaultCheckIn', value)}>
                                <div className="relative">
                                    <ComboboxInput
                                        className={clsx(
                                            "text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                        )}
                                        displayValue={(option: string) => option}
                                        onChange={(event) => setCheckInQuery(event.target.value)}
                                        placeholder={translation?.t('default_check_in_placeholder')}
                                    />
                                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                        <ChevronDownIcon className="size-6"/>
                                    </ComboboxButton>
                                </div>
                                <Transition
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setCheckInQuery('')}
                                >
                                    <ComboboxOptions
                                        anchor="bottom"
                                        className="w-[var(--input-width)] rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                    >
                                        {filteredCheckInOptions.map((option: any) => (
                                            <ComboboxOption
                                                key={option.value}
                                                value={option.value}
                                                className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 cursor-pointer"
                                            >
                                                <CheckIcon
                                                    className="invisible size-5 fill-black group-data-[selected]:visible"/>
                                                <div className="text-sm/6 text-black">{option.label}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Transition>
                            </Combobox>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('default_check_out')}</label>
                            <Combobox value={formValues.defaultCheckOut}
                                      onChange={(value) => handleInputChange('defaultCheckOut', value)}>
                                <div className="relative">
                                    <ComboboxInput
                                        className={clsx(
                                            "text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                        )}
                                        displayValue={(option: string) => option}
                                        onChange={(event) => setCheckOutQuery(event.target.value)}
                                        placeholder={translation?.t('default_check_out_placeholder')}
                                    />
                                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                        <ChevronDownIcon className="size-6"/>
                                    </ComboboxButton>
                                </div>
                                <Transition
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setCheckOutQuery('')}
                                >
                                    <ComboboxOptions
                                        anchor="bottom"
                                        className="w-[var(--input-width)] rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                    >
                                        {filteredCheckOutOptions.map((option: any) => (
                                            <ComboboxOption
                                                key={option.value}
                                                value={option.value}
                                                className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 cursor-pointer"
                                            >
                                                <CheckIcon
                                                    className="invisible size-5 fill-black group-data-[selected]:visible"/>
                                                <div className="text-sm/6 text-black">{option.label}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Transition>
                            </Combobox>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('prix_par_nuit')}</label>
                            <input
                                placeholder={translation?.t('prix_par_nuit_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.prixParNuit || ''}
                                onChange={(e) => handleInputChange('prixParNuit', parseFloat(e.target.value))}
                            />
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
                                className="max-h-[90vh] overflow-y-auto w-full max-w-5xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium text-black">{translation?.t('form_edit_housing')}</h2>
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
                                    <div className="w-full md:w-1/4  p-4">
                                        <ul className="space-y-2">
                                            <li>
                                                <button onClick={() => setCurrentSection('general')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg  ${currentSection === 'general' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-6 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                                    </svg>

                                                    {translation?.t('general')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('pieces')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg ${currentSection === 'pieces' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-6 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"/>
                                                    </svg>

                                                    {translation?.t('pieces')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('adresse')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg  ${currentSection === 'adresse' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-6 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                                                    </svg>

                                                    {translation?.t('adresse')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('detailsAdresse')}


                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg   ${currentSection === 'detailsAdresse' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <MagnifyingGlassIcon className="w-5 h-5 mr-2"/>
                                                    {translation?.t('detailsAdresse')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('reservation')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg  ${currentSection === 'reservation' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <CalendarIcon className="w-5 h-5 mr-2"/>
                                                    {translation?.t('critere_reservation')}
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
                                                onClick={updateHousingInFun}
                                                disabled={isLoading}
                                                className={`flex justify-center rounded  p-3 font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                            >
                                                {isLoading ? <SpinnerUI/> : translation?.t('form_edit_housing')}
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
