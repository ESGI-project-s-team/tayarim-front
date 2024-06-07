import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useTranslationContext} from "@/app/[lng]/hooks";

export default function ModalInfoHousing({isOpen, onClose, housings}: {
    isOpen: boolean;
    onClose: () => void;
    housings: any[];
}) {
    const {translation} = useTranslationContext();
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentHousing = housings[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % housings.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + housings.length) % housings.length);
    };


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"/>
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
                                className="w-full max-w-xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50 relative">
                                {housings.length > 1 && (
                                    <>
                                        <div className="absolute inset-y-0 left-0 flex items-center ml-2">
                                            <button
                                                onClick={handlePrev}
                                                className="text-[#3c50e0] p-2 bg-white rounded-full  hover:bg-[#e0e4f7] transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15 19l-7-7 7-7"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="absolute inset-y-0 right-0 flex items-center mr-2">
                                            <button
                                                onClick={handleNext}
                                                className="text-[#3c50e0] p-2 bg-white rounded-full  hover:bg-[#e0e4f7] transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M9 5l7 7-7 7"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                )}
                                <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-8">
                                    <div className="flex flex-col gap-9">
                                        <div className="rounded-sm border border-gray-200 bg-white shadow">
                                            <div
                                                className="border-b border-gray-200 py-4 flex justify-between items-center px-7">
                                                <h3 className="font-medium text-lg text-black">
                                                    {translation?.t('info_house')}
                                                </h3>
                                                <button onClick={onClose} className="text-[#3c50e0] font-medium">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                         className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="p-7">
                                                <div className="text-center mt-4">
                                                    <h2 className="text-2xl font-semibold text-gray-800">
                                                        {currentHousing.titre}
                                                    </h2>
                                                    <br/>
                                                    <div className="mt-4 space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('price')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.prixParNuit &&
                                                                    <p className="text-sm text-black ml-2">{currentHousing.prixParNuit} €</p>
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('address')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.adresse}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('rooms')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.nombresDeChambres}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('beds')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.nombresDeLits}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('bathrooms')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.nombresSallesDeBains}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('capacity')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.capaciteMaxPersonne}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('minimum_nights')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.nombresNuitsMin}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('check_in')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.defaultCheckIn}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-gray-700">
                                                                {translation?.t('check_out')}:
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {currentHousing.defaultCheckOut}
                                                            </span>
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
