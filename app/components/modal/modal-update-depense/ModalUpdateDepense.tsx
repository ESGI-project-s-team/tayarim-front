import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
    Dialog,
    Transition
} from '@headlessui/react';
import {useIsErrorContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {updateDepensesInFun} from "@/app/components/modal/modal-update-depense/actions";

interface FormValues {
    libelle: string;
    date: string;
    prix: number;
}

export default function ModalUpdateDepense({isOpen, onClose, depense, getAllDepense}: {
    isOpen: boolean;
    onClose: () => void;
    getAllDepense: any
    depense: any
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const [formValues, setFormValues] = useState<any>({...depense});
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext()
    const [isLoading, setLoading] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const {translation} = useTranslationContext();


    useEffect(() => {
        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const allFieldsFilled = Object.values(formValues).every(value => value?.toString().trim() !== '');
        setButtonDisabled(!allFieldsFilled);
    }, [formValues]);

    const handleInputChange = (field: keyof FormValues, value: any) => {
        setFormValues((prev: FormValues) => ({...prev, [field]: value})); // Update the specific field
    };

    const handleActionUpdateDepense = async () => {
        setLoading(true)
        try {
            updateDepensesInFun(formValues).then((response) => {
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
            return {errors: ["error_occurred"]};
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
                                                <h3 className="font-medium text-black">{translation?.t('modification_depense')}</h3>
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
                                                        value={formValues.libelle} // Add value attribute
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
                                                        value={formValues.date}
                                                        onChange={(e) => handleInputChange('date', e.target.value)} // Add onChange handler
                                                    />
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
                                                        value={formValues.prix}
                                                        onChange={(e) => handleInputChange('prix', parseFloat(e.target.value))} // Add onChange handler
                                                    />
                                                </div>
                                                {isLoading ? <div className="flex justify-center">
                                                        <SpinnerUI/>
                                                    </div> :
                                                    <button
                                                        type="button"
                                                        ref={focusElementRef}
                                                        onClick={handleActionUpdateDepense}
                                                        disabled={isButtonDisabled}
                                                        className={`flex w-full justify-center rounded p-3 font-medium text-white ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                    >
                                                        {translation?.t('modification_depense')}
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
