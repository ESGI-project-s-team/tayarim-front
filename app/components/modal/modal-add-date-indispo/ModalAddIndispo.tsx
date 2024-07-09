import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useIsErrorContext, useNavbarContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import DatePickerRangerCustomForm from "@/app/components/ui/DatePickerRangerCustomForm";
import {getDatesIndispoByIdHousingInFun} from "@/app/components/details-result/actions";
import {getDaysDifference} from "@/utils/constants";
import {createIndispoInFun, deleteIndispoInFun} from "@/app/components/modal/modal-add-date-indispo/actions";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import DateFormaterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import {FaTrash} from "react-icons/fa";

export default function ModalAddIndispo({datesBloquer, isOpen, onClose, id, getAllIndispo}: {
    datesBloquer: any;
    isOpen: boolean;
    onClose: () => void;
    id: number;
    getAllIndispo: any
}) {
    const {translation} = useTranslationContext()
    const [datesIndispo, setDatesIndispo] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setSuccess} = useSuccessContext()
    const {setError} = useIsErrorContext()
    const {theLanguage} = useNavbarContext()
    const [dateBloquerFiltered, setDateBloquerFiltered] = useState([])

    useEffect(() => {
        if (id) {
            getDatesIndispoByIdHousingInFun(parseInt(id.toString()))
                .then((res) => {
                    if (!res?.errors) {
                        setDatesIndispo(res)
                        setDateBloquerFiltered(datesBloquer.filter((bloquer: any) => bloquer.idLogement == parseInt(id.toString())))
                    }
                });
        }
    }, [datesBloquer, id]);
    const handleInputChange = (field: string, value: React.SetStateAction<any>) => {
        if (value !== null) {
            if (field === 'dateArrivee') {
                setStartDate(value);
            } else if (field === 'dateDepart') {
                setEndDate(value);
            }
        }
    };
    const handleDeleteIndispo = (id: number) => {
        setIsLoading(true);
        deleteIndispoInFun(id)
            .then((res) => {
                if (!res.errors) {
                    setSuccess(true);
                    onClose();
                    getAllIndispo();
                } else {
                    setError(res.errors);
                }
                setIsLoading(false);
            });
    }
    const handleCreateIndispo = () => {

        if (startDate && endDate) {
            setIsLoading(true);
            const difference = getDaysDifference(startDate, endDate);
            if (difference > 0) {
                const body = {
                    idLogement: id,
                    dateDebut: startDate,
                    dateFin: endDate,
                }

                createIndispoInFun(body)
                    .then((res) => {
                        if (!res.errors) {
                            setSuccess(true);
                            onClose();
                            getAllIndispo();
                        } else {
                            setError(res.errors);
                        }
                        setIsLoading(false);
                    });
            }
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
                                                <h3 className="font-medium text-black">{translation?.t('add_indispo')}</h3>
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
                                                <h5 className={"mb-2 text-sm font-medium text-gray-950 mt-2"}>{translation?.t('add_indispo')}</h5>
                                                <div>
                                                    {dateBloquerFiltered?.length > 0 ? (
                                                        <div
                                                            className="flex flex-wrap gap-2 text-sm max-h-32 overflow-y-auto no-scrollbar p-2 bg-gray-50 rounded-lg ">
                                                            {dateBloquerFiltered.map((date: any, index: number) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center bg-white p-2 rounded-md shadow-sm border cursor-pointer hover:bg-red-50 transition duration-300 ease-in-out"
                                                                    onClick={() => handleDeleteIndispo(date.id)}
                                                                >
                                                                    <DateFormaterEnFr date={date.dateDebut}
                                                                                      theLanguage={theLanguage}/>
                                                                    <span className="mx-1">-</span>
                                                                    <DateFormaterEnFr date={date.dateFin}
                                                                                      theLanguage={theLanguage}/>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="w-4 h-4 ml-3 text-red-600"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="mt-2 text-xs text-gray-500">{translation?.t('no_indispo')}</div>
                                                    )}
                                                </div>

                                                <h5 className={"mb-2 text-sm font-medium text-gray-950 mt-10"}>{translation?.t('indispo_dates')}</h5>
                                                <DatePickerRangerCustomForm
                                                    datesIndispo={datesIndispo}
                                                    placeholder={translation?.t('btn_date')}
                                                    days={translation?.t('days', {returnObjects: true})}
                                                    months={translation?.t('months', {returnObjects: true})}
                                                    handleInputChange={handleInputChange}
                                                />
                                                {isLoading ?
                                                    <SpinnerUI/>
                                                    :
                                                    <button
                                                        className={`w-full py-3 rounded-lg mt-10 ${!startDate || !endDate ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white'}`}
                                                        disabled={!startDate || !endDate}
                                                        onClick={() => handleCreateIndispo()}
                                                    >
                                                        {translation?.t('validate')}
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
