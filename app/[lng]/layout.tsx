"use client";
import React, {useEffect, useState} from "react";
import {doTranslation} from "@/app/il8n";
import {
    NavbarContext,
    TranslationContext,
    IsOpenContext,
    IsErrorContext,
    PopupNotifyContext,
    IsSuccessContext
} from "./contexts";
import ErrorsManagement from "@/utils/alertErrors";
import SuccessManagement from "@/utils/alertSuccess";
import {pile} from "@/pile";
import Loader from "@/app/components/ui/Loader";
import "../globals.css";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import NotifyManagement from "@/utils/alertNotify";
import {setLanguaeCookie} from "@/utils/languageManager";


const stripePromise = loadStripe('pk_test_51MV0btCKT0mt6g5QYamT5yDfyrku9XATDC3xSYgq4GBGTJopMZYKX5wSGlkGwhFjOYXy306hucFP8psxjtBQsxHk008MgdE8cx');

export default function RootLayout({children, params: {lng}}: { children: React.ReactNode; params: { lng: string } }) {
    const [theLanguage, setTheLanguage] = useState(lng);
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setError] = useState(null);
    const [isSuccess, setSuccess] = useState(null);
    const [popupNotify, setPopupNotify] = useState(null);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        console.log('RootLayout')

        async function replaceAlertSuccessOrError() {
            if (isError == null || isSuccess == null) {
                if (isError != null) {
                    pile.push(false);
                }
                if (isSuccess != null) {
                    pile.push(true);
                }
            } else {
                let lastValueIndex = pile[pile.length - 1];
                if (lastValueIndex) {
                    pile[pile.length - 1] = false;
                    setSuccess(null);
                } else {
                    pile[pile.length - 1] = true;
                    setError(null);
                }
            }

            if (popupNotify != null) {
                if (popupNotify) {
                    pile.push('popup');
                } else {
                    let lastValueIndex = pile[pile.length - 1];
                    if (lastValueIndex === 'popup') {
                        pile.pop();
                    }
                }
            }
        }


        replaceAlertSuccessOrError().then();


    }, [isError, isSuccess, popupNotify]);

    useEffect(() => {
        async function fetchTranslation() {
            const t = await doTranslation(theLanguage);
            setTranslation(t);
            await setLanguaeCookie(theLanguage);
        }

        fetchTranslation().then(
            () => {
                setLoading(false);
            }
        );
    }, [theLanguage]);

    return (
        <html lang={lng}>
        <head>
            <title>Tayarim</title>
        </head>
        <TranslationContext.Provider value={{translation}}>
            <IsErrorContext.Provider value={{isError, setError}}>
                <IsSuccessContext.Provider value={{isSuccess, setSuccess}}>
                    <PopupNotifyContext.Provider value={{popupNotify, setPopupNotify}}>
                        <NavbarContext.Provider value={{theLanguage, setTheLanguage}}>
                            <IsOpenContext.Provider value={{isOpen, setIsOpen}}>
                                <Elements stripe={stripePromise}>
                                    {isError ? <ErrorsManagement data={isError}/> : null}
                                    {isSuccess ? <SuccessManagement/> : null}
                                    {popupNotify ? <NotifyManagement/> : null}
                                    <body>
                                    <main>
                                        {isLoading ?
                                            <Loader/>
                                            :
                                            children
                                        }
                                    </main>
                                    </body>
                                </Elements>
                            </IsOpenContext.Provider>
                        </NavbarContext.Provider>
                    </PopupNotifyContext.Provider>
                </IsSuccessContext.Provider>
            </IsErrorContext.Provider>
        </TranslationContext.Provider>
        </html>
    );
}
