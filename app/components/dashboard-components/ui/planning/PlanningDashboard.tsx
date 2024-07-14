import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import 'react-datepicker/dist/react-datepicker.css';
import {addDays, startOfWeek, subDays, startOfDay, eachDayOfInterval} from 'date-fns';
import ModalInfoReservation from "@/app/components/modal/modal-info-reservation/ModalInfoReservation";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import ModalCalendar from "@/app/components/modal/modal-calendar-housing/ModalCalendar";
import {getAllHousingInFun, getIndispoInFun} from "@/app/components/dashboard-components/ui/planning/action";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import {getAllReservations} from "@/utils/apiReservation";
import {LuCalendarX2, LuCalendarRange} from "react-icons/lu";
import ModalAddIndispo from "@/app/components/modal/modal-add-date-indispo/ModalAddIndispo";


const PlanningDashboard: React.FC = () => {
    const router = useRouter();
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), {weekStartsOn: 1}));
    const [modalInfoReservationIsOpen, setInfoReservationIsOpen] = useState(false);
    const [reservations, setReservations] = useState<any[]>([]);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenDateIndispo, setIsOpenDateIndispo] = useState(false);
    const {translation} = useTranslationContext();
    const {setError} = useIsErrorContext();
    const [housing, setHousing] = useState<any[]>([]);
    const planning_calendar = translation?.t('planning_calendar', {returnObjects: true}) ?? [];
    const month_complete = translation?.t('month_complete', {returnObjects: true}) ?? [];
    const [loading, setLoading] = useState(false);
    const [reservationDate, setReservationDate] = useState<any>([]);
    const [houseId, setHouseId] = useState(null)
    const [indispo, setIndispo] = useState<any>([]);

    const nextWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, 7));
    };

    const previousWeek = () => {
        setCurrentWeekStart(subDays(currentWeekStart, 7));
    };

    const goToToday = () => {
        setCurrentWeekStart(startOfWeek(new Date(), {weekStartsOn: 1}));
    };

    function openModal(date: any, reservation: any, color: any) {
        if (color === undefined || color === "#f87171")
            return;
        if (isDateInReservations(date)) {
            setInfoReservationIsOpen(true);
            setReservationDate(reservation);
        } else {
            setInfoReservationIsOpen(false);
        }
    }

    const isDateInReservations = (date: Date) => {
        return reservations.some(reservation => {
            const arrivee = new Date(new Date(reservation.dateArrivee).setDate(
                new Date(reservation.dateArrivee).getDate() - 1
            ));
            const depart = new Date(reservation.dateDepart);
            return date >= arrivee && date <= depart;
        });
    };

    function openCalendar(reservation: any, id: any) {
        setReservationDate(reservation);
        setHouseId(id)
        setIsOpenCalendar(true);
    }

    function openDateIndispo(houseId: any) {
        setReservationDate(houseId);
        setIsOpenDateIndispo(true);
    }

    function closeModal() {
        setInfoReservationIsOpen(false);
        setIsOpenCalendar(false);
        setIsOpenDateIndispo(false);
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

    const getIndispoInFunCallBack = useCallback(() => {
        getIndispoInFun().then((response) => {
            if (response.errors) {
                setError(response.errors);
            } else {
                setIndispo(response)
            }
        });
    }, [setError]);

    useEffect(() => {
        getIndispoInFunCallBack();
    }, [getIndispoInFunCallBack]);

    useEffect(() => {
        getAllReservationsInFun();
    }, [getAllReservationsInFun]);

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

    const days = Array.from({length: 7}).map((_, index) => startOfDay(addDays(currentWeekStart, index)));

    const getSchedules = () => {
        const schedules: any[][] = Array(housing.length).fill(null).map(() => Array(7).fill(null));
        reservations.forEach((reservation) => {
            const arrivalDate = startOfDay(new Date(reservation.dateArrivee));
            const departureDate = startOfDay(new Date(reservation.dateDepart));
            const intervalDays = eachDayOfInterval({start: arrivalDate, end: departureDate});
            intervalDays.forEach((intervalDay) => {
                days.forEach((day, dayIndex) => {
                    if (intervalDay.getTime() === day.getTime()) {
                        housing.forEach((house, houseIndex) => {
                            if (house.id === reservation.idLogement) {
                                schedules[houseIndex][dayIndex] = {
                                    color: "#3b82f6",
                                    reservationId: reservation.id,
                                };
                            }
                        });
                    }
                });
            });
        });
        days.forEach((day, dayIndex) => {
            housing.forEach((house, houseIndex) => {
                indispo.forEach((indispo: {
                    idLogement: number;
                    dateDebut: string;
                    dateFin: string;
                }) => {
                    const startDate = startOfDay(new Date(indispo.dateDebut));
                    const endDate = startOfDay(new Date(indispo.dateFin));
                    if (house.id === indispo.idLogement && day >= startDate && day <= endDate) {
                        schedules[houseIndex][dayIndex] = {
                            color: "#f87171",
                            reservationId: 0,
                        };
                    }
                });
            });
        });
        return schedules;
    };
    const schedules = getSchedules();

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
            <div className="max-h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0  bg-gray-100 ">
                <div className="relative top-20 w-full mb-2 ">
                    <div className="container mx-auto mt-8 ">
                        <div className="flex justify-around mb-4 items-center space-x-2 bg-white p-4 shadow rounded">
                            <button onClick={previousWeek} className="text-[#3c50e0] hover:underline px-2 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
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
                                     strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-x-auto max-h-[70vh] overflow-auto">
                            {!loading ? (
                                <div className="inline-block min-w-full">
                                    <div className="grid grid-cols-10 gap-0 bg-white shadow rounded">
                                        <div className="col-span-2 flex flex-col border-r border-gray-300">
                                            <div className="h-14 border-b border-gray-300"></div>

                                            {housing.map((house, index) => (
                                                <div key={index}
                                                     className="border-b border-gray-300 p-2 flex-1 flex items-center justify-between min-h-16">
                                                    <h4 className="text-xs sm:text-xs md:text-sm lg:text-sm font-normal truncate">{house.titre}</h4>
                                                    <div className={"flex"}>
                                                        <div
                                                            className="border border-[#DDDDDD] p-1 rounded-full cursor-pointer w-fit hover:border-black bg-gray-100 mb-4"
                                                            onClick={() => {
                                                                openDateIndispo(house.id)
                                                            }}>
                                                            <LuCalendarX2/>
                                                        </div>
                                                        <div
                                                            className="border border-[#DDDDDD] p-1 rounded-full cursor-pointer w-fit hover:border-black bg-gray-100 mb-4 ml-4"
                                                            onClick={() => openCalendar(
                                                                reservations.filter((reservation: {
                                                                    idLogement: number;
                                                                }) => reservation.idLogement === house.id)
                                                                ,
                                                                house.id
                                                            )}>
                                                            <LuCalendarRange/>
                                                        </div>
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
                                            {housing.map((house, houseIndex) => (
                                                <div key={houseIndex} className="grid grid-cols-7 gap-0">
                                                    {days.map((day, dayIndex) => {
                                                        const block = schedules[houseIndex][dayIndex];
                                                        let displayDayCount = null;

                                                        if (block) {
                                                            const reservation = reservations.find((reservation: {
                                                                id: number;
                                                            }) => reservation.id === block.reservationId);
                                                            if (reservation) {
                                                                const arrivalDate = startOfDay(new Date(reservation.dateArrivee));
                                                                const departureDate = startOfDay(new Date(reservation.dateDepart));
                                                                const intervalDays = eachDayOfInterval({
                                                                    start: arrivalDate,
                                                                    end: departureDate
                                                                });
                                                                displayDayCount = intervalDays.findIndex(intervalDay => intervalDay.getTime() === day.getTime()) + 1;
                                                            }
                                                        }

                                                        return (
                                                            <div key={dayIndex}
                                                                 className="border-r border-gray-300 border-b p-1 flex items-center justify-center">
                                                                <div className="h-14 w-full rounded-md cursor-pointer"
                                                                     onClick={() => openModal(day, () => {
                                                                         return reservations.find((reservation: {
                                                                             id: number;
                                                                         }) => reservation.id === block?.reservationId);
                                                                     }, block?.color)}
                                                                     style={{backgroundColor: block?.color ?? 'white'}}>
                                                                    {block && displayDayCount
                                                                        ? <span
                                                                            className="text-xs sm:text-xs md:text-sm lg:text-sm font-medium  ml-1">{displayDayCount}</span>
                                                                        : null
                                                                    }
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <SpinnerDashboard/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {modalInfoReservationIsOpen && (
                <ModalInfoReservation isOpen={modalInfoReservationIsOpen} onClose={closeModal}
                                      infosReservation={reservationDate}/>
            )}
            {isOpenCalendar &&
                <ModalCalendar isOpen={isOpenCalendar} onClose={closeModal} reservations={reservationDate}
                               datesIndispo={indispo} id={houseId}/>
            }
            {isOpenDateIndispo &&
                <ModalAddIndispo isOpen={isOpenDateIndispo} onClose={closeModal}
                                 id={reservationDate} getAllIndispo={getIndispoInFunCallBack} datesBloquer={indispo}/>
            }
        </div>
    );
};

export default PlanningDashboard;
