import SelectMenusCustom from "@/app/components/SelectMenusCustom";
import DatePickerRangeCustom from "@/app/components/DatePickerRangeCustom";
import React from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";
import "../globals.css";

const valueLocation = [
    {
        id: 1,
        name: 'Paris',
    }
]

const valueGuest = [
    {
        id: 1,
        name: '1',
    },
    {
        id: 2,
        name: '2',
    },
    {
        id: 3,
        name: '3',
    },
    {
        id: 4,
        name: '4',
    }
]

const SearchRoomReservation: React.FC = () => {
    const {translation} = useTranslationContext();
    return (
        <form className="inset-0 flex justify-center items-center ">
            <div className="lg:flex  border py-5 rounded-2xl bg-custom-search">
                <div className={"lg:mr-10 lg:ml-7 lg:mx-0 mx-8 mb-2 lg:mb-0"}>
                    <h5 className={"mb-2 text-sm font-semibold text-gray-950"}>{translation?.t('location')}</h5>
                    <SelectMenusCustom value={valueLocation} placeholder={translation?.t('btn_location')}
                                       icon={<svg
                                           xmlns="http://www.w3.org/2000/svg" fill="none"
                                           viewBox="0 0 24 24"
                                           strokeWidth={1.5}
                                           stroke="currentColor" className="w-6 h-6">
                                           <path strokeLinecap="round" strokeLinejoin="round"
                                                 d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                           <path strokeLinecap="round" strokeLinejoin="round"
                                                 d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                                       </svg>
                                       }/>
                </div>
                <div className={"lg:mr-10 lg:mx-0 mx-8 mb-2 lg:mb-0 "}>
                    <h5 className={"mb-2 text-sm font-semibold text-gray-950"}>{translation?.t('check')}</h5>
                    <DatePickerRangeCustom placeholder={translation?.t('btn_date')}
                                           days={translation?.t('days', {returnObjects: true})}
                                           months={translation?.t('months', {returnObjects: true})}/>
                </div>
                <div className={"lg:mr-10 lg:mx-0 mx-8 "}>
                    <h5 className={"mb-2 text-sm font-semibold text-gray-950"}>{translation?.t('guest')}</h5>
                    <SelectMenusCustom value={valueGuest} placeholder={translation?.t('btn_guest')} icon={<svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                    </svg>
                    }/>
                </div>
                <div className={"w-full flex justify-center"}>
                    <button
                        className="bg-transparent font-semibold border border-gray-400 rounded h-9 text-black mt-7 lg:mr-7 w-32 flex justify-center items-center bg-white">
                        <div className="flex">
                                <span
                                    className={"text-sm font-semibold text-gray-950"}>{translation?.t('search')}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth="1.5" stroke="currentColor" className="w-4 h-5 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </form>
    );

}
export default SearchRoomReservation;