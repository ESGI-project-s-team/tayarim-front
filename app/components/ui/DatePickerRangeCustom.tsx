import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {useNavbarContext} from "@/app/[lng]/hooks";

interface DatePickerRangeCustomProps {
    placeholder: string;
    days: { [key: string]: string };
    months: { [key: string]: string };
    startDateSelected?: Date | null;
    endDateSelected?: Date | null;
    onChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const DatePickerRangeCustom: React.FC<DatePickerRangeCustomProps> = ({
                                                                         placeholder,
                                                                         days,
                                                                         months,
                                                                         startDateSelected = null,
                                                                         endDateSelected = null,
                                                                         onChange
                                                                     }: DatePickerRangeCustomProps) => {
    const {theLanguage} = useNavbarContext();
    const [startDate, setStartDate] = useState<Date | null>(startDateSelected);
    const [endDate, setEndDate] = useState<Date | null>(endDateSelected);

    useEffect(() => {
        setStartDate(startDateSelected);
        setEndDate(endDateSelected);
    }, [startDateSelected, endDateSelected]);

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

    const handleFocus = (e: any) => {
        e.preventDefault();
        e.target.blur();
    };

    const handleDateChange = (update: [Date | null, Date | null]) => {
        const [start, end] = update;
        setStartDate(start);
        setEndDate(end);
        if (onChange) {
            onChange(start, end);
        }
    };

    return (
        <div className="cursor-pointer bg-white rounded relative py-1 border border-gray-400">
            <DatePicker
                className="ml-3 text-xs focus:outline-none w-56 cursor-pointer border-0 focus:border-0 focus:ring-0"
                showIcon
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                minDate={new Date()}
                withPortal
                placeholderText={placeholder}
                locale={locale}
                dateFormat="dd MMM yyyy"
                onChangeRaw={handleFocus}
                onFocus={handleFocus}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor"
                         className="absolute top-1/2 text-xl transform -translate-y-1/2 focus:outline-none">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                    </svg>
                }
            />
            {(startDate || endDate) && (
                <button
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    onClick={() => {
                        localStorage.setItem('checkin', '');
                        localStorage.setItem('checkout', '');
                        setStartDate(null);
                        setEndDate(null);
                        if (onChange) {
                            onChange(null, null);
                        }
                    }}
                    tabIndex={0}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="h-5 w-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default DatePickerRangeCustom;
