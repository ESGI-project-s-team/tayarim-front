import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useTranslationContext} from "@/app/[lng]/hooks";
import {GrValidate} from "react-icons/gr";

export default function ModalEmailSend({isOpen, onClose}: {
    isOpen: boolean,
    onClose: () => void
}) {
    const {translation} = useTranslationContext();
    return (
        <>
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
                        <div className="fixed inset-0 bg-black bg-opacity-50"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                                    className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="rounded-lg border border-gray-300 bg-white shadow">
                                        <div
                                            className="border-b border-gray-200 py-4 px-6 flex justify-between items-center">
                                            <div className={"flex"}>
                                                <h3 className="font-semibold text-lg text-gray-900">{translation?.t('thanks')}</h3>
                                                <GrValidate size={20} className={"text-green-600 ml-2 mt-1"}/>
                                            </div>
                                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-4 flex flex-col gap-4">
                                                <h3 className="font-medium text-gray-900">{translation?.t('send_email')}</h3>
                                                <p className="text-gray-600">{translation?.t('send_email_confirmation')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
