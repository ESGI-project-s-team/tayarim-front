"use client";
import React, {useEffect, useState} from "react";
import {useTranslation} from "@/app/il8n";


interface HomeBodyProps {
    lang: string;
}

const HomeBody: React.FC<HomeBodyProps> = (props) => {
    const [translation, setTranslation] = useState<{ t: any, i18n: any } | null>(null);

    useEffect(() => {
        async function fetchTranslation() {
            return await useTranslation(props.lang);
        }

        fetchTranslation().then((t) => {
            setTranslation(t);
        });
    }, [props]);
    return (
        <>
            <div className="fixed inset-0 z-0 top-20">
                <div className="relative h-screen" style={{height: '85vh'}}>
                    <div className="absolute inset-0 overflow-hidden">
                        <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="text-white text-center">
                        <h1 className="text-7xl font-bold">{translation?.t('title_body')}</h1>
                        <p className="mt-5 text-lg">{translation?.t('second_title_body')}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeBody;
