"use client";
import React, {useEffect, useState} from "react";
import {doTranslation} from "@/app/il8n";
import {
    NavbarContext,
    TranslationContext,
    IsOpenContext,
    IsErrorContext,
    IsSuccessContext
} from "./contexts";
import ErrorsManagement from "@/utils/alertErrors";
import SuccessManagement from "@/utils/alertSuccess";
import {pile} from "@/pile";


export default function RootLayout({children, params: {lng}}: { children: React.ReactNode; params: { lng: string } }) {
    const [theLanguage, setTheLanguage] = useState(lng);
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setError] = useState(null);
    const [isSuccess, setSuccess] = useState(null);


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


    }, [theLanguage, isError, isSuccess]);

    return (
        <html lang={lng}>
        <head>
            <title>Tayarim</title>
        </head>
        <TranslationContext.Provider value={{translation}}>
            <IsErrorContext.Provider value={{isError, setError}}>
                <IsSuccessContext.Provider value={{isSuccess, setSuccess}}>
                    <NavbarContext.Provider value={{theLanguage, setTheLanguage}}>
                        <IsOpenContext.Provider value={{isOpen, setIsOpen}}>
                            {isError ? <ErrorsManagement data={isError}/> : null}
                            {isSuccess ? <SuccessManagement/> : null}
                            <body>
                            <main>
                                {children}
                            </main>
                            </body>
                        </IsOpenContext.Provider>
                    </NavbarContext.Provider>
                </IsSuccessContext.Provider>
            </IsErrorContext.Provider>
        </TranslationContext.Provider>
        </html>
    );
}
