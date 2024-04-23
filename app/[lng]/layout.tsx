"use client";
import React, {useEffect, useState} from "react";
import {doTranslation} from "@/app/il8n";
import {NavbarContext, TranslationContext, IsOpenContext, LoaderContext} from "./contexts";
import Loader from "@/app/components/Loader";

export default function RootLayout({children, params: {lng}}: { children: React.ReactNode; params: { lng: string } }) {
    const [theLanguage, setTheLanguage] = useState(lng);
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

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
        <body>
        <TranslationContext.Provider value={{translation}}>
            <NavbarContext.Provider value={{theLanguage, setTheLanguage}}>
                <IsOpenContext.Provider value={{isOpen, setIsOpen}}>
                    <LoaderContext.Provider value={{loading, setLoading}}>
                        <main>
                            {loading ? <Loader/> : null}
                            {children}
                        </main>
                    </LoaderContext.Provider>
                </IsOpenContext.Provider>
            </NavbarContext.Provider>
        </TranslationContext.Provider>
        </body>
        </html>
    );
}
