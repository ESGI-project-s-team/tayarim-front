import {useTranslationContext} from "@/app/[lng]/hooks";
import React from "react";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";
import "../../globals.css"


const HomeBody: React.FC = () => {
    const {translation} = useTranslationContext();

    return (
        <>
            <div className="inset-0 z-0 ">
                <div className="relative h-screen lg:h-[90vh]">
                    <div className="absolute inset-0 overflow-hidden ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>
                <div className="absolute inset-0 items-center xxs-mtop  mx-5 xs-mtop lg:mt-14">
                    <div className="text-white text-center">
                        <h1 className=" font-bold ">{translation?.t('title_body')}</h1>
                        <p className="mt-5 mb-10 font-normal">{translation?.t('second_title_body')}</p>
                    </div>
                    <SearchRoomReservation search={false}/>
                </div>
            </div>
        </>
    );
};

export default HomeBody;
