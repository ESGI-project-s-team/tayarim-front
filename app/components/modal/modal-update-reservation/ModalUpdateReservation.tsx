import {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import countryList from 'react-select-country-list';
import {updateReservationInFun} from "@/app/components/modal/modal-update-reservation/action";

interface ReservationUpdateDto {
    email: string;
    numTel: string;
    nom: string;
    prenom: string;
    nbPersonnes: number | null;
    montant: number | null;
    checkIn: string;
    checkOut: string;
    dateArrivee: string;
    dateDepart: string;
    idLogement: number;
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
    const [countries] = useState(countryList().getData());
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [countryQuery, setCountryQuery] = useState('');
    const [checkInQuery, setCheckInQuery] = useState('');
    const [checkOutQuery, setCheckOutQuery] = useState('');

    const updateReservation = async () => {
        setLoading(true);
        const requiredFields: Array<keyof ReservationUpdateDto> = [
            'email', 'numTel', 'nom', 'prenom', 'nbPersonnes', 'montant', 'checkIn', 'checkOut', 'dateArrivee', 'dateDepart', 'idLogement'
        ];
        const errorMessages: any = {
            'email': 'emailError',
            'numTel': 'numTelError',
            'nom': 'nomError',
            'prenom': 'prenomError',
            'nbPersonnes': 'nbPersonnesError',
            'montant': 'montantError',
            'checkIn': 'checkInError',
            'checkOut': 'checkOutError',
            'dateArrivee': 'dateArriveeError',
            'dateDepart': 'dateDepartError',
            'idLogement': 'idLogementError'
        };

        const missingFields: string[] = [];

        requiredFields.forEach(field => {
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

        await updateReservationInFun(formValues).then(
            async (response :any) => {
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

    const renderSection = () => {
        switch (currentSection) {
            case 'personal':
                return (
                    <div className="mb-5 flex flex-col gap-7">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('email')}
                            </label>
                            <input
                                placeholder={translation?.t('email_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="email"
                                value={formValues.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('numTel')}
                            </label>
                            <input
                                placeholder={translation?.t('numTel_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.numTel}
                                onChange={(e) => handleInputChange('numTel', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('nom')}
                            </label>
                            <input
                                placeholder={translation?.t('nom_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.nom}
                                onChange={(e) => handleInputChange('nom', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('prenom')}
                            </label>
                            <input
                                placeholder={translation?.t('prenom_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.prenom}
                                onChange={(e) => handleInputChange('prenom', e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 'details':
                return (
                    <div className="mb-5 flex flex-col gap-6">
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('nbPersonnes')}
                            </label>
                            <input
                                placeholder={translation?.t('nbPersonnes_placeholder')}
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
                                placeholder={translation?.t('montant_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.montant || ''}
                                onChange={(e) => handleInputChange('montant', parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('checkIn')}
                            </label>
                            <input
                                placeholder={translation?.t('checkIn_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.checkIn}
                                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('checkOut')}
                            </label>
                            <input
                                placeholder={translation?.t('checkOut_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="text"
                                value={formValues.checkOut}
                                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('dateArrivee')}
                            </label>
                            <input
                                placeholder={translation?.t('dateArrivee_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="date"
                                value={formValues.dateArrivee}
                                onChange={(e) => handleInputChange('dateArrivee', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('dateDepart')}
                            </label>
                            <input
                                placeholder={translation?.t('dateDepart_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="date"
                                value={formValues.dateDepart}
                                onChange={(e) => handleInputChange('dateDepart', e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black">
                                {translation?.t('idLogement')}
                            </label>
                            <input
                                placeholder={translation?.t('idLogement_placeholder')}
                                className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                type="number"
                                min="1"
                                value={formValues.idLogement || ''}
                                onChange={(e) => handleInputChange('idLogement', parseInt(e.target.value))}
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
                                    <div className="w-full md:w-1/4  p-4">
                                        <ul className="space-y-2">
                                            <li>
                                                <button onClick={() => setCurrentSection('personal')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg  ${currentSection === 'personal' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-6 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                                                    </svg>
                                                    {translation?.t('personal_information')}
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => setCurrentSection('details')}
                                                        className={`w-full flex items-center text-left p-2 hover:bg-gray-100 rounded-lg ${currentSection === 'details' ? 'bg-gray-100 text-black border-2 border-[#3c50e0]' : 'text-black'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                         className="size-6 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"/>
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
