"use client";
import React, {useEffect, useState} from "react";
import {doTranslation} from "@/app/il8n";
import {NavbarContext, TranslationContext, IsOpenContext, LoaderContext, IsErrorContext} from "./contexts";
import Loader from "@/app/components/Loader";
import ErrorsManagement from "@/utils/apiErrors";

export default function RootLayout({children, params: {lng}}: { children: React.ReactNode; params: { lng: string } }) {
    const [theLanguage, setTheLanguage] = useState(lng);
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(undefined);

    useEffect(() => {
        async function fetchTranslation() {
            const t = await doTranslation(theLanguage);
            setTranslation(t);
        }

        fetchTranslation().then();

        async function loader() {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setLoading(false);
        }

        loader().then();
    }, [theLanguage, loading]);

    return (
        <html lang={lng}>
        <head>
            <title>Tayarim</title>
        </head>
        <TranslationContext.Provider value={{translation}}>
            <IsErrorContext.Provider value={{isError, setError}}>
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
            </IsErrorContext.Provider>
        </TranslationContext.Provider>
        </html>
    );
}
