import React, {useEffect, useState} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import {useNavbarContext, useTranslationContext} from "@/app/[lng]/hooks";
import 'react-datepicker/dist/react-datepicker.css';
import {isBefore, startOfWeek} from "date-fns";
type Shift = {
    employee: string;
    start: string;
    end: string;
    role: string;
    color: string;
};

const shifts: Shift[] = [
    { employee: 'Diana Jackson', start: '06:00', end: '11:00', role: 'CASHIER', color: 'bg-blue-500' },
    { employee: 'Blake Shields', start: '06:00', end: '11:00', role: 'BARISTA', color: 'bg-purple-500' },
    { employee: 'Isabel Perez', start: '09:00', end: '14:00', role: 'CASHIER', color: 'bg-blue-500' },
    { employee: 'Ahmed (AJ) Ayad', start: '09:00', end: '14:00', role: 'BARISTA', color: 'bg-purple-500' },
    { employee: 'Finn Halonen', start: '09:00', end: '13:00', role: 'TRAINING', color: 'bg-orange-500' },
    { employee: 'June Lee', start: '11:00', end: '13:00', role: 'TEAM LEAD', color: 'bg-green-500' },
    { employee: 'June Lee', start: '13:00', end: '19:00', role: 'TEAM LEAD', color: 'bg-red-500' },
    { employee: 'Bruce Garrison', start: '14:00', end: '19:00', role: 'CASHIER', color: 'bg-blue-500' }
];

const generateMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = [];

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

const PlanningDashboard: React.FC = () => {
    const router = useRouter();
    const {translation} = useTranslationContext();
    const [isLoading, setIsLoading] = useState(false);
    const [filterButtonState, setFilterButtonState] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const days = generateMonthDays(selectedDate);

    useEffect(() => {
        checkTokenInFun().then((response) => {
            if (!response) {
                router.push("/owner-connection");
            }
        });
    }, [router]);

    return (
        <div className="lg:ml-80 mr-2 ml-14 z-0">
            <div className="h-screen relative top-32 w-full">
                <WeekView
                    days={days}
                    title={`Week of ${selectedDate.toLocaleDateString()}`}
                    onNext={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                    onPrev={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                    onToday={() => setSelectedDate(new Date())}
                    showTodayButton={true}
                    HeaderComponent={HeaderComponent}
                />
            </div>
        </div>
    );
};

const HeaderComponent = ({title, onNext, onPrev, onToday, showTodayButton}) => (
    <div className="flex items-center justify-between p-4 bg-gray-200">
        <button onClick={onPrev} className="btn">Previous</button>
        <h1 className="text-lg font-bold">{title}</h1>
        <button onClick={onNext} className="btn">Next</button>
        {showTodayButton && <button onClick={onToday} className="btn">Today</button>}
    </div>
);

export default PlanningDashboard;

export function WeekView({days, title, onNext, onPrev, onToday, showTodayButton, HeaderComponent}) {
    return (
        <div>
            {HeaderComponent && <HeaderComponent
                title={title}
                onNext={onNext}
                onPrev={onPrev}
                onToday={onToday}
                showTodayButton={showTodayButton}
            />}
            <div className="grid grid-cols-7 gap-4 p-4">
                {days.map((day, index) => (
                    <div key={index} className="border p-4">
                        <h2 className="text-lg">{day.toLocaleDateString()}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
