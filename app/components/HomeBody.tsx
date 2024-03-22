import React from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";


const HomeBody: React.FC = () => {
    const {translation} = useTranslationContext();
    return (
        <>
            <div className="fixed inset-0 z-0">
                <div className="relative h-screen" style={{height: '80vh'}}>
                    <div className="absolute inset-0 overflow-hidden">
                        <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <div className="absolute inset-0 items-center top-40 m-20">
                    <div className="text-white text-center">
                        <h1 className="text-5xl font-bold">{translation?.t('title_body')}</h1>
                        <p className="mt-8 text-lg">{translation?.t('second_title_body')}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeBody;
