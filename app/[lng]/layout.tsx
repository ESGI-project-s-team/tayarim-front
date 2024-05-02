"use client";
import React, {useEffect, useState} from "react";
import {doTranslation} from "@/app/il8n";
import {
    NavbarContext,
    TranslationContext,
    IsOpenContext,
    LoaderContext,
    IsErrorContext,
    IsAdminContext
} from "./contexts";
import Loader from "@/app/components/Loader";
import ErrorsManagement from "@/utils/apiErrors";
import {isAdminByToken} from "@/utils/apiAuth";

export default function RootLayout({children, params: {lng}}: { children: React.ReactNode; params: { lng: string } }) {
    const [theLanguage, setTheLanguage] = useState(lng);
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isError, setError] = useState(undefined);

    useEffect(() => {
        console.log('RootLayout')
        async function fetchTranslation() {
            const t = await doTranslation(theLanguage);
            setTranslation(t);
        }
        fetchTranslation().then();

        async function isAdmin() {
            await isAdminByToken().then(
                async (response) => {
                    if (response.error) {
                        setError(response.error)
                    } else {
                        setIsAdmin(response)
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

    }, [theLanguage, loading, isAdmin, isError]);

    return (
        <html lang={lng}>
        <head>
            <title>Tayarim</title>
        </head>
        <TranslationContext.Provider value={{translation}}>
            <IsErrorContext.Provider value={{isError, setError}}>
                <IsAdminContext.Provider value={{isAdmin, setIsAdmin}}>
                    <NavbarContext.Provider value={{theLanguage, setTheLanguage}}>
                        <IsOpenContext.Provider value={{isOpen, setIsOpen}}>
                            <LoaderContext.Provider value={{loading, setLoading}}>
                                {isError ? <ErrorsManagement data={isError}/> : null}
                                <body>
                                <main>
                                    {loading ? <Loader/> : null}
                                    {children}
                                </main>
                                </body>
                            </LoaderContext.Provider>
                        </IsOpenContext.Provider>
                    </NavbarContext.Provider>
                </IsAdminContext.Provider>
            </IsErrorContext.Provider>
        </TranslationContext.Provider>
        </html>
    );
}
