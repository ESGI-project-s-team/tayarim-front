import {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {updateCandidateInFun, updateOwnerInFun} from '@/app/components/modal/modal-edit-owner/action';
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";


export default function ModalEditOwner({isOpen, onClose, ownerDetails, getAllOwners}: {
    isOpen: boolean;
    onClose: () => void;
    ownerDetails: any
    getAllOwners: any
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<any>({...ownerDetails}); // Initial state from `owner`
    const {setError} = useIsErrorContext();
    const [isLoading, setLoading] = useState(false)
    const {translation} = useTranslationContext();
    const {setSuccess} = useSuccessContext()
    const [isButtonDisabled, setButtonDisabled] = useState(false);


    useEffect(() => {
        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;

        const emailValid = emailRegex.test(formValues.email);
        const phoneValid = phoneRegex.test(formValues.numTel);

        if (formValues.commission < 0 || formValues.commission > 100) {
            setButtonDisabled(true)
            return
        }
        setButtonDisabled(!(emailValid && phoneValid));
    }, [formValues]);

    const handleInputChange = (field: keyof any, value: any) => {
        setFormValues((prev: any) => ({...prev, [field]: value})); // Update the specific field
    };

    const handleActionUpdateOwner = async () => {
        setLoading(true);
        // Remove from formValues the same values between ownerDetails and formValues
        const updatedFormValues = {...formValues};
        Object.keys(ownerDetails).forEach((key) => {
            if (ownerDetails[key] === formValues[key] && key !== 'id') {
                delete updatedFormValues[key];
            }
        });
        try {
            if (Object.keys(updatedFormValues).length > 1) {
                const response = await updateOwnerInFun(updatedFormValues);
                if (response.errors) {
                    setError(response.errors);
                    setFormValues({...ownerDetails});
                    setLoading(false);
                    return;
                }
            }
            if (ownerDetails.isValidated) {
                await getAllOwners();
                setError(null);
                setSuccess(true);
            } else {
                const candidateResponse = await updateCandidateInFun({id: ownerDetails.id});

                if (candidateResponse.errors) {
                    setError(candidateResponse.errors);
                    setFormValues({...ownerDetails});
                    setLoading(false);
                    return;
                }

                await getAllOwners();
                setError(null);
                setSuccess(true);
            }

            onClose(); // Close the modal
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
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

                <div className="fixed inset-0 overflow-y-auto z-40">
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
                                className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                                <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                                    <div className="flex flex-col gap-9">
                                        <div className="rounded-sm border stroke-1 bg-white shadow">
                                            <div className="border-b border-[#dee4ee] py-4 flex justify-between px-7">
                                                <h3 className="font-medium text-black">{ownerDetails.isValidated ? translation?.t('form_edit_owner') : translation?.t('form_validate_owner')}</h3>
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
                                                <div className="mb-5 flex  gap-6 flex-row">
                                                    <div className="w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            {translation?.t('form_firstname')}
                                                        </label>
                                                        <input
                                                            placeholder={translation?.t('first_name_placeholder_form')}
                                                            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 outline-none transition"
                                                            type="text"
                                                            required={true}
                                                            value={formValues.prenom}
                                                            onChange={(e) => handleInputChange('prenom', e.target.value)} // Add onChange handler
                                                        />
                                                    </div>

                                                    <div className="w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            {translation?.t('form_lastname')}</label>
                                                        <input
                                                            required={true}
                                                            placeholder={translation?.t('last_name_placeholder_form')}
                                                            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                            type="text"
                                                            value={formValues.nom}
                                                            onChange={(e) => handleInputChange('nom', e.target.value)} // Add onChange handler
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">{translation?.t('langue_owner')}</label>
                                                    <select
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        defaultValue={formValues.lang}
                                                        onChange={(e) => handleInputChange('lang', e.target.value)}
                                                    >
                                                        <option value="fr">{translation?.t('french')}</option>
                                                        <option
                                                            value="en">{translation?.t('english')}</option>
                                                    </select>
                                                </div>
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">{translation?.t('adresse')}</label>
                                                    <input
                                                        required={true}
                                                        placeholder={translation?.t('adresse')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="text"
                                                        value={formValues.adresse}
                                                        onChange={(e) => handleInputChange('adresse', e.target.value)} // Add onChange handler
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">Email</label>
                                                    <input
                                                        required={true}
                                                        placeholder={translation?.t('email_placeholder_form')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="email"
                                                        value={formValues.email}
                                                        onChange={(e) => handleInputChange('email', e.target.value)} // Add onChange handler
                                                    />
                                                </div>

                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">
                                                        {translation?.t('phone')}
                                                    </label>
                                                    <input
                                                        required={true}
                                                        placeholder={translation?.t('phone_placeholder_form')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="text"
                                                        value={formValues.numTel}
                                                        onChange={(e) => handleInputChange('numTel', e.target.value)} // Add onChange handler
                                                    />
                                                </div>

                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">
                                                        Commission
                                                    </label>
                                                    <input
                                                        required={true}
                                                        placeholder={translation?.t('phone_placeholder_form')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="number"
                                                        value={formValues.commission}
                                                        onChange={(e) => handleInputChange('commission', e.target.value)} // Add onChange handler
                                                    />
                                                </div>
                                                {isLoading ? <div className="flex justify-center">
                                                    <SpinnerUI/>
                                                </div> : <button
                                                    ref={focusElementRef}
                                                    onClick={handleActionUpdateOwner}
                                                    disabled={isButtonDisabled}
                                                    className={`flex w-full justify-center rounded  p-3 font-medium text-white  ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                >
                                                    {ownerDetails.isValidated ? translation?.t('form_edit_owner') : translation?.t('form_validate_owner')}
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
