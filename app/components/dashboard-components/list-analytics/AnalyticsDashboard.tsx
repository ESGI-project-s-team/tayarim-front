import React, {useState, useEffect, useMemo} from "react";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import dynamic from "next/dynamic";
import {ApexOptions} from "apexcharts";
import "../../../globals.css";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import {getAllStatistiqueInFun} from "@/app/components/dashboard-components/list-analytics/actions";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});

export const AnalyticsDashboard: React.FC = () => {
    const {translation} = useTranslationContext();
    const month_complete = useMemo(() => translation?.t('month_complete', {returnObjects: true}) ?? [], [translation]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [availableYears] = useState<number[]>([new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1]);
    const [loading, setLoading] = useState(true);
    const {setError} = useIsErrorContext();
    const [dataStat, setDataStat] = useState<any>({});
    const [negativePositive, setNegativePositive] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [sumMontantReservation, setSumMontantReservation] = useState<number>(0);
    const [sumDepense, setSumDepense] = useState<number>(0);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };

    useEffect(() => {
        getAllStatistiqueInFun(selectedYear).then((data) => {
            if (data.errors) {
                setError(data.errors);
                return;
            }
            setDataStat(data);
            const negativePositive = data.depenseParMois.map((value: number) => -value);
            let totalSum: number = data.montantReservationsParMois.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
            let totalSumDepense: number = data.depenseParMois.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
            setSumMontantReservation(totalSum);
            setSumDepense(totalSumDepense);
            setNegativePositive(negativePositive);
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedYear, setError]);

    const optionsLineExpense: ApexOptions = useMemo(() => ({
        title: {
            text: '-' + sumDepense.toString() + ' €',
            align: 'left',
            style: {
                fontSize: '20px',
            }
        },
        subtitle: {
            text: translation?.t('Depense'),
            align: 'left',
            style: {
                fontSize: '14px',
            }
        },
        chart: {
            animations: {
                enabled: true,
                animateGradually: {
                    enabled: true,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 2000
                }
            },
            height: 200,
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ["#3c50e0"],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        yaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        xaxis: {
            categories: month_complete,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: true,
        },
        stroke: {
            width: 2,
            curve: 'straight'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.9,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: "#3c50e0",
                        opacity: 0.4
                    },
                    {
                        offset: 100,
                        color: "#3c50e0",
                        opacity: 0
                    }
                ]
            },
        },
        markers: {
            size: 0
        }
    }), [sumDepense, month_complete, translation]);

    const optionsLineReservation: ApexOptions = useMemo(() => ({
        title: {
            text: sumMontantReservation.toString() + ' €',
            align: 'left',
            style: {
                fontSize: '20px',
            }
        },
        subtitle: {
            text: translation?.t('Reservation'),
            align: 'left',
            style: {
                fontSize: '14px',
            }
        },
        chart: {
            animations: {
                enabled: true,
                animateGradually: {
                    enabled: true,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 2000
                }
            },
            height: 200,
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ["#3c50e0"],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        yaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        xaxis: {
            categories: month_complete,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: true,
        },
        stroke: {
            width: 2,
            curve: 'straight'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.9,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: "#3c50e0",
                        opacity: 0.4
                    },
                    {
                        offset: 100,
                        color: "#3c50e0",
                        opacity: 0
                    }
                ]
            },
        },
        markers: {
            size: 0
        }
    }), [sumMontantReservation, month_complete, translation]);

    const optionsLineDifference: ApexOptions = useMemo(() => ({
        title: {
            text: sumMontantReservation - sumDepense + ' €',
            align: 'left',
            style: {
                fontSize: '20px',
            }
        },
        subtitle: {
            text: translation?.t('average'),
            align: 'left',
            style: {
                fontSize: '14px',
            }
        },
        chart: {
            animations: {
                enabled: true,
                animateGradually: {
                    enabled: true,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 2000
                }
            },
            height: 200,
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ["#3c50e0"],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        yaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        xaxis: {
            categories: month_complete,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: true,
        },
        stroke: {
            width: 2,
            curve: 'straight'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.9,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: "#3c50e0",
                        opacity: 0.4
                    },
                    {
                        offset: 100,
                        color: "#3c50e0",
                        opacity: 0
                    }
                ]
            },
        },
        markers: {
            size: 0
        }
    }), [sumMontantReservation, sumDepense, month_complete, translation]);

    const optionsLineReservationByMonth: ApexOptions = useMemo(() => ({
        title: {
            text: translation?.t('reservation_by_month'),
            align: 'left',
        },
        chart: {
            animations: {
                enabled: true,
                animateGradually: {
                    enabled: true,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 2000
                }
            },
            height: 350,
            type: 'line',
        },
        colors: ["#3c50e0"],
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        stroke: {
            width: 3,
            curve: 'straight'
        },
        xaxis: {
            categories: month_complete,
            labels: {
                style: {
                    colors: "#3c50e0",
                    fontSize: '12px'
                }
            }
        }
    }), [month_complete, translation]);

    const optionsLineNegativePositive: ApexOptions = useMemo(() => ({
        chart: {
            type: 'bar',
            height: 440,
            stacked: true,
        },
        colors: ['#FF4560', '#3c50e0'],
        plotOptions: {
            bar: {
                borderRadius: 5,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
                horizontal: true,
                barHeight: '80%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 1,
            colors: ['#fff'],
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },

        tooltip: {
            shared: false,
            x: {
                formatter: function (val: any, {series, seriesIndex, dataPointIndex, w}: any) {
                    return w.globals.labels[dataPointIndex];
                },
            },
        },
        title: {
            text: translation?.t('expense_and_reservation'),
        },
        xaxis: {
            categories: month_complete,
            labels: {
                show: true,
            },
        },
        legend: {
            show: true,
        },
    }), [month_complete, translation]);

    const optionsRadialBar: ApexOptions = useMemo(() => ({
        chart: {
            toolbar: {
                show: true
            },
            height: 300,
            type: 'radialBar',
        },
        title: {
            text: translation?.t('occupation_rate_by_month') + " " + new Date().getFullYear(),
            align: 'left',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '25%'
                },
                track: {
                    show: true,
                    strokeWidth: '80%',
                    margin: 5,
                },
                dataLabels: {
                    total: {
                        show: true,
                        label: 'Total',
                        color: '#000000',
                        fontSize: '20px',
                        formatter: function () {
                            const listData = dataStat.tauxOccupationParMois;
                            const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // pour une année non bissextile

                            const totalWeighted = listData.reduce((sum: any, rate: any, index: any) => sum + (rate * daysInMonth[index]), 0);
                            const totalDays = daysInMonth.reduce((sum, days) => sum + days, 0);

                            const averageRate = totalWeighted / totalDays;
                            return Math.round(averageRate) + '%';
                        }
                    }
                }
            }
        },

        legend: {
            show: true,
            fontSize: '12px',
            labels: {
                colors: "#3c50e0",
                useSeriesColors: false
            },
            markers: {
                width: 10,
            },
        },
        labels: month_complete,
    }), [dataStat.tauxOccupationParMois, month_complete, translation]);

    const seriesLineReservation = useMemo(() => [{
        name: translation?.t('Reservation'),
        data: dataStat.montantReservationsParMois
    }], [dataStat.montantReservationsParMois, translation]);

    const seriesLineExpense = useMemo(() => [{
        name: translation?.t('Depense'),
        data: dataStat.depenseParMois
    }], [dataStat.depenseParMois, translation]);

    const seriesLineDifference = useMemo(() => [{
        name: translation?.t('average'),
        data: dataStat.montantReservationAndDepenseParMois
    }], [dataStat.montantReservationAndDepenseParMois, translation]);

    const series = useMemo(() => [
        {
            name: translation?.t('Reservation'),
            data: dataStat.nombreReservationParMois
        }
    ], [dataStat.nombreReservationParMois, translation]);

    const seriesLineNegativePositiveData = useMemo(() => [
        {
            name: translation?.t('Depense'),
            data: negativePositive
        },
        {
            name: translation?.t('Reservation'),
            data: dataStat.montantReservationsParMois
        }
    ], [negativePositive, dataStat.montantReservationsParMois, translation]);

    const seriesRadialBar = useMemo(() => dataStat.tauxOccupationParMois, [dataStat.tauxOccupationParMois]);

    return (
        <div className="bg-[#f1f5f9] h-screen overflow-y-auto">
            <div className="h-full lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
                <div className="mb-4 relative top-32">
                    <h2 className="text-2xl font-semibold text-black ml-2">
                        {translation?.t('Analytics')}
                    </h2>
                </div>
                <div className="mb-4 relative top-32 ml-2">
                    <select onChange={handleYearChange} value={selectedYear ?? ''}
                            className="p-2 bg-white border border-gray-300 rounded min-w-32">
                        {availableYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <SpinnerDashboard/>
                    </div>
                ) : (
                    <div className="mb-10 relative top-32">
                        <div className="flex justify-evenly mb-10 gap-x-10">
                            <div className="py-5 rounded-lg bg-white shadow-xl h-fit">
                                <ReactApexChart options={optionsLineExpense} series={seriesLineExpense} type="area"
                                                height={150}
                                                width={300}/>
                            </div>
                            <div className="py-5 rounded-lg bg-white shadow-xl h-fit">
                                <ReactApexChart options={optionsLineReservation} series={seriesLineReservation}
                                                type="area"
                                                height={150}
                                                width={300}/>
                            </div>
                            <div className="py-5 rounded-lg bg-white shadow-xl h-fit">
                                <ReactApexChart options={optionsLineDifference} series={seriesLineDifference}
                                                type="area"
                                                height={150}
                                                width={300}/>
                            </div>
                        </div>
                        <div
                            className=" rounded-lg bg-white overflow-x-auto no-scrollbar shadow-xl mb-10 max-h-[400px]">
                            <ReactApexChart options={optionsLineReservationByMonth} series={series} type="line"
                                            height={200}/>
                        </div>
                        <div className="flex justify-evenly mt-10 gap-x-10">
                            <div className="py-5 rounded-lg bg-white shadow-xl mb-10 max-h-[400px]">
                                <ReactApexChart options={optionsLineNegativePositive}
                                                series={seriesLineNegativePositiveData}
                                                type="bar"
                                                height={350}
                                                width={500}/>
                            </div>
                            <div className="py-5 rounded-lg bg-white shadow-xl mb-10">
                                <ReactApexChart options={optionsRadialBar} series={seriesRadialBar}
                                                type="radialBar"
                                                height={350}
                                                width={500}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
