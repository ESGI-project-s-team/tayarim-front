import React, {FormEvent, useEffect, useState} from "react";
import {
    useIsErrorContext,
    useTranslationContext,
} from "@/app/[lng]/hooks";
import {useRouter} from 'next/navigation'
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import ShowPasswordEye from "@/app/components/ui/ShowPasswordEye";

const FormModificationReservation: React.FC = () => {
    const {translation} = useTranslationContext();
    const [isLoading, setLoading] = useState(false)
    const {setError} = useIsErrorContext();
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const credentials = {"email": email, "motDePasse": password}

        setLoading(true)

    }

    return (
        <div className="fixed xxs-mtop inset-x-0 max-w-max mx-auto flex shadow-2xl ">
            <div className="bg-white rounded-xl p-14">
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="mx-auto h-10 w-auto "
                        src="/white-logo-short-removebg.png"
                        alt="Your Company"
                    />

                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit}>


                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                {translation?.t('code_reservation')}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                {translation?.t('email_or_numTel')}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            {/*date Arrivéé*/}
                            <label htmlFor="date"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                {translation?.t('start_date')}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            {isLoading ? <div className="flex justify-center">
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
    );
}

export default FormModificationReservation;