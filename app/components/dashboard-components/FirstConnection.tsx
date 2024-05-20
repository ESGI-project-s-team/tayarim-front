"use client";
import "../../globals.css"
import React, {useState} from "react";
import ShowPasswordEye from "@/app/components/ui/ShowPasswordEye";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {
    useAdminContext,
    useIsErrorContext,
    useSuccessContext,
    useTranslationContext,
} from "@/app/[lng]/hooks";
import Navbar from "@/app/components/home-components/ui/NavBar";
import {updateAdminInFun, updateOwnerInFun} from "@/app/components/modal/modal-info-user/action";
import TooltipPersonalized from "@/app/components/ui/TooltipPersonalized";

export default function FirstConnection() {
    const {translation} = useTranslationContext();
    const {setError} = useIsErrorContext();
    const {setSuccess} = useSuccessContext();
    const [isLoading, setLoading] = useState(false)
    const {isAdmin} = useAdminContext();

    const handleActionUpdateOwner = async (credentials: any) => {
        setLoading(true)
        try {
            if (isAdmin) {
                updateAdminInFun(credentials).then((response) => {
                    if (response.errors) {
                        setError(response.errors)
                    } else {
                        setSuccess(true)
                        // remove first connection in url
                        window.location.href = window.location.href.replace("first-connection", "")
                    }
                    setLoading(false)
                });
            } else {
                updateOwnerInFun(credentials).then((response) => {
                    if (response.errors) {
                        setError(response.errors)
                    } else {
                        setSuccess(true)
                        window.location.href = window.location.href.replace("first-connection", "")
                    }
                    setLoading(false)
                });
            }
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    };
    const handleSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const password1 = formData.get('password1')
        const password2 = formData.get('password2')
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

        if (password1 !== null && password2 !== null) {
            if (!regexPassword.test(password1 as string)) {
                setError(["error_admin_invalid_password"])
                setLoading(false)
                return
            }
            if (password1 !== password2) {
                setError(["error_not_same_password"])
                setLoading(false)
                return
            }
            const credentials = {"id": localStorage.getItem("id"), "motDePasse": password1}
            await handleActionUpdateOwner(credentials)

        }
    }

    return (
        <>
            <Navbar/>
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
                    <br/>
                    <p>{translation?.t('new_password_label')}</p>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
                        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <div className={"flex"}>
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        {translation?.t('new_password_placeholder')}
                                    </label>
                                    <TooltipPersonalized description={translation?.t('password_requirements')}/>
                                </div>
                                <ShowPasswordEye idInput="password1"/>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        {translation?.t('confirm_password_placeholder')}
                                    </label>
                                </div>
                                <ShowPasswordEye idInput="password2"/>
                            </div>

                            <div>
                                {isLoading ? <div className="flex justify-center items-center">
                                        <SpinnerUI/>
                                    </div> :
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-custom-search px-3 py-1.5 text-sm font-semibold leading-6 text-black border-black border shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        {translation?.t('edit')}
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};