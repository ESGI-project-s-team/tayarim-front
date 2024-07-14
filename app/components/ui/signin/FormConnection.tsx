import React, {FormEvent, useEffect, useState} from "react";
import {
    useIsErrorContext,
    useTranslationContext,
} from "@/app/[lng]/hooks";
import {checkTokenInFun, signInFun} from "@/app/components/ui/signin/action";
import {useRouter} from 'next/navigation'
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import ShowPasswordEye from "@/app/components/ui/ShowPasswordEye";

const FormConnection: React.FC = () => {
    const {translation} = useTranslationContext();
    const [isLoading, setLoading] = useState(false)
    const {setError} = useIsErrorContext();
    const router = useRouter()


    useEffect(
        () => {
            checkTokenInFun().then(
                async (response) => {
                    if (!response.errors) {
                        if (response.isPasswordUpdated === true) {
                            router.push("/dashboard")
                        } else if (response.isPasswordUpdated === false) {
                            router.push("/dashboard/first-connection")
                        }
                    }
                }
            )
        }, [router, setLoading]
    )

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const credentials = {email, motDePasse: password};

        setLoading(true);
        try {
            const response = await signInFun(credentials);
            if (response !== false) {
                if (response.error) {
                    setError(response.error);
                } else if (response.errors) {
                    setError(response.errors);
                } else {
                    setError(null);
                    const user = {
                        id: response.id,
                        nom: response.nom,
                        prenom: response.prenom,
                        email: response.email,
                        numTel: response.numTel,
                        lang: response.lang
                    };
                    localStorage.setItem("id", user.id);
                    localStorage.setItem("nom", user.nom);
                    localStorage.setItem("prenom", user.prenom);
                    localStorage.setItem("email", user.email);
                    localStorage.setItem("numTel", user.numTel);
                    localStorage.setItem("lang", user.lang);

                    if (response.isPasswordUpdated === true) {
                        router.push("/dashboard");
                    } else if (response.isPasswordUpdated === false) {
                        router.push("/dashboard/first-connection");
                    }
                }
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="align-middle">
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
                            <ShowPasswordEye/>
                        </div>

                        <div>
                            {isLoading ? <div className="flex justify-center">
                                    <SpinnerUI/>
                                </div> :
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-custom-search px-3 py-1.5 text-sm font-semibold leading-6 text-black border-black border shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    {translation?.t('sign_in_button')}
                                </button>
                            }
                        </div>
                    </form>
                    <div className="flex-wrap  justify-between ">
                        <p className="mt-5 text-center text-sm text-gray-500">
                            <a href="/password-reset" className="underline leading-6 text-black">
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