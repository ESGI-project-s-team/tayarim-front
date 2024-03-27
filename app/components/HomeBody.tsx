import {useTranslationContext} from "@/app/[lng]/hooks";
import React from "react";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";
import OurServices from "@/app/components/OurServices";
import HostInformations from "@/app/components/HostInformation";


const HomeBody: React.FC = () => {
    const {translation} = useTranslationContext();

    return (
        <>
            <div className="fixed inset-0 z-0 overflow-auto" id={"scrollableDiv"}>
                <div className="relative h-screen" style={{height: '100vh'}}>
                    <div className="absolute inset-0 overflow-hidden ">
                        <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <div className="absolute inset-0 items-center sm:top-48 top-12 m-20">
                    <div className="text-white text-center
                    sm:mb-20 mb-5">
                        <h1 className="text-4xl font-bold lg:text-5xl ">{translation?.t('title_body')}</h1>
                        <p className="mt-8 text-lg font-normal ">{translation?.t('second_title_body')}</p>
                    </div>
                    <SearchRoomReservation/>
                </div>
                <OurServices/>
                <HostInformations/>
            </div>
        </>
    );
};

export default HomeBody;
