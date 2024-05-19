"use client";
import React, {useEffect, useState} from "react";
import {doTranslation} from "@/app/il8n";
import {
    NavbarContext,
    TranslationContext,
    IsOpenContext,
    LoaderContext,
    IsErrorContext,
    IsAdminContext,
    UserInfoContext,
    IsSuccessContext
} from "./contexts";
import Loader from "@/app/components/Loader";
import ErrorsManagement from "@/utils/apiErrors";
import {isAdminByToken} from "@/utils/apiAuth";
import SuccessManagement from "@/utils/apiSuccess";
import {pile} from "@/pile";
import {useRouter} from 'next/navigation';

export default function RootLayout({children, params: {lng}}: { children: React.ReactNode; params: { lng: string } }) {
    const [theLanguage, setTheLanguage] = useState(lng);
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(undefined);
    const [isError, setError] = useState(null);
    const [isSuccess, setSuccess] = useState(null);
    const router = useRouter();
    const [userInfos, setUserInfos] = useState({});


    useEffect(() => {
        console.log('RootLayout')

        async function replaceAlertSuccessOrError() {
            if (isError == null || isSuccess == null) {
                if (isError != null) {
                    pile.push(false)
                }
                if (isSuccess != null) {
                    pile.push(true)
                }
            } else {
                let lastValueIndex = pile[pile.length - 1];
                if (lastValueIndex) {
                    pile[pile.length - 1] = false;
                    setSuccess(null)
                } else {
                    pile[pile.length - 1] = true;
                    setError(null)
                }
            }
        }

        replaceAlertSuccessOrError().then();

        async function fetchTranslation() {
            const t = await doTranslation(theLanguage);
            setTranslation(t);
        }

        fetchTranslation().then();

        async function isAdmin() {
            await isAdminByToken().then(
                async (response) => {
                    if (!response.error && response !== false && response !== undefined) {
                        setIsAdmin(response.admin)
                    }
                }
            )
        }

        isAdmin().then();

        async function loader() {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setLoading(false);
        }

        loader().then();

        async function fetchInfoUser() {
            const user = {
                id: localStorage.getItem("id"),
                nom: localStorage.getItem("nom"),
                prenom: localStorage.getItem("prenom"),
                email: localStorage.getItem("email"),
                numTel: localStorage.getItem("numTel"),
            }
            setUserInfos(user);
        }

        fetchInfoUser().then();

    }, [theLanguage, loading, isAdmin, isError, isSuccess, router]);

    return (
        <html lang={lng}>
        <head>
            <title>Tayarim</title>
        </head>
        <TranslationContext.Provider value={{translation}}>
            <IsErrorContext.Provider value={{isError, setError}}>
                <IsSuccessContext.Provider value={{isSuccess, setSuccess}}>
                    <IsAdminContext.Provider value={{isAdmin, setIsAdmin}}>
                        <UserInfoContext.Provider value={{userInfos, setUserInfos}}>
                            <NavbarContext.Provider value={{theLanguage, setTheLanguage}}>
                                <IsOpenContext.Provider value={{isOpen, setIsOpen}}>
                                    <LoaderContext.Provider value={{loading, setLoading}}>
                                        {isError ? <ErrorsManagement data={isError}/> : null}
                                        {isSuccess ? <SuccessManagement/> : null}
                                        <body>
                                        <main>
                                            {loading ? <Loader/> : null}
                                            {children}
                                        </main>
                                        </body>
                                    </LoaderContext.Provider>
                                </IsOpenContext.Provider>
                            </NavbarContext.Provider>
                        </UserInfoContext.Provider>
                    </IsAdminContext.Provider>
                </IsSuccessContext.Provider>
            </IsErrorContext.Provider>
        </TranslationContext.Provider>
        </html>
    )
        ;
}
