import React, {FormEvent, useState} from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";
import {signInFun} from "@/app/components/ui/signin/action";
import Loader from "@/app/components/Loader";
import {useRouter} from 'next/navigation'

const FormConnection: React.FC = () => {
    const {translation} = useTranslationContext();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        setLoading(true)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const credentials = {"email": email, "motDePasse": password}
        await signInFun(credentials).then(
            async (response) => {
                if (response.error) {
                    setError(response.error)
                } else {
                    router.push("/dashboard")
                }
                await new Promise((resolve) => setTimeout(resolve, 500));
                setLoading(false)
            }
        )
    }

    return (
        <div className="fixed xxs-mtop inset-x-0 max-w-max mx-auto flex shadow-2xl">
            <div className="bg-white rounded-xl p-14 overflow-scroll ">
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
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                {translation?.t('email_placeholder')}
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    {translation?.t('password_placeholder')}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            {loading && (
                                <Loader/>
                            )}{(
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-custom-search px-3 py-1.5 text-sm font-semibold leading-6 text-black border-black border shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >

                                {translation?.t('sign_in_button')}
                            </button>
                        )}
                            {error && <p className="text-red-500 text-sm absolute">{translation?.t(error)}</p>}
                        </div>
                    </form>
                    <div className="flex-wrap  justify-between ">
                        <p className="mt-10 text-center text-sm text-gray-500">
                            <a href="#" className="underline leading-6 text-black">
                                {translation?.t('forgot_email')}
                            </a>
                        </p>
                        <p className="mt-5 text-center text-sm text-gray-500">
                            <a href="#" className="underline leading-6 text-black">
                                {translation?.t('forgot_password')}
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FormConnection;