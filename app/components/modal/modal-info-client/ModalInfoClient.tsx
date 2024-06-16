import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useTranslationContext} from "@/app/[lng]/hooks";

export default function ModalInfoClient({isOpen, onClose, user}: {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}) {
    const {translation} = useTranslationContext()

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
                                                <h3 className="font-medium text-black">{translation?.t('info_client')}</h3>
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
                                                <div className="text-center mt-4">
                                                    <h2 className="text-xl font-semibold">{`${user.prenom} ${user.nom}`}</h2>
                                                </div>
                                                <div className="mt-8 space-y-6">
                                                    <div>
                                                        <label htmlFor="email"
                                                               className="block text-sm font-medium text-gray-700">
                                                            Email
                                                        </label>
                                                        <input type="email" id="email" name="email" value={user.email}
                                                               readOnly
                                                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"/>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="numTel"
                                                               className="block text-sm font-medium text-gray-700">
                                                            {translation?.t('phone')}
                                                        </label>
                                                        <input type="tel" id="numTel" name="numTel" value={user.numTel}
                                                               readOnly
                                                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"/>
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
    )
        ;
}
