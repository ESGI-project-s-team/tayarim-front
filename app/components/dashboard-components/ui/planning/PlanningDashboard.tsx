import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import 'react-datepicker/dist/react-datepicker.css';
import {addDays, format, startOfWeek, subDays, startOfDay, endOfDay, eachDayOfInterval} from 'date-fns';
import ModalInfoReservation from "@/app/components/modal/modal-info-reservation/ModalInfoReservation";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import ModalCalendar from "@/app/components/modal/modal-calendar-housing/ModalCalendar";
import {getAllHousingInFun} from "@/app/components/dashboard-components/ui/planning/action";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import {getAllReservations} from "@/utils/apiReservation";
import {white} from "next/dist/lib/picocolors";

const PlanningDashboard: React.FC = () => {
    const router = useRouter();
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), {weekStartsOn: 1}));
    const [modalInfoReservationIsOpen, setInfoReservationIsOpen] = useState(false);
    const [reservations, setReservations] = useState<[]>([]);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const {translation} = useTranslationContext();
    const {setError} = useIsErrorContext();
    const [housing, setHousing] = useState<HouseDTO[]>([]);
    const planning_calendar = translation?.t('planning_calendar', {returnObjects: true}) ?? [];
    const month_complete = translation?.t('month_complete', {returnObjects: true}) ?? [];
    const [loading, setLoading] = useState(false);
    const [reservationDate, setReservationDate] = useState([]);

    const nextWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, 7));
    };

    const previousWeek = () => {
        setCurrentWeekStart(subDays(currentWeekStart, 7));
    };

    const goToToday = () => {
        setCurrentWeekStart(startOfWeek(new Date(), {weekStartsOn: 1}));
    };

    function openModal(reservation: any) {
        setReservationDate(reservation);
        setInfoReservationIsOpen(true);
    }

    function openCalendar(reservation: any) {
        setReservationDate(reservation);
        setIsOpenCalendar(true);
    }

    function closeModal() {
        setInfoReservationIsOpen(false);
        setIsOpenCalendar(false);
    }

    const getAllReservationsInFun = useCallback(() => {
        setLoading(true)
        getAllReservations()
            .then((response) => {
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setError(null);
                    response = response.filter((reservation: {
                        statut: string;
                    }) => reservation.statut === "payed" || reservation.statut === "in progress");
                    setReservations(response);
                }
                setLoading(false)
            });
    }, [setError]);

    useEffect(() => {
        getAllReservationsInFun();
    }, [getAllReservationsInFun]);

    const days = Array.from({length: 7}).map((_, index) => startOfDay(addDays(currentWeekStart, index)));

    const getSchedules = () => {
        const schedules = housing.map(() => Array(7).fill(null));
        reservations.forEach((reservation: any) => {
            const arrivalDate = startOfDay(new Date(reservation.dateArrivee));
            const departureDate = startOfDay(new Date(reservation.dateDepart));
            const intervalDays = eachDayOfInterval({start: arrivalDate, end: departureDate});
            intervalDays.forEach((intervalDay) => {
                days.forEach((day, dayIndex) => {
                    if (intervalDay.getTime() === day.getTime()) {
                        schedules.forEach((schedule, houseIndex) => {
                            if (housing[houseIndex].id === reservation.idLogement) {
                                //compare the day of the week
                                if (intervalDay.getDay() === day.getDay()) {
                                    //random color for each reservation
                                    schedule[dayIndex] = "#3b82f6";
                                }// Replace with your desired color
                            }
                        });
                    }
                });
            });
        });
        return schedules;
    };

    const getMergedSchedules = (schedule: string[]) => {
        const merged = [];
        let currentColor = schedule[0];
        let span = 1;

        for (let i = 1; i < schedule.length; i++) {
            if (schedule[i] === currentColor) {
                span++;
            } else {

                merged.push({color: currentColor, span});
                currentColor = schedule[i];
                span = 1;
            }
        }
        if (currentColor) {
            merged.push({color: currentColor, span}); // Add the last segment
        }

        return merged;
    };

    const mergedSchedules = getSchedules().map(getMergedSchedules);

    useEffect(() => {
        setLoading(true);
        getAllHousingInFun().then((response) => {
            if (response.errors) {
                setError(response.errors);
                router.push("/dashboard");
            } else {
                setError(null);
                response = response.filter((house: { isLouable: boolean; }) => house.isLouable);
                setHousing(response);
            }
            setLoading(false);
        });
    }, [setError, router]);

    const formatMonth = (date: Date) => {
        const monthIndex = date.getMonth();
        return month_complete[monthIndex];
    };

    const formatDay = (date: Date) => {
        const dayIndex = date.getDay();
        return planning_calendar[(dayIndex + 6) % 7]; // Adjust the day index to start from Monday
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
                                    {formatMonth(currentWeekStart)} {currentWeekStart.getFullYear()}
                                </h2>
                                <button onClick={goToToday} className="text-[#3c50e0] underline text-sm">
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
                            {
                                !loading ?
                                    <div className="inline-block min-w-full">
                                        <div className="grid grid-cols-10 gap-0 bg-white shadow rounded">
                                            <div className="col-span-2 flex flex-col border-r border-gray-300">
                                                <div className="h-14 border-b border-gray-300"></div>

                                                {housing.map((house, index) => (
                                                    <div key={index}
                                                         className="border-b border-gray-300 p-2 flex-1 flex items-center justify-between  min-h-16">
                                                        <h4 className="text-xs sm:text-xs md:text-sm lg:text-sm font-normal truncate">{house.titre}</h4>
                                                        <div
                                                            className="border border-[#DDDDDD] p-1 rounded-full cursor-pointer w-fit hover:border-black
                                            bg-gray-100 mb-4"
                                                            onClick={() => openCalendar(
                                                                reservations.filter((reservation: {
                                                                    idLogement: number;
                                                                }) => reservation.idLogement === house.id)
                                                            )}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 strokeWidth="1.5" stroke="currentColor"
                                                                 className="sm:size-4 size-3">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 5.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008V15Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="col-span-8">
                                                <div className="grid grid-cols-7 gap-0">
                                                    {days.map((day, dayIndex) => (
                                                        <div key={dayIndex}
                                                             className="border-r border-b border-gray-300 p-2 h-14 flex items-center justify-center">
                                                            <h3 className="text-xs sm:text-xs md:text-sm lg:text-sm font-medium truncate">
                                                                {formatDay(day)} {day.getDate()}
                                                            </h3>
                                                        </div>
                                                    ))}
                                                </div>
                                                {housing.map((house, personIndex) => (
                                                    <div key={personIndex} className="grid grid-cols-7 gap-0 ">
                                                        {mergedSchedules[personIndex].map((block, blockIndex, array) => (
                                                            <div
                                                                key={blockIndex}
                                                                className={`border-r border-gray-300 border-b p-1 flex items-center justify-center`}
                                                                style={{gridColumn: `span ${block.span ?? 1} `}}
                                                            >
                                                                <div
                                                                    className="h-12 w-full rounded-md cursor-pointer "
                                                                    onClick={() => openModal(reservations[personIndex])}
                                                                    style={{backgroundColor: block.color ?? white}}></div>
                                                            </div>
                                                        ))}
                                                        {Array.from({length: 7 - mergedSchedules[personIndex].reduce((acc, block) => acc + block.span, 0)}).map((_, i) => (
                                                            <div key={i}
                                                                 className="border-b border-r  border-gray-300  flex items-center justify-center min-h-16 "></div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <SpinnerDashboard/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                modalInfoReservationIsOpen && (
                    <ModalInfoReservation isOpen={modalInfoReservationIsOpen} onClose={closeModal}
                                          infosReservation={reservationDate}/>
                )
            }
            {isOpenCalendar &&
                <ModalCalendar isOpen={isOpenCalendar} onClose={closeModal} reservations={reservationDate}/>
            }
        </div>
    );
};

export default PlanningDashboard;
