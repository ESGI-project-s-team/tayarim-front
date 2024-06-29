import {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react';
import {
    CheckIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    XCircleIcon
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import {
    getAllOwnerInFun, getHousingAmenitiesInFun,
    getHousingRulesInFun,
    getHousingTypesInFun
} from "@/app/components/modal/modal-add-housing/action";
import countryList from 'react-select-country-list';
import {updateHousingInFun} from "@/app/components/modal/modal-update-housing/action";
import MultiSelectListboxUpdate from "@/app/components/modal/ui/MultiSelectListboxUpdate";

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
    idTypeLogement: number;
    isLouable: boolean;
    reglesLogement: any[];
    amenagements: any[];
    images: any[];
    files: any[];
}

interface OwnerType {
    id: number;
    prenom: string;
    nom: string;
    email: string;
}

export default function ModalUpdateHousing({isOpen, onClose, housingData, getAllHousing}: {
    isOpen: boolean;
    onClose: () => void;
    housingData: any;
    getAllHousing: any;
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({...housingData, files: []});
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false);
    const {translation} = useTranslationContext();
    const [query, setQuery] = useState('');
    const [selectedOwner, setSelectedOwner] = useState<OwnerType | null>(null);
    const [owners, setOwners] = useState<OwnerType[]>([]);
    const [housingTypes, setHousingTypes] = useState<any[]>([]);
    const [currentSection, setCurrentSection] = useState('general');
    const [countries] = useState(countryList().getData());
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [countryQuery, setCountryQuery] = useState('');
    const [checkInQuery, setCheckInQuery] = useState('');
    const [checkOutQuery, setCheckOutQuery] = useState('');
    const [housingRules, setHousingRules] = useState<any[]>([]);
    const [housingAmenities, setHousingAmenities] = useState<any[]>([]);
    const [selectedHousingAmenities, setSelectedHousingAmenities] = useState<any>([]);
    const [selectedHousingRules, setSelectedHousingRules] = useState<any>([]);
    useEffect(() => {
        if (housingData.prixParNuit === 1) {
            handleInputChange('prixParNuit', null);
        }
    }, [housingData.prixParNuit]);
    useEffect(() => {
        if (housingData.amenagements) {
            let keysAmenagements = Object.keys(housingData.amenagements);
            let amenitiesArray = keysAmenagements.map(key => ({nom: translation?.t(key)}));
            setSelectedHousingAmenities(amenitiesArray);
        }
        if (housingData.reglesLogement) {
            const keysReglesLogement = Object.keys(housingData.reglesLogement);
            let housingRulesArray = keysReglesLogement.map((key: any) => ({nom: translation?.t(key)}));
            setSelectedHousingRules(housingRulesArray)
        }
    }, [housingData.amenagements, housingData.reglesLogement, translation]);

    useEffect(() => {
        let selectedHousingRulesIds = housingRules.filter((rule: any) =>
            selectedHousingRules.some((selectedRule: any) => selectedRule.nom === translation?.t(rule.nom)))
            .map((rule: any) => rule.id);
        handleInputChange('reglesLogement', selectedHousingRulesIds);
        let selectedHousingAmenitiesIds = housingAmenities.filter((amenity: any) =>
            selectedHousingAmenities.some((selectedAmenity: any) => selectedAmenity.nom === translation?.t(amenity.nom)))
            .map((amenity: any) => amenity.id);
        handleInputChange('amenagements', selectedHousingAmenitiesIds);
    }, [housingAmenities, housingRules, selectedHousingAmenities, selectedHousingRules, translation]);

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
                    let rules = response.map((value: any) => ({nom: translation?.t(value.nom), id: value.id}));
                    setHousingRules(rules);
                    setError(null);
                }
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
                    let amenities = response.map((value: any) => ({nom: translation?.t(value.nom), id: value.id}));
                    setHousingAmenities(amenities);
                    setError(null);
                }
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
        handleGetAllHousingAmenities().then(
            () => setLoading(false)
        );
    }, [setError, translation]);

    const updateHousing = async () => {
        setLoading(true);
        const requiredFieldsLouable: Array<keyof FormValues> = [
            'titre', 'idProprietaire', 'ville', 'adresse', 'codePostal', 'pays', 'description', 'defaultCheckIn', 'defaultCheckOut', 'capaciteMaxPersonne', 'nombresNuitsMin',
            'prixParNuit', 'nombresDeChambres', 'nombresDeLits', 'nombresSallesDeBains',
            'reglesLogement', 'amenagements'
        ];
        const requiredFieldsConciergerie: Array<keyof FormValues> = [
            'titre', 'idProprietaire', 'ville', 'adresse', 'codePostal', 'pays', 'description'
        ];
        const errorMessages: any = {
            'titre': 'titreError',
            'idProprietaire': 'idProprietaireError',
            'ville': 'villeError',
            'adresse': 'adresseError',
            'codePostal': 'codePostalError',
            'pays': 'paysError',
            'description': 'descriptionError',
            'defaultCheckIn': 'defaultCheckInError',
            'defaultCheckOut': 'defaultCheckOutError',
            'capaciteMaxPersonne': 'capaciteMaxPersonneError',
            'nombresNuitsMin': 'nombresNuitsMinError',
            'prixParNuit': 'prixParNuitError',
            'nombresDeChambres': 'nombresDeChambresError',
            'nombresDeLits': 'nombresDeLitsError',
            'nombresSallesDeBains': 'nombresSallesDeBainsError',
            'reglesLogement': 'reglesLogementError',
            'amenagements': 'amenagementsError',
        };

        const missingFields: string[] = [];

        const fieldsToCheck = formValues.isLouable ? requiredFieldsLouable : requiredFieldsConciergerie;
        fieldsToCheck.forEach(field => {
            const value = formValues[field];
            if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
                missingFields.push(errorMessages[field]);
            }
        });

        if (missingFields.length > 0) {
            setError(missingFields);
            setLoading(false);
            return;
        }
        formValues.intervalReservation = 1;

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
        appendFormData('id', housingData.id);

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

        formValues.images.forEach((image, index) => {
            if (image) {
                formData.append(`currentImages[${index}]`, image.id);
            }
        });

        await updateHousingInFun(formData).then(
            async (response) => {
                if (response.errors) {
                    setError(response.errors);
                } else {
                    await getAllHousing();
                    setSuccess('success');
                    onClose();
                }
                setLoading(false);
            }
        );
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
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleImageDeleteFiles = (index: React.Key | null | undefined) => {
        setFormValues((prev) => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    };

    const renderSection = () => {
        switch (currentSection) {
            case 'general':
                return (
                    <div className="mb-5 flex flex-col gap-7">
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
                                {translation?.t('service')}
                            </label>
                            <select
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                value={formValues.isLouable ? 'Location' : 'Conciergerie'}
                                onChange={(e) => handleInputChange('isLouable', e.target.value === 'Location')}
                            >
                                <option value="Location">{translation?.t('rental')}</option>
                                <option value="Conciergerie">{translation?.t('concierge')}</option>
                            </select>
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
                            <Combobox value={
                                selectedOwner
                                    ? selectedOwner
                                    : owners.find((person) => person.id === formValues.idProprietaire)
                            } onChange={(value: OwnerType) => {
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
                            <div className="w-full">
                                <label
                                    className="mb-3 block text-sm font-medium text-black">{translation?.t('housingRules')}</label>
                                <MultiSelectListboxUpdate items={housingRules} setSelected={setSelectedHousingRules}
                                                          selectedItems={selectedHousingRules}/>
                            </div>
                            <br/>
                            <div className="w-full">
                                <label
                                    className="mb-3 block text-sm font-medium text-black">{translation?.t('amenities')}</label>
                                <MultiSelectListboxUpdate items={housingAmenities}
                                                          setSelected={setSelectedHousingAmenities}
                                                          selectedItems={selectedHousingAmenities}/>
                            </div>
                            <br/>
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
                            <Combobox value={formValues.pays} onChange={(value: any) => {
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
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('housing_type')}
                            </label>
                            <select
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                onChange={(e) => handleInputChange('idTypeLogement', parseInt(e.target.value))}
                                value={formValues.idTypeLogement}
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
                                className="mb-3 block text-sm font-medium text-black">{formValues.isLouable ? translation?.t('prix_par_nuit') : translation?.t('montant')}</label>
                            <input
                                placeholder={translation?.t('montant')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.prixParNuit ?? ''}
                                onChange={(e) => handleInputChange('prixParNuit', parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                );
            case 'images':
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
                                {formValues.images.map((image: any, index: any) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image.url}
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
                                {formValues.files.map((file: any, index: any) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Upload Preview ${index}`}
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleImageDeleteFiles(index)}
                                            className="absolute top-0 right-0 p-0.5 text-white bg-red-500 rounded-full"
                                        >
                                            <XCircleIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ))}
                            </div>
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
                                                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                                    </svg>

                                                    {translation?.t('general')}
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

                                                    {translation?.t('location')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('detailsAdresse')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg   ${currentSection === 'detailsAdresse' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <MagnifyingGlassIcon className="w-5 h-5 mr-2"/>
                                                    {translation?.t('adresse')}
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
                                                <button onClick={() => setCurrentSection('reservation')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg  ${currentSection === 'reservation' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'} text-nowrap`}>
                                                    <CalendarIcon className="w-5 h-5 mr-2"/>
                                                    {translation?.t('critere_reservation')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('images')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg  ${currentSection === 'images' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'} text-nowrap`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-6 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4.5 18.75h15"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M3 18.75a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18.75v-9A2.25 2.25 0 0 0 18.75 7.5h-.568a2.25 2.25 0 0 1-1.591-.659l-2.365-2.366a2.25 2.25 0 0 0-1.591-.659H9.365a2.25 2.25 0 0 0-1.591.659L5.409 6.841a2.25 2.25 0 0 1-1.591.659H3.75A2.25 2.25 0 0 0 1.5 9v9Z"/>
                                                    </svg>
                                                    {translation?.t('images')}
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
                                                onClick={updateHousing}
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
