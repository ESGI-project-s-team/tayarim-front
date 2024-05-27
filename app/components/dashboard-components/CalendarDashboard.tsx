import React, {useEffect} from 'react';
import {checkTokenInFun} from "@/app/components/ui/signin/action";
import {useRouter} from "next/navigation";

const CalendarDashboard: React.FC = () => {
    const router = useRouter()
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
            <div className="relative top-32 w-full    ">
                <div className="bg-[#f1f5f9] ">
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        <div className="mx-auto max-w-7xl">
                            <div
                                className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <table className="w-full">
                                    <thead>
                                    <tr className="grid grid-cols-7 rounded-t-sm bg-[#3c50e0] text-white">
                                        <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                                            <span className="hidden lg:block"> Sunday </span><span
                                            className="block lg:hidden"> Sun </span></th>
                                        <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                                            <span className="hidden lg:block"> Monday </span><span
                                            className="block lg:hidden"> Mon </span></th>
                                        <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                                            <span className="hidden lg:block"> Tuesday </span><span
                                            className="block lg:hidden"> Tue </span></th>
                                        <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                                            <span className="hidden lg:block"> Wednesday </span><span
                                            className="block lg:hidden"> Wed </span></th>
                                        <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                                            <span className="hidden lg:block"> Thursday </span><span
                                            className="block lg:hidden"> Thur </span></th>
                                        <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                                            <span className="hidden lg:block"> Friday </span><span
                                            className="block lg:hidden"> Fri </span></th>
                                        <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                                            <span className="hidden lg:block"> Saturday </span><span
                                            className="block lg:hidden"> Sat </span></th>
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
