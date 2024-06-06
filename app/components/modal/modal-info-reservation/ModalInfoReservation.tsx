import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import TooltipPersonalized from "@/app/components/ui/TooltipPersonalized";
import {useTranslationContext} from "@/app/[lng]/hooks";

export default function ModalInfoReservation({isOpen, onClose, infosReservation}: {
    isOpen: boolean;
    onClose: () => void;
    infosReservation: any;
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
                                                <h3 className="font-medium text-black">{translation?.t('info_reservation')}</h3>
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
                                                <div className="flex justify-center">
                                                    <img src="https://via.placeholder.com/150" alt="Photo de Profil"
                                                         className="w-24 h-24 rounded-full shadow-md"/>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <h2 className="text-xl font-semibold">Nom de la Personne</h2>
                                                </div>
                                                <form className="mt-8 space-y-6">
                                                    <div>
                                                        <label htmlFor="start-date"
                                                               className="block text-sm font-medium text-gray-700">
                                                            {
                                                                translation?.t('start_date')
                                                            }
                                                        </label>
                                                        <input type="date" id="start-date" name="start-date"
                                                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="end-date"
                                                               className="block text-sm font-medium text-gray-700">
                                                            {
                                                                translation?.t('end_date')
                                                            }
                                                        </label>
                                                        <input type="date" id="end-date" name="end-date"
                                                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="price"
                                                               className="block text-sm font-medium text-gray-700">{
                                                            translation?.t('price')
                                                        }</label>
                                                        <input type="number" id="price" name="price" step="0.01"
                                                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                                    </div>
                                                </form>
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
