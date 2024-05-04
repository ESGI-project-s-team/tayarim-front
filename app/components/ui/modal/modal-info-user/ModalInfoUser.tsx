import {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
    useAdminContext,
    useIsErrorContext,
    useLoaderContext,
    useTranslationContext,
    useUserInfoContext
} from "@/app/[lng]/hooks";
import {updateAdminInFun, updateOwnerInFun} from "@/app/components/ui/modal/modal-info-user/action";


export default function ModalInfoUser({isOpen, onClose}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const focusElementRef = useRef<HTMLButtonElement | null>(null);
    const {setError} = useIsErrorContext();
    const {setLoading} = useLoaderContext();
    const {translation} = useTranslationContext();
    const {userInfos} = useUserInfoContext();
    const {setIsAdmin, isAdmin} = useAdminContext();
    const [formValues, setFormValues] = useState<any>(userInfos); // Initial state from `owner`

    useEffect(() => {
        if (focusElementRef.current) {
            focusElementRef.current.focus();
        }
    }, []);

    const handleInputChange = (field: keyof any, value: any) => {
        setFormValues((prev: any) => ({...prev, [field]: value})); // Update the specific field
    };

    const handleActionUpdateOwner = async () => {
        try {
            Object.keys(userInfos).forEach((key) => {
                if (userInfos[key] === formValues[key]) {
                    if (key !== 'id')
                        delete formValues[key]
                }
            })
            if (isAdmin) {
                updateAdminInFun(formValues).then((response) => {
                    if (response.errors) {
                        setError(response.errors)
                    } else {
                        setError(null)
                        setLoading(true)
                        setIsAdmin(response.admin)
                        localStorage.setItem("id", response.id)
                        localStorage.setItem("nom", response.nom)
                        localStorage.setItem("prenom", response.prenom)
                        localStorage.setItem("email", response.email)
                        localStorage.setItem("numTel", response.numTel)
                        onClose();
                    }
                });
            } else {
                updateOwnerInFun(formValues).then((response) => {
                    if (response.errors) {
                        setError(response.errors)
                    } else {
                        setError(null)
                        setLoading(true)
                        setIsAdmin(response.admin)
                        localStorage.setItem("id", response.id)
                        localStorage.setItem("nom", response.nom)
                        localStorage.setItem("prenom", response.prenom)
                        localStorage.setItem("email", response.email)
                        localStorage.setItem("numTel", response.numTel)
                        onClose();
                    }
                });
            }
        } catch (error) {
            setError(error)
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
                                                <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                                                    <div className="w-full xl:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            {translation?.t('form_firstname')}
                                                        </label>
                                                        <input
                                                            placeholder="Enter your first name"
                                                            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 outline-none transition"
                                                            type="text"
                                                            value={formValues?.prenom}
                                                            onChange={(e) => handleInputChange('prenom', e.target.value)} // Add onChange handler
                                                        />
                                                    </div>

                                                    <div className="w-full xl:w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black">
                                                            {translation?.t('form_lastname')}</label>
                                                        <input
                                                            placeholder="Enter your last name"
                                                            value={formValues?.nom}
                                                            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                            type="text"
                                                            onChange={(e) => handleInputChange('nom', e.target.value)} // Add onChange handler
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black">Email</label>
                                                    <input
                                                        placeholder="Enter your email address"
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
                                                        placeholder="Enter your phone number"
                                                        value={formValues?.numTel}
                                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-black outline-none transition"
                                                        type="text"
                                                        onChange={(e) => handleInputChange('numTel', e.target.value)} // Add onChange handler
                                                    />
                                                </div>
                                                <button
                                                    ref={focusElementRef}
                                                    onClick={handleActionUpdateOwner}
                                                    className="flex w-full justify-center rounded bg-[#3c50e0] p-3 font-medium text-white hover:bg-opacity-90"
                                                >
                                                    {translation?.t('edit_info')}
                                                </button>
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
