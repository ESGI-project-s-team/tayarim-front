import React, {useEffect, useState} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import 'react-datepicker/dist/react-datepicker.css';
import {addDays, format, startOfWeek, subDays} from 'date-fns';
import {fr} from 'date-fns/locale';
import ModalInfoReservation from "@/app/components/modal/modal-info-reservation/ModalInfoReservation";
import {useTranslationContext} from "@/app/[lng]/hooks";  // Importer le locale français si nécessaire

const PlanningDashboard: React.FC = () => {
    const router = useRouter();
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), {weekStartsOn: 1}));
    const [modalInfoReservationIsOpen, setInfoReservationIsOpen] = useState(false);
    const [reservation, setReservations] = useState<[]>([]);
    const {translation} = useTranslationContext();

    const nextWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, 7));
    };

    const previousWeek = () => {
        setCurrentWeekStart(subDays(currentWeekStart, 7));
    };

    const goToToday = () => {
        setCurrentWeekStart(startOfWeek(new Date(), {weekStartsOn: 1}));
    };

    function openModal(owner: any) {
        setInfoReservationIsOpen(true);
    }

    function closeModal() {
        setInfoReservationIsOpen(false);
    }

    const days = Array.from({length: 7}).map((_, index) => addDays(currentWeekStart, index));
    const people = [
        "Diana Jackson",
        "Blake Shields",
        "Isabel Perez",
        "Ahmed (AJ) Ayad",
        "Finn Halonen",
        "June Lee",
        "Bruce Garrison"
    ];
    const schedules = [
        [" ", "#3b82f6", "#3b82f6", "", "", "", ""], // Diana Jackson
        [" ", "#8b5cf6", "#8b5cf6", "#8b5cf6", "#8b5cf6", "#8b5cf6", ""], // Blake Shields
        ["#f59e0b", "#f59e0b", "#f59e0b", "", "", "", ""], // Isabel Perez
        ["#10b981", "#10b981", "#10b981", "#10b981", "#10b981", "#10b981", "#10b981"], // Ahmed (AJ) Ayad
        ["#ef4444", "#ef4444", "#ef4444", "", "", "", ""], // Finn Halonen
        ["#6366f1", "", "", "", "", "", ""], // June Lee
        ["#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", ""], // Bruce Garrison
    ];

    useEffect(() => {
        checkTokenInFun().then((response) => {
            if (!response) {
                router.push("/owner-connection");
            }
        });
    }, [router]);

    const getMergedSchedules = (schedule: string[]) => {
        const merged = [];
        let currentColor = schedule[0];
        let span = 1;

        for (let i = 1; i < schedule.length; i++) {
            if (schedule[i] === currentColor) {
                span++;
            } else {
                if (currentColor) {
                    merged.push({color: currentColor, span});
                }
                currentColor = schedule[i];
                span = 1;
            }
        }
        if (currentColor) {
            merged.push({color: currentColor, span}); // Add the last segment
        }

        return merged;
    };

    return (
        <div>
            <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0 overflow-auto bg-gray-100">
                <div className="relative top-20 w-full mb-2">
                    <div className="container mx-auto mt-8">
                        <div className="flex justify-around mb-4 items-center space-x-2 bg-white p-4 shadow rounded">
                            <button onClick={previousWeek} className="text-[#3c50e0] hover:underline px-2 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </button>
                            <div className="text-center">
                                <h2 className="text-base sm:text-lg md:text-xl font-medium">
                                    {format(currentWeekStart, 'MMMM yyyy', {locale: fr})}
                                </h2>
                                <button onClick={goToToday} className="text-[#3c50e0] underline text-base">
                                    {translation?.t('today')}
                                </button>
                            </div>
                            <button onClick={nextWeek} className="text-[#3c50e0] hover:underline px-2 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full">
                                <div className="grid grid-cols-10 gap-0 bg-white shadow rounded">
                                    <div className="col-span-2 flex flex-col border-r border-gray-300">
                                        <div className="h-14 border-b border-gray-300"></div>
                                        {people.map((person, index) => (
                                            <div key={index}
                                                 className="border-b border-gray-300 p-2 flex-1 flex items-center justify-center">
                                                <h4 className="text-xs sm:text-xs md:text-sm lg:text-sm font-normal truncate">{person}</h4>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-span-8">
                                        <div className="grid grid-cols-7 gap-0">
                                            {days.map((day, dayIndex) => (
                                                <div key={dayIndex}
                                                     className="border-r border-b border-gray-300 p-2 h-14 flex items-center justify-center">
                                                    <h3 className="text-xs sm:text-xs md:text-sm lg:text-sm font-medium truncate">{format(day, 'EEE dd', {locale: fr})}</h3>
                                                </div>
                                            ))}
                                        </div>
                                        {people.map((person, personIndex) => (
                                            <div key={personIndex} className="grid grid-cols-7 gap-0">
                                                {getMergedSchedules(schedules[personIndex]).map((block, blockIndex, array) => (
                                                    <div
                                                        key={blockIndex}
                                                        className={`border-r border-gray-300 border-b  p-2 flex items-center justify-center`}
                                                        style={{gridColumn: `span ${block.span}`}}
                                                    >
                                                        <div className="h-12 w-full rounded-md cursor-pointer"
                                                             onClick={() => openModal(reservation[personIndex])}
                                                             style={{backgroundColor: block.color}}></div>
                                                    </div>

                                                ))}
                                                {Array.from({length: 7 - getMergedSchedules(schedules[personIndex]).reduce((acc, block) => acc + block.span, 0)}).map((_, i) => (
                                                    <div key={i}
                                                         className="border-r border-b border-gray-300 p-2 flex items-center justify-center"></div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                modalInfoReservationIsOpen && (
                    <ModalInfoReservation isOpen={modalInfoReservationIsOpen} onClose={closeModal}
                                          infosReservation={reservation}/>
                )
            }
        </div>
    );
};

export default PlanningDashboard;
