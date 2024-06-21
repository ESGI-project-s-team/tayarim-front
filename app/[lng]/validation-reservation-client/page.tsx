'use client'
import {useTranslationContext} from "@/app/[lng]/hooks";
import React from "react";
import "../../globals.css"


const Page: React.FC = () => {
    const {translation} = useTranslationContext();

    return (
        <>
            <div className="inset-0 z-0 ">
                <div className="relative h-screen lg:h-[100vh]">
                    <div className="absolute inset-0 overflow-hidden ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                        <h1 className="text-5xl mb-8">{translation?.t('merci')}</h1>
                        <p className="text-xl  mb-4 text-center">
                            {translation?.t('merci_description')}
                        </p>

                        <p className="text-xl  mb-4 text-center">
                            {translation?.t('merci_reclamation')}
                        </p>
                        <button
                            onClick={() => window.location.href = "/"}
                            className="mt-6 px-4 py-2 bg-blue-500 text-white text-lg rounded">
                            {translation?.t('retour_home')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
