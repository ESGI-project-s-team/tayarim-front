import React, {useEffect, useState} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import {useNavbarContext, useTranslationContext} from "@/app/[lng]/hooks";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const CalendarDashboard: React.FC = () => {
    const router = useRouter()
    const {translation} = useTranslationContext()
    const menu_days_all = translation?.t('days_all', {returnObjects: true}) ?? [];
    const menu_days = translation?.t('days_calendar', {returnObjects: true}) ?? [];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {theLanguage} = useNavbarContext();
    const days = translation?.t('days_calendar', {returnObjects: true}) ?? [];
    const months = translation?.t('months', {returnObjects: true}) ?? [];
    const renderQuarterContent = (quarter: any, shortQuarter: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => {
        const tooltipText = `Tooltip for quarter: ${quarter}`;
        return <span title={tooltipText}>{shortQuarter}</span>;
    };
    const handleChange = (date: any) => {
        setSelectedDate(date);
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
    const monthDays = generateMonthDays(selectedDate);

    useEffect(
        () => {
            checkTokenInFun().then(
                (response) => {
                    if (!response) {
                        router.push("/owner-connection")
                    }
                }
            )
        }, [router]
    )
    return (
        <div className=" lg:ml-80  mr-2 ml-14 z-0 ">
            <div className="relative top-32 w-full">
                <DatePicker
                    selected={selectedDate}
                    renderQuarterContent={renderQuarterContent}
                    showMonthYearPicker
                    dateFormat="yyyy, MMM"
                    onChange={handleChange}
                    onChangeRaw={handleFocus}
                    onFocus={handleFocus}
                    locale={locale}
                    className={"ml-6 border-1 border-solid border-gray-300 rounded-md"}
                />
                <div className="bg-[#f1f5f9] ">
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
                                                <span className="hidden lg:block"> {page} </span><span
                                                className="block lg:hidden"> {menu_days[index]} </span></th>
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
            </div>
        </div>
    );
};

export default CalendarDashboard;
