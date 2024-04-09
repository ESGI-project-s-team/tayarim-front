import {useTranslationContext} from "@/app/[lng]/hooks";
import React from "react";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";
import "../globals.css"
import BackgroundImageDark from "@/app/components/ui/BackgroundImageDark";


const HomeBody: React.FC = () => {
    const {translation} = useTranslationContext();

    return (
        <>
            <div className="inset-0 z-0 ">
                <BackgroundImageDark/>
                <div className="absolute inset-0 items-center top-48 mx-5 xs-mtop lg:mt-14">
                    <div className="text-white text-center mb-5">
                        <h1 className=" font-bold ">{translation?.t('title_body')}</h1>
                        <p className="mt-5 mb-10 font-normal">{translation?.t('second_title_body')}</p>
                    </div>
                    <SearchRoomReservation/>
                </div>
            </div>
        </>
    );
};

export default HomeBody;
