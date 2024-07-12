import React, {FormEvent, useState} from "react";
import {
    useIsErrorContext, useNavbarContext, useSuccessContext,
    useTranslationContext,
} from "@/app/[lng]/hooks";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {claimReservationFun, findReservationFun} from "@/app/components/ui/modification-reservation/actions";
import DateFormatterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import {HiOutlineUserGroup} from "react-icons/hi";
import {HiOutlineCalendar} from "react-icons/hi";
import {HiOutlineClock} from "react-icons/hi";

const FormModificationReservation: React.FC = () => {
    const {translation} = useTranslationContext();
    const [isLoading, setLoading] = useState(false)
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [dataReservation, setDataReservation] = useState<any>(null)
    const {theLanguage} = useNavbarContext()

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
    }

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
    }

    return (
        <div
            className=" absolute w-full h-screen  bg-image flex lg:justify-around justify-center items-center ">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="fixed max-w-max top-32 sm:top-52 flex shadow-2xl ">
                <div className="bg-white rounded-xl p-14 justify-center mx-2">
                    {dataReservation ? (
                        <div>
                            <div className="space-y-4 ">
                                <div className="text-center">
                                    <p className="text-xl font-bold">{dataReservation.prenom} {dataReservation.nom}</p>
                                    <div className="flex justify-center">
                                        <p className="text-sm text-gray-500 mt-1">{translation?.t('create_at')}</p>
                                        <p className="text-sm text-gray-500 mt-1 ml-1"><DateFormatterEnFr
                                            date={dataReservation.dateReservation} theLanguage={theLanguage}/>
                                        </p>
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
                                    <p className={"ml-2"}><DateFormatterEnFr date={dataReservation.dateArrivee}
                                                                             theLanguage={theLanguage}/></p>
                                    <p className={"ml-2"}>-</p>
                                    <p className={"ml-2"}><DateFormatterEnFr date={dataReservation.dateDepart}
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

                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FormModificationReservation;
