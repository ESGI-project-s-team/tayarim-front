import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {useNavbarContext} from "@/app/[lng]/hooks";

interface DatePickerRangeCustomProps {
    placeholder: string;
    days: { [key: string]: string };
    months: { [key: string]: string };
    handleInputChange: (field: any, value: any) => void;
}

const DatePickerRangerCustomForm: React.FC<DatePickerRangeCustomProps> = ({
                                                                              placeholder,
                                                                              days,
                                                                              months,
                                                                              handleInputChange,
                                                                          }: DatePickerRangeCustomProps) => {
    const {theLanguage} = useNavbarContext();
    const [startDateCurrent, setStartDateCurrent] = useState<Date | null>(null);
    const [endDateCurrent, setEndDateCurrent] = useState<Date | null>(null);

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

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDateCurrent(start);
        setEndDateCurrent(end);

        const formatDateToISOString = (date: Date | null) => {
            if (date) {
                const offsetDate = new Date(date.getTime());
                offsetDate.setHours(0, 0, 0, 0);
                offsetDate.setDate(offsetDate.getDate() + 1);
                return offsetDate.toISOString().split('T')[0];
            }
            return null;
        };

        let startString = formatDateToISOString(start);
        let endString = formatDateToISOString(end);

        handleInputChange('dateArrivee', startString);
        handleInputChange('dateDepart', endString);
    };

    return (
        <div
            className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent py-3 text-black outline-none transition"
        >
            <DatePicker
                className="ml-3 text-xs focus:outline-none w-56 cursor-pointer border-0 focus:border-0 focus:ring-0"
                showIcon
                selectsRange={true}
                startDate={startDateCurrent}
                endDate={endDateCurrent}
                onChange={handleDateChange}
                minDate={new Date()}
                placeholderText={placeholder}
                locale={locale}
                dateFormat="dd MMM YYYY"
                onChangeRaw={handleFocus}
                onFocus={handleFocus}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                         stroke="currentColor"
                         className="absolute top-1/2 text-xl transform -translate-y-1/2 focus:outline-none">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                    </svg>
                }></DatePicker>
        </div>
    );
};

export default DatePickerRangerCustomForm;
