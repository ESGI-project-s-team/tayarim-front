import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
    useIsErrorContext,
    useSuccessContext,
    useTranslationContext,
} from "@/app/[lng]/hooks";
import {updateAdminInFun, updateOwnerInFun} from "@/app/components/modal/modal-info-user/action";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import TooltipPersonalized from "@/app/components/ui/TooltipPersonalized";
import {isAdminByToken} from "@/utils/apiAuth";

export default function ModalInfoUser({isOpen, onClose, setData, data}: {
    isOpen: boolean;
    onClose: () => void;
    setData: any;
    data: any;
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false)
    const {translation} = useTranslationContext();
    const [formValues, setFormValues] = useState<any>(data); // Initial state from `owner`
    const [showPassword, setShowPassword] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isAdmin, setIsAdmin] = useState<any>(undefined);
    useEffect(() => {
        isAdminByToken().then(
            (response) => {
                if (!response.error && response !== false && response !== undefined) {
                    setIsAdmin(response.admin);
                } else {
                    setIsAdmin(false)
                }
                setLoading(false)
            }
        );
    });
    useEffect(() => {
        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!@#$%&*()_+\-=\[\]?]).{8,}$/;
        //the passwordRegex is a regex that checks if the password has at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character

        const emailValid = emailRegex.test(formValues.email);
        const phoneValid = phoneRegex.test(formValues.numTel);
        let passwordValid;
        if (formValues.motDePasse !== undefined && formValues.motDePasse !== '') {
            passwordValid = passwordRegex.test(formValues.motDePasse);
        } else {
            passwordValid = true
        }
        setButtonDisabled(!(emailValid && phoneValid && passwordValid));
    }, [formValues]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (field: keyof any, value: any) => {
        setFormValues((prev: any) => ({...prev, [field]: value})); // Update the specific field
    };

    const handleActionUpdate = async () => {
        setLoading(true)
        try {
            Object.keys(data).forEach((key) => {
                if (data[key] === formValues[key]) {
                    if (key === 'motDePasse' && (formValues[key] === '' || formValues[key] === undefined)) {
                        delete formValues[key]
                    }
                    if (key !== 'id')
                        delete formValues[key]
                }
            })
            if (isAdmin) {
                updateAdminInFun(formValues).then((response) => {
                    if (response.errors) {
                        setError(response.errors)
                        setFormValues({...data})
                    } else {
                        setSuccess(true)
                        setIsAdmin(response.admin)
                        localStorage.setItem("id", response.id)
                        localStorage.setItem("nom", response.nom)
                        localStorage.setItem("prenom", response.prenom)
                        localStorage.setItem("email", response.email)
                        localStorage.setItem("numTel", response.numTel)
                        localStorage.setItem("lang", response.lang)
                        setData(response)
                        onClose();
                    }
                    setLoading(false)
                });
            } else {
                updateOwnerInFun(formValues).then((response) => {
                    if (response.errors) {
                        setError(response.errors)
                    } else {
                        setSuccess(true)
                        setIsAdmin(response.admin)
                        localStorage.setItem("id", response.id)
                        localStorage.setItem("nom", response.nom)
                        localStorage.setItem("prenom", response.prenom)
                        localStorage.setItem("email", response.email)
                        localStorage.setItem("numTel", response.numTel)
                        localStorage.setItem("lang", response.lang)
                        setData(response)
                        onClose();
                    }
                    setLoading(false)
                });
            }
        } catch (error) {
            setLoading(false)
            setError(error)
            setFormValues({...data})
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

                <div className="fixed inset-0 overflow-y-auto ">
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
                                className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50 ">
                                <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                                    <div className="flex flex-col gap-9">
                                        <div className="rounded-sm border stroke-1 bg-white shadow">
                                            <div className="border-b border-[#dee4ee] py-4 flex justify-between px-7">
                                                <h3 className="font-medium text-black">{translation?.t('edit_info')}</h3>
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
                                                            value={formValues?.prenom}
                                                            onChange={(e) => handleInputChange('prenom', e.target.value)} // Add onChange handler
                                                        />
                                                    </div>

                                                    <div className="w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            {translation?.t('form_lastname')}</label>
                                                        <input
                                                            placeholder={translation?.t('last_name_placeholder_form')}
                                                            value={formValues?.nom}
                                                            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                            type="text"
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
                                                        className="mb-3 block text-sm font-medium text-black">Email</label>
                                                    <input
                                                        placeholder={translation?.t('email_placeholder_form')}
                                                        value={formValues?.email}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="email"
                                                        onChange={(e) => handleInputChange('email', e.target.value)} // Add onChange handler
                                                    />
                                                </div>

                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">
                                                        {translation?.t('phone')}
                                                    </label>
                                                    <input
                                                        placeholder={translation?.t('phone_placeholder_form')}
                                                        value={formValues?.numTel}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="text"
                                                        onChange={(e) => handleInputChange('numTel', e.target.value)} // Add onChange handler
                                                    />
                                                </div>
                                                <div className="relative mb-5">
                                                    <div className="flex">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            {translation?.t('new_password_placeholder')}
                                                        </label>
                                                        <TooltipPersonalized
                                                            description={translation?.t('password_requirements')}/>
                                                    </div>
                                                    <input
                                                        placeholder={translation?.t('password_placeholder_form')}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type={showPassword ? "text" : "password"}
                                                        onChange={(e) => handleInputChange('motDePasse', e.target.value)} // Add onChange handler
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {showPassword ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 strokeWidth="1.5" stroke="currentColor"
                                                                 className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 strokeWidth="1.5" stroke="currentColor"
                                                                 className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                                            </svg>
                                                        }
                                                    </button>
                                                </div>
                                                {isLoading ? <div className="flex justify-center">
                                                        <SpinnerUI/>
                                                    </div> :
                                                    <button
                                                        ref={focusElementRef}
                                                        onClick={handleActionUpdate}
                                                        disabled={isButtonDisabled}
                                                        className={`flex w-full justify-center rounded  p-3 font-medium text-white  ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c50e0] hover:bg-opacity-90'}`}
                                                    >
                                                        {translation?.t('edit_info')}
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
    )
        ;
}
