import React, {useCallback, useEffect, useState} from "react";
import SelectMenusCustom from "@/app/components/ui/SelectMenusCustom";
import DatePickerRangeCustom from "@/app/components/ui/DatePickerRangeCustom";
import {useTranslationContext} from "@/app/[lng]/hooks";
import "../../globals.css";
import {useRouter} from 'next/navigation';
import {searchHousing} from "@/utils/apiHousing";
import SpinnerUI from "@/app/components/ui/SpinnerUI";

export default function SearchRoomReservation({
                                                  search,
                                                  searchHousingCurrent
                                              }: {
                                                  search: boolean
                                                  searchHousingCurrent?: any
                                              }
) {
    const {translation} = useTranslationContext();
    const [location, setLocation] = useState(localStorage.getItem('location') || '');
    const [guest, setGuest] = useState(localStorage.getItem('guest') || '');
    const [villes, setVilles] = useState([]);
    const [guestMax, setGuestMax] = useState<any>([]);
    const [checkin, setCheckin] = useState<Date | null>(
        localStorage.getItem('checkin') ? new Date(localStorage.getItem('checkin')!) : null
    );
    const [checkout, setCheckout] = useState<Date | null>(
        localStorage.getItem('checkout') ? new Date(localStorage.getItem('checkout')!) : null
    );
    const [loading, setLoading] = useState(false);
    const [loadingPerman, setLoadingPerman] = useState(false);

    const router = useRouter();

    const handleSearch = useCallback(async () => {
        setLoading(true);

        localStorage.setItem('location', location);
        localStorage.setItem('guest', guest.toString());
        if (checkin && checkout) {
            localStorage.setItem('checkin', checkin.toISOString());
            localStorage.setItem('checkout', checkout.toISOString());
        }
        try {
            if (search) {
                await searchHousingCurrent();
            } else {
                setLoadingPerman(true);
                router.push('/search-results');
            }
        } finally {
            setLoading(false);
        }
    }, [location, guest, checkin, checkout, search, searchHousingCurrent, router]);

    useEffect(() => {
        setLoadingPerman(false);
        searchHousing({})
            .then((response: any) => {
                if (!response)
                    return;
                if (!response?.errors) {
                    let villes = response.map((item: any) => {
                        let ville = item.ville.toLowerCase();
                        return ville.charAt(0).toUpperCase() + ville.slice(1);
                    });
                    const villesFiltre = villes.filter((item: any, index: any) => villes.indexOf(item) === index);
                    const villesFiltre2 = villesFiltre.map((item: any, index: any) => {
                        return {id: index + 1, name: item}
                    });
                    setVilles(villesFiltre2);
                    const guestMax = Math.max(...response.map((item: any) => item.capaciteMaxPersonne));
                    const guestMaxArray = Array.from({length: guestMax}, (_, i) => i + 1).map((item: any, index: any) => {
                        return {id: index + 1, name: item.toString()}
                    });
                    setGuestMax(guestMaxArray);
                }
            })
    }, []);

    return (
        <div className="inset-0 flex justify-center items-center">
            <div className="lg:flex py-5 bg-custom-search border border-gray-300 rounded-2xl shadow-sm">
                <div className={"lg mx-8 mb-2"}>
                    <h5 className={"mb-2 text-sm font-semibold text-gray-950"}>{translation?.t('location')}</h5>
                    <SelectMenusCustom value={villes} placeholder={translation?.t('btn_location')}
                                       valueSelected={{id: 1, name: location}}
                                       onChange={(value) => {
                                           localStorage.setItem('location', value.name);
                                           setLocation(value.name);
                                       }}
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
                <div className={"lg mx-8 mb-2"}>
                    <h5 className={"mb-2 text-sm font-semibold text-gray-950"}>{translation?.t('check')}</h5>
                    <DatePickerRangeCustom
                        placeholder={translation?.t('btn_date')}
                        days={translation?.t('days', {returnObjects: true})}
                        months={translation?.t('months', {returnObjects: true})}
                        startDateSelected={checkin}
                        endDateSelected={checkout}
                        onChange={(startDate, endDate) => {
                            setCheckin(startDate);
                            setCheckout(endDate);
                        }}
                    />
                </div>
                <div className={"lg mx-8 "}>
                    <h5 className={"mb-2 text-sm font-semibold text-gray-950"}>{translation?.t('guest')}</h5>
                    <SelectMenusCustom value={guestMax} placeholder={translation?.t('btn_guest')}
                                       onChange={(value) => {
                                           localStorage.setItem('guest', value.name);
                                           setGuest(value.name);
                                       }}
                                       valueSelected={{id: 1, name: guest}}
                                       icon={<svg
                                           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                           strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                           <path strokeLinecap="round" strokeLinejoin="round"
                                                 d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                                       </svg>
                                       }/>
                </div>
                <div className={"w-full flex justify-center"}>
                    {loadingPerman ?
                        <div className={"mt-7 mr-7"}>
                            <SpinnerUI/>
                        </div>
                        :
                        <>
                            {loading ?
                                <div className={"mt-7 mr-7"}>
                                    <SpinnerUI/>
                                </div>
                                :
                                <button
                                    onClick={() => {
                                        handleSearch().then();
                                    }}
                                    className="bg-transparent font-semibold border border-gray-400 rounded h-9 text-black mt-7 lg:mr-7 w-32 flex justify-center items-center bg-white
                        hover:bg-gray-100">
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
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

