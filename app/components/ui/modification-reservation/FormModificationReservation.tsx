import React, {FormEvent, useState} from "react";
import {
    useIsErrorContext,
    useTranslationContext,
} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {findReservationFun} from "@/app/components/modal/modal-add-claim/actions";
import ModalAddClaim from "@/app/components/modal/modal-add-claim/ModalAddClaim";


const FormModificationReservation: React.FC = () => {
    const {translation} = useTranslationContext();
    const [isLoading, setLoading] = useState(false)
    const {setError} = useIsErrorContext();
    const [dataReservation, setDataReservation] = useState<any>(null)
    const [openClaim, setOpenClaim] = useState(false)

    function closeClaim() {
        setOpenClaim(false)
    }

    function openModalClaim() {
        setOpenClaim(true)
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        setLoading(true)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const code_reservation = formData.get('code_reservation')
        const identifier = formData.get('identifier')
        const dateArrivee = formData.get('dateArrivee')
        const credentials = {
            "identifier": identifier,
            "dateArrivee": dateArrivee,
            "code": code_reservation
        }
        const response = await findReservationFun(credentials)
            .finally(() => setLoading(false))
        if (response.errors) {
            setError(response.errors)
            return
        }
        setDataReservation(response)
        openModalClaim()
    }

    return (
        <div
            className=" absolute w-full h-screen  bg-image flex lg:justify-around justify-center items-center ">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="fixed max-w-max top-32 sm:top-52 flex shadow-2xl ">
                <div className="bg-white rounded-xl p-14 justify-center mx-2">

                    <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="mx-auto h-10 w-auto"
                            src="/white-logo-short-removebg.png"
                            alt="Your Company"
                        />
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="code_reservation"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    {translation?.t('code_reservation')}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="code_reservation"
                                        name="code_reservation"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="identifier"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    {translation?.t('email_or_numTel')}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="identifier"
                                        name="identifier"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="dateArrivee"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    {translation?.t('start_date')}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="dateArrivee"
                                        name="dateArrivee"
                                        type="date"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                {isLoading ?
                                    <div className="flex justify-center">
                                        <SpinnerUI/>
                                    </div> :
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-custom-search px-3 py-1.5 text-sm font-semibold leading-6 text-black border-black border shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        {translation?.t('validate')}
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                openClaim &&
                <ModalAddClaim dataReservation={dataReservation} onClose={closeClaim} isOpen={openClaim}/>
            }
        </div>
    );
}

export default FormModificationReservation;
