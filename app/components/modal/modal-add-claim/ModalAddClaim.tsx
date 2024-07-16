import React, {FormEvent, Fragment, useState} from 'react';
import {
    Dialog,
    Transition
} from '@headlessui/react';
import {
    useIsErrorContext,
    useNavbarContext,
    useSuccessContext,
    useTranslationContext
} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import DateFormatterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import {HiOutlineCalendar, HiOutlineClock, HiOutlineUserGroup} from "react-icons/hi";
import {claimReservationFun} from "@/app/components/modal/modal-add-claim/actions";
import {FaCalendarCheck, FaDollarSign, FaUmbrellaBeach, FaCheckCircle} from 'react-icons/fa';

export default function ModalAddClaim({isOpen, onClose, dataReservation}: {
    isOpen: boolean;
    onClose: () => void;
    dataReservation: any;
}) {
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext()
    const [isLoading, setLoading] = useState(false)
    const {translation} = useTranslationContext();
    const {theLanguage} = useNavbarContext();

    const statusSteps = ['reserved', 'payed', 'in_progress', 'done'];
    const getStatusIndex = (status: any) => statusSteps.indexOf(status);
    const currentStatusIndex = getStatusIndex(dataReservation.statut);

    const getIconForStep = (step: string) => {
        switch (step) {
            case 'reserved':
                return <FaDollarSign/>;
            case 'payed':
                return <FaCalendarCheck/>;
            case 'in_progress':
                return <FaUmbrellaBeach/>;
            case 'done':
                return <FaCheckCircle/>;
            default:
                return null;
        }
    };

    async function handleSubmitClaim(event: FormEvent<HTMLFormElement>) {
        setLoading(true)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const message = formData.get('claim')
        const credentials = {
            "id": dataReservation.id,
            "message": message
        }
        const response = await claimReservationFun(credentials)
            .finally(() => setLoading(false))
        if (response.errors) {
            setError(response.errors)
            return
        }
        setError(null)
        setSuccess(true)
        onClose();
    }

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
                                            <div className=" border-[#dee4ee] pt-2 flex justify-end px-7">
                                                <button onClick={onClose} className="text-[#3c50e0] font-medium mt-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                         className="w-6 h-6 text-[#3c50e0]">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className={"p-7"}>
                                                <div className="  space-y-6">
                                                    <div className="text-center flex-col space-y-6 ">
                                                        <div>
                                                            <p className="text-xl font-bold">{dataReservation.prenom} {dataReservation.nom}</p>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <p className="text-sm text-gray-500 mt-1">{translation?.t('create_at')}</p>
                                                            <p className="text-sm text-gray-500 mt-1 ml-1">
                                                                <DateFormatterEnFr
                                                                    date={dataReservation.dateReservation}
                                                                    theLanguage={theLanguage}/>
                                                            </p>
                                                        </div>
                                                        <div className={"flex-col justify-center"}>
                                                            <div>
                                                                <p className={"text-sm text-black mt-1 ml-1 "}>{translation?.t('statut_reservation')}</p>
                                                            </div>
                                                            <div>
                                                                {dataReservation.statut === 'cancelled' ? (
                                                                        <div className="flex justify-center mt-4 ">
                                                                            <div className="flex items-center">
                                                                                <div
                                                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                                         fill="none" viewBox="0 0 24 24"
                                                                                         strokeWidth="2"
                                                                                         stroke="currentColor"
                                                                                         className="w-5 h-5 text-white">
                                                                                        <path strokeLinecap="round"
                                                                                              strokeLinejoin="round"
                                                                                              d="M6 18L18 6M6 6l12 12"/>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) :
                                                                    <div className="flex justify-center mt-4">
                                                                        {statusSteps.map((step, index) => (
                                                                            <div key={step}
                                                                                 className="flex items-center">
                                                                                <div
                                                                                    className={`flex items-center justify-center w-8 h-8 rounded-full p-4 ${index <= currentStatusIndex ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                                                    {index <= currentStatusIndex ? (
                                                                                        <span
                                                                                            className="text-sm text-gray-700">
                                                                                {getIconForStep(step)}
                                                                                     </span>
                                                                                    ) : (
                                                                                        <span
                                                                                            className="text-white text-xs">
                                                                                {getIconForStep(step)}
                                                                                            </span>
                                                                                    )}
                                                                                </div>
                                                                                {index < statusSteps.length - 1 && (
                                                                                    <div
                                                                                        className={`h-1 w-8 ${index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-300'}`}/>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <hr/>
                                                    <div className={"flex text-sm"}>
                                                        <HiOutlineUserGroup size={17} className={"mt-0.5"}/>
                                                        <p className={"ml-2"}>
                                                            {dataReservation.nbPersonnes}
                                                        </p>
                                                        <p className={"ml-2"}>
                                                            {translation?.t('personne')}
                                                        </p>
                                                    </div>
                                                    <div className={"flex text-sm"}>
                                                        <HiOutlineCalendar size={17} className={"mt-0.5"}/>
                                                        <p className={"ml-2"}><DateFormatterEnFr
                                                            date={dataReservation.dateArrivee}
                                                            theLanguage={theLanguage}/></p>
                                                        <p className={"ml-2"}>-</p>
                                                        <p className={"ml-2"}><DateFormatterEnFr
                                                            date={dataReservation.dateDepart}
                                                            theLanguage={theLanguage}/></p>
                                                    </div>
                                                    <div className={"flex text-sm"}>
                                                        <HiOutlineClock size={17} className={"mt-0.5"}/>
                                                        <p className={"ml-2"}>{dataReservation.checkIn}</p>
                                                        <p className={"ml-2"}>-</p>
                                                        <p className={"ml-2"}>{dataReservation.checkOut}</p>
                                                    </div>
                                                    <hr/>
                                                    <div>
                                                        <div className={"flex justify-between"}>
                                                            <strong>Total:</strong>
                                                            <p>{dataReservation.montant} €</p>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="mt-6">
                                                    <form method="POST" onSubmit={handleSubmitClaim}>
                                                        <label htmlFor="notes"
                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                            {translation?.t('claim')}
                                                        </label>
                                                        <textarea
                                                            id="claim"
                                                            name="claim"
                                                            rows={4}
                                                            cols={40}
                                                            style={{resize: "none"}}
                                                            required={true}
                                                            className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                                                            placeholder={translation?.t('placeholder_claim')}
                                                        />
                                                        {isLoading ?
                                                            <div className="flex justify-center mt-2">
                                                                <SpinnerUI/>
                                                            </div> :
                                                            <button
                                                                type="submit"
                                                                className="mt-4 w-full rounded-md bg-custom-search px-3 py-1.5 text-sm font-semibold leading-6 text-black border-black border shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                            >
                                                                Envoyer
                                                            </button>
                                                        }
                                                    </form>
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
