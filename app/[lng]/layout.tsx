"use client";
import React, {useEffect, useState} from "react";
import {doTranslation} from "@/app/il8n";
import {NavbarContext, TranslationContext, IsOpenContext} from "./contexts";
import Loader from "@/app/components/Loader";
import Navbar from "@/app/components/NavBar";

export default function RootLayout({children, params: {lng}}: { children: React.ReactNode; params: { lng: string } }) {
    const [theLanguage, setTheLanguage] = useState(lng);
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTranslation() {
            setLoading(true); // Set loading state to true when starting to fetch translation
            const t = await doTranslation(theLanguage);
            setTranslation(t);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setLoading(false); // Set loading state to false after translation is fetched
        }

        fetchTranslation().then();
    }, [theLanguage]);

    return (
        <html lang={lng}>
        <head>
            <title>Tayarim</title>
        </head>
        <body>
        <TranslationContext.Provider value={{translation}}>
            <nav>
                <header className="relative">
                    <NavbarContext.Provider value={{theLanguage, setTheLanguage}}>
                        <IsOpenContext.Provider value={{isOpen, setIsOpen}}>
                            <Navbar/>
                        </IsOpenContext.Provider>
                    </NavbarContext.Provider>
                </header>
            </nav>
            <main>
                {loading ? <Loader/> : null}
                {children}
            </main>
        </TranslationContext.Provider>
        </body>
        </html>
    );
}
