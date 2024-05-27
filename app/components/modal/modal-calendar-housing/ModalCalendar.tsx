import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {
    useNavbarContext,
    useTranslationContext
} from "@/app/[lng]/hooks";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";


export default function ModalCalendar({isOpen, onClose, id}: {
    isOpen: boolean;
    onClose: () => void;
    id: string
}) {
    const {translation} = useTranslationContext()
    const menu_days_all = translation?.t('days_all', {returnObjects: true}) ?? [];
    const menu_days = translation?.t('days_calendar', {returnObjects: true}) ?? [];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHousing, setSelectedHousing] = useState(new Date());
    const generateMonthDays = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = [];

        // Days from previous month to fill the first week, starting on Monday
        const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Shift Sunday to the end
        for (let i = 1 - firstDayWeekday; i <= 0; i++) {
            daysInMonth.push(new Date(year, month, i));
        }

        // Current month days
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            daysInMonth.push(new Date(year, month, day));
        }

        // Days from next month to fill up to 35 days
        const nextMonthDaysNeeded = 35 - daysInMonth.length;
        for (let i = 1; i <= nextMonthDaysNeeded; i++) {
            daysInMonth.push(new Date(year, month + 1, i));
        }

        return daysInMonth;
    };
    const [monthDays, setMonthDays] = useState(generateMonthDays(selectedDate));
    const {theLanguage} = useNavbarContext();
    const days = translation?.t('days_calendar', {returnObjects: true}) ?? [];
    const months = translation?.t('months', {returnObjects: true}) ?? [];

    const handleChangeDate = (date: any) => {
        setSelectedDate(date);
        setMonthDays(generateMonthDays(date));
    };
    const handleChangeHousing = (house: any) => {
        setSelectedHousing(house);
    };
    const handleFocus = (e: any) => {
        e.preventDefault();
        e.target.blur();
    };

    const locale: any = {
        localize: {
            day: (n: string | number) => days[n],
            month: (n: string | number) => months[n]
        },
        formatLong: {
            date: () => 'dd MMMM yyyy',
        },
        code: theLanguage,
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={
                () => {
                    null
                }
            }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25"/>
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center z-50">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >

                            <Dialog.Panel
                                className="transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all z-50 bg-white">
                                <div className="border-b border-[#dee4ee] py-4 flex justify-between px-7">
                                    <h3 className="font-medium text-black">{translation?.t('calendar')}</h3>
                                    <button onClick={onClose} className="text-[#3c50e0] font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                             className="w-6 h-6 text-[#3c50e0]">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <DatePicker
                                        selected={selectedDate}
                                        showMonthYearPicker
                                        dateFormat="yyyy, MMM"
                                        onChange={handleChangeDate}
                                        onChangeRaw={handleFocus}
                                        onFocus={handleFocus}
                                        locale={locale}
                                        className={"ml-6 border-1 border-solid border-gray-300 rounded-md cursor-pointer mt-5"}
                                    />
                                    {/*                               <Select name="status" aria-label="Project status"
                                        className={"ml-6 border-1 border-solid border-gray-300 rounded-md cursor-pointer"}
                                        onChange={handleChangeHousing}>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="delayed">Delayed</option>
                                    <option value="canceled">Canceled</option>
                                </Select>*/}

                                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                        <div className="mx-auto max-w-7xl">
                                            <div
                                                className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                                <table className="w-full">
                                                    <thead>
                                                    <tr className="grid grid-cols-7 rounded-t-sm bg-[#3c50e0] text-white">
                                                        {menu_days_all.map((page: string, index: number) => (
                                                            <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5"
                                                                key={index}>
                                                                        <span
                                                                            className="hidden lg:block"> {page} </span><span
                                                                className="block lg:hidden"> {menu_days[index]} </span>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Array.from({length: Math.ceil(monthDays.length / 7)}).map((_, weekIndex) => (
                                                        <tr className="grid grid-cols-7" key={weekIndex}>
                                                            {monthDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => (
                                                                <td
                                                                    className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31"
                                                                    key={dayIndex}
                                                                >
                                                    <span
                                                        className="font-medium text-black dark:text-white">{date.getDate()}</span>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
