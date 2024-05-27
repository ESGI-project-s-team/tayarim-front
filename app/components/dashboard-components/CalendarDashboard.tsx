import React, {useEffect, useState} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";
import {useTranslationContext} from "@/app/[lng]/hooks";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const CalendarDashboard: React.FC = () => {
    const router = useRouter()
    const {translation} = useTranslationContext()
    const menu_days_all = translation?.t('days_all', {returnObjects: true}) ?? [];
    const menu_days = translation?.t('days', {returnObjects: true}) ?? [];
    const [selectedDate, setSelectedDate] = useState(new Date());

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
                                    <tr className="grid grid-cols-7">
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">1</span>
                                        </td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">2</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">3</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">4</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">5</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">6</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">7</span></td>
                                    </tr>
                                    <tr className="grid grid-cols-7">
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">8</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">9</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">10</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">11</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">12</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">13</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">14</span></td>
                                    </tr>
                                    <tr className="grid grid-cols-7">
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">15</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">16</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">17</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">18</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">19</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">20</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">21</span></td>
                                    </tr>
                                    <tr className="grid grid-cols-7">
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">22</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">23</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">24</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">25</span>
                                        </td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">26</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">27</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">28</span></td>
                                    </tr>
                                    <tr className="grid grid-cols-7">
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">29</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">30</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">31</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">1</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">2</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">3</span></td>
                                        <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                                            <span className="font-medium text-black dark:text-white">4</span></td>
                                    </tr>
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
