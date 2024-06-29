import {Fragment, Key, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react';
import {CheckIcon, ChevronDownIcon, XCircleIcon} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import {
    createHouseInFun,
    getAllOwnerInFun, getHousingAmenitiesInFun, getHousingRulesInFun,
    getHousingTypesInFun
} from "@/app/components/modal/modal-add-housing/action";
import countryList from 'react-select-country-list';
import MultiSelectListbox from "@/app/components/modal/ui/MultiSelectListbox";
import SpinnerUI from "@/app/components/ui/SpinnerUI";

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
    adresse: string;
    codePostal: string;
    pays: string;
    etage: string;
    numeroDePorte: string;
    idTypeLogement: number | null;
    isLouable: boolean;
    reglesLogement: any[];
    amenagements: any[];
    files: any[];
}

interface OwnerType {
    id: number;
    prenom: string;
    nom: string;
    email: string;
}

export default function ModalAddHousing({isOpen, onClose, getAllHousing}: {
    isOpen: boolean;
    onClose: () => void;
    getAllHousing: any
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        titre: '',
        idProprietaire: null,
        nombresDeChambres: null,
        nombresDeLits: null,
        nombresSallesDeBains: null,
        capaciteMaxPersonne: null,
        nombresNuitsMin: null,
        description: '',
        prixParNuit: null,
        defaultCheckIn: '',
        defaultCheckOut: '',
        intervalReservation: 1,
        ville: '',
        adresse: '',
        codePostal: '',
        pays: '',
        etage: '',
        numeroDePorte: '',
        idTypeLogement: 1,
        isLouable: true,
        reglesLogement: [],
        amenagements: [],
        files: [],
    });
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false);
    const {translation} = useTranslationContext();
    const [query, setQuery] = useState('');
    const [selectedOwner, setSelectedOwner] = useState<OwnerType | null>(null);
    const [owners, setOwners] = useState<OwnerType[]>([]);
    const [housingTypes, setHousingTypes] = useState<any[]>([]);
    const [housingRules, setHousingRules] = useState<any[]>([]);
    const [housingAmenities, setHousingAmenities] = useState<any[]>([]);
    const [selectedHousingAmenities, setSelectedHousingAmenities] = useState<any>([]);
    const [selectedHousingRules, setSelectedHousingRules] = useState<any>([]);
    const [currentStep, setCurrentStep] = useState(1);
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
        const handleGetAllHousingType = async () => {
            setLoading(true);
            try {
                const response = await getHousingTypesInFun();
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setHousingTypes(response);
                    setError(null);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };

        const handleGetAllHousingRules = async () => {
            setLoading(true);
            try {
                const response = await getHousingRulesInFun();
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setHousingRules(response);
                    setError(null);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };

        const handleGetAllHousingAmenities = async () => {
            setLoading(true);
            try {
                const response = await getHousingAmenitiesInFun();
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setHousingAmenities(response);
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
        handleGetAllHousingType().then();
        handleGetAllHousingRules().then();
        handleGetAllHousingAmenities().then();

    }, [setError]);
    const handleActionCreateHousing = async () => {
        setLoading(true);

        const formData = new FormData();

        const appendFormData = (key: string, value: string | number | boolean | null | undefined) => {
            if (value !== null && value !== undefined && value !== '') {
                formData.append(key, value.toString());
            }
        };

        appendFormData('titre', formValues.titre);
        appendFormData('idProprietaire', formValues.idProprietaire);
        appendFormData('nombresDeChambres', formValues.nombresDeChambres);
        appendFormData('nombresDeLits', formValues.nombresDeLits);
        appendFormData('nombresSallesDeBains', formValues.nombresSallesDeBains);
        appendFormData('capaciteMaxPersonne', formValues.capaciteMaxPersonne);
        appendFormData('nombresNuitsMin', formValues.nombresNuitsMin);
        appendFormData('description', formValues.description);
        appendFormData('prixParNuit', formValues.prixParNuit);
        appendFormData('defaultCheckIn', formValues.defaultCheckIn);
        appendFormData('defaultCheckOut', formValues.defaultCheckOut);
        appendFormData('intervalReservation', formValues.intervalReservation);
        appendFormData('ville', formValues.ville);
        appendFormData('adresse', formValues.adresse);
        appendFormData('codePostal', formValues.codePostal);
        appendFormData('pays', formValues.pays);
        appendFormData('etage', formValues.etage);
        appendFormData('numeroDePorte', formValues.numeroDePorte);
        appendFormData('idTypeLogement', formValues.idTypeLogement);
        appendFormData('isLouable', formValues.isLouable);

        formValues.reglesLogement.forEach((regle, index) => {
            appendFormData(`reglesLogement[${index}]`, regle);
        });

        formValues.amenagements.forEach((amenagement, index) => {
            appendFormData(`amenagements[${index}]`, amenagement);
        });

        formValues.files.forEach((file, index) => {
            if (file) {
                formData.append(`files[${index}]`, file);
            }
        });


        try {
            const response = await createHouseInFun(formData);
            if (response.errors) {
                setError(response.errors);
            } else {
                getAllHousing();
                setError(null);
                onClose();
                setSuccess(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
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

    const hoursOptions = Array.from({length: 23}, (_, i) => ({
        value: (i + 1).toString().padStart(2, '0') + ':00',
        label: (i + 1).toString().padStart(2, '0') + ':00',

    }));
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

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadedImages = Array.from(event.target.files);
            setFormValues((prev) => ({
                ...prev,
                files: [...prev.files, ...uploadedImages]
            }));
        }
    };

    const handleImageDelete = (index: React.Key | null | undefined) => {
        setFormValues((prev) => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    };

    useEffect(() => {
        let selectedHousingRulesIds = selectedHousingRules.map((rule: any) => rule.id);
        handleInputChange('reglesLogement', selectedHousingRulesIds);
        let selectedHousingAmenitiesIds = selectedHousingAmenities.map((amenities: any) => amenities.id);
        handleInputChange('amenagements', selectedHousingAmenitiesIds);
    }, [selectedHousingAmenities, selectedHousingRules]);

    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const validateStep = () => {
        switch (currentStep) {
            case 1:
                return formValues.titre.trim() && selectedOwner;
            case 2:
                return selectedCountry && formValues.ville.trim() && formValues.codePostal.trim();
            case 3:
                return formValues.adresse !== null && formValues.adresse.trim() !== '';
            case 4:
                return formValues.isLouable ?
                    (formValues.nombresDeChambres !== null && formValues.nombresDeChambres > 0 && formValues.nombresDeLits !== null && formValues.nombresDeLits > 0 && formValues.nombresSallesDeBains !== null && formValues.nombresSallesDeBains > 0 && selectedHousingRules.length > 0
                        && selectedHousingAmenities.length > 0)
                    : formValues.description !== null && formValues.description.trim() !== '' && formValues.prixParNuit !== null && formValues.prixParNuit > 0;
            case 5:
                return formValues.capaciteMaxPersonne !== null && formValues.capaciteMaxPersonne > 0 && formValues.nombresNuitsMin !== null && formValues.nombresNuitsMin > 0 && formValues.defaultCheckIn && formValues.defaultCheckOut && formValues.prixParNuit !== null && formValues.prixParNuit > 0
                    ;
            case 6:
                return formValues.description !== null && formValues.description.trim() !== '' && formValues.files.length > 0;
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('service')}
                            </label>
                            <select
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                defaultValue={formValues.isLouable ? 'Location' : 'Conciergerie'}
                                onChange={(e) => handleInputChange('isLouable', e.target.value === 'Location')}
                            >
                                <option value="Location">{translation?.t('rental')}</option>
                                <option value="Conciergerie">{translation?.t('concierge')}</option>
                            </select>
                        </div>
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
                                                <div
                                                    className="text-sm/6 text-black">{person.prenom} {person.nom}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Transition>
                            </Combobox>
                        </div>
                    </div>
                );
            case 2:
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
            case 3:
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('housing_type')}
                            </label>
                            <select
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                onChange={(e) => handleInputChange('idTypeLogement', parseInt(e.target.value))}
                            >
                                {housingTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {translation?.t(type.nom)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('adresse')}</label>
                            <input
                                placeholder={translation?.t('adresse_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.adresse}
                                onChange={(e) => handleInputChange('adresse', e.target.value)}
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
            case 4:
                return formValues.isLouable ? (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('housingRules')}</label>
                            <MultiSelectListbox items={housingRules} setSelected={setSelectedHousingRules}
                                                selected={selectedHousingRules}/>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('amenities')}</label>
                            <MultiSelectListbox items={housingAmenities} setSelected={setSelectedHousingAmenities}
                                                selected={selectedHousingAmenities}/>
                        </div>
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
                ) : (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('Images')}
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                            />
                            <div className="mt-4 flex flex-wrap gap-4">
                                {formValues.files.map((image: Blob | MediaSource, index: Key | null | undefined) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Upload Preview ${index}`}
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleImageDelete(index)}
                                            className="absolute top-0 right-0 p-0.5 text-white bg-red-500 rounded-full"
                                        >
                                            <XCircleIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('montant')}</label>
                            <input
                                placeholder={translation?.t('montant')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.prixParNuit || ''}
                                onChange={(e) => handleInputChange('prixParNuit', parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('description')}</label>
                            <textarea
                                placeholder={translation?.t('description_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                value={formValues.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="mb-5 flex flex-col gap-7">
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
            case 6:
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('images')}
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                            />
                            <div className="mt-4 flex flex-wrap gap-4">
                                {formValues.files.map((image: Blob | MediaSource, index: Key | null | undefined) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Upload Preview ${index}`}
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleImageDelete(index)}
                                            className="absolute top-0 right-0 p-0.5 text-white bg-red-500 rounded-full"
                                        >
                                            <XCircleIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            <label
                                className="mb-3 block text-sm font-medium text-black">{translation?.t('description')}</label>
                            <textarea
                                placeholder={translation?.t('description_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                value={formValues.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
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
                                            <div
                                                className="border-b border-[#dee4ee] py-4 flex justify-between px-7">
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
                                                {renderStep()}
                                                <div className="flex justify-between mt-5">
                                                    {currentStep > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={handleBack}
                                                            className="flex justify-center rounded  text-sm px-3 py-2 font-medium text-white bg-[#3c50e0] hover:bg-opacity-90"
                                                        >
                                                            {translation?.t('previous')}
                                                        </button>
                                                    )}
                                                    {currentStep < (formValues.isLouable ? 6 : 4) ? (
                                                        <button
                                                            type="button"
                                                            onClick={handleNext}
                                                            disabled={!validateStep()}
                                                            className={`flex justify-center rounded text-sm px-3 py-2 font-medium text-white ${!validateStep() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                        >
                                                            {translation?.t('next')}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            ref={focusElementRef}
                                                            onClick={handleActionCreateHousing}
                                                            disabled={isLoading || !validateStep()}
                                                            className={`flex justify-center rounded  text-sm px-3 py-2 font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}
                                                            ${!validateStep() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}
                                                            `}
                                                        >
                                                            {isLoading ?
                                                                <SpinnerUI/> : translation?.t('form_add_housing')}
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="mt-4">
                                                    <div className="text-sm font-medium text-gray-500">
                                                        {translation?.t('step')} {currentStep} {translation?.t('of')} {formValues.isLouable ? 6 : 4}
                                                    </div>
                                                    <div className="relative pt-1">
                                                        <div
                                                            className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                                            <div
                                                                style={{width: `${(currentStep / (formValues.isLouable ? 6 : 4)) * 100}%`}}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#3c50e0]"></div>
                                                        </div>
                                                    </div>
                                                </div>
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
