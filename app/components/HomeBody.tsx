import {useTranslationContext} from "@/app/[lng]/hooks";
import React from "react";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";
import OurServices from "@/app/components/OurServices";
import HostInformations from "@/app/components/HostInformation";
import FrequentlyAskedQuestions from "@/app/components/FrequentlyAskedQuestions";
import Footer from "@/app/components/Footer";
import "../globals.css"


const HomeBody: React.FC = () => {
    const {translation} = useTranslationContext();

    return (
        <>
            <div className="fixed inset-0 z-0 overflow-auto" id={"scrollableDiv"}>
                <div className="relative h-screen" style={{height: '100vh'}}>
                    <div className="absolute inset-0 overflow-hidden ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <div className="absolute inset-0 items-center top-48 mx-5 xs-mtop lg:mt-14">
                    <div className="text-white text-center mb-5">
                        <h1 className=" font-bold ">{translation?.t('title_body')}</h1>
                        <p className="mt-5 mb-10 font-normal">{translation?.t('second_title_body')}</p>
                    </div>
                    <SearchRoomReservation/>
                </div>
                <OurServices/>
                <HostInformations/>
                <FrequentlyAskedQuestions/>
                <Footer/>
            </div>
        </>
    );
};

export default HomeBody;
