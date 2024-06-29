import React, {useState} from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";
import dynamic from "next/dynamic";
import {ApexOptions} from "apexcharts";
import "../../../globals.css";

export const AnalyticsDashboard: React.FC = () => {
    const {translation} = useTranslationContext();
    const month_complete = translation?.t('month_complete', {returnObjects: true}) ?? [];
    const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});
    const [selectedYear, setSelectedYear] = useState<number | null>(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState<number[]>([new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1]);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };
    const optionsLine: ApexOptions = {
        subtitle: {
            text: 'Profits',
            align: 'left',
            style: {
                fontSize: '14px',
            }
        },
        title: {
            text: 'Test',
            align: 'left',
            style: {
                fontSize: '20px',
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
    };
    const options: ApexOptions = {
        title: {
            text: 'Reservation by month',
            align: 'left',
            style: {
                fontSize: '20px',
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
    };
    const optionsDonut: ApexOptions = {

        chart: {
            type: 'bar',
            height: 440,
            stacked: true
        },
        colors: ['#FF4560', '#3c50e0'],
        plotOptions: {
            bar: {
                borderRadius: 5,
                borderRadiusApplication: 'end', // 'around', 'end'
                borderRadiusWhenStacked: 'all', // 'all', 'last'
                horizontal: true,
                barHeight: '80%',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },

        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            }
        },
        yaxis: {
            seriesName: month_complete,
            stepSize: 1,

            //set name of the series
            labels: {
                show: true,
                formatter: function () {
                    return month_complete
                }
            }
        },
        tooltip: {
            shared: false,
            x: {
                formatter: function (val) {
                    return Math.abs(val) + "%"
                }
            },
            y: {
                formatter: function (val) {
                    return Math.abs(val) + "%"
                }
            }
        },
        title: {
            text: 'Mauritius population pyramid 2011'
        },

        xaxis: {
            labels: {
                show: false
            }
        },
        legend: {
            show: false
        }
    };
    const optionsRadialBar = {
        chart: {
            height: 300,
            type: 'radialBar',
        },
        plotOptions: {

            radialBar: {
                size: undefined, // Utilisation de la taille par défaut
                hollow: {
                    size: '25%' // Réduction de la taille du centre creux
                },
                track: {
                    show: true,
                    strokeWidth: '80%', // Ajustement de la largeur de la piste
                    margin: 5, // Réduction de l'espace entre les barres
                },
                dataLabels: {
                    total: {
                        show: true,
                        label: 'Total',
                        color: '#000000',
                        fontSize: '20px',
                    }
                }
            }
        },
        legend: {
            show: true,
            colors: ["#3c50e0"],
            fontSize: '12px',
            labels: {
                colors: "#3c50e0",
                useSeriesColors: false
            },
            markers: {
                width: 10,
                color: '#3c50e0',
            },

        },
        labels: month_complete,
    };

    //prix par mois des reservations
    // depenses par mois
    // prix par mois des conciergeries
    const seriesLine = [{
        data: [30, 100, 35, 50, 49, 60, 70, 91, 125]
    }];
    //reservation by month
    const series = [
        {
            name: translation?.t('Reservation'),
            //reservation by month
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100, 150, 200]
        }
    ];
    //reservation by housing
    const seriesDonut = [
        {
            name: 'Males',
            data: [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12]
        },
        {
            name: 'Females',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    ]

    return (
        <div className="bg-[#f1f5f9] h-screen overflow-y-auto   ">
            <div className="h-full lg:ml-80 lg:mr-7 mr-2 ml-14 z-0   ">
                <div className="mb-4 relative top-32">
                    <h2 className="text-2xl font-semibold text-black ml-2 ">
                        {translation?.t('Analytics')}
                    </h2>
                </div>
                <div className="mb-4 relative top-32 ml-2 ">
                    <select onChange={handleYearChange} value={selectedYear ?? ''}
                            className="p-2 bg-white border border-gray-300 rounded min-w-32">
                        {availableYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-10 relative top-32">
                    <div className={"flex justify-evenly mb-10 gap-x-10"}>
                        <div className={" py-5 rounded-lg bg-white shadow-xl h-fit "}>
                            <ReactApexChart options={optionsLine} series={seriesLine} type="area" height={150}
                                            width={300}/>
                        </div>
                        <div className={" py-5 rounded-lg bg-white shadow-xl  h-fit"}>
                            <ReactApexChart options={optionsLine} series={seriesLine} type="area" height={150}
                                            width={300}/>
                        </div>
                        <div className={" py-5 rounded-lg bg-white shadow-xl  h-fit"}>
                            <ReactApexChart options={optionsLine} series={seriesLine} type="area" height={150}
                                            width={300}/>
                        </div>
                    </div>

                    <div className={" py-5 rounded-lg bg-white shadow-xl"}>
                        <ReactApexChart options={options} series={series} type="line" height={200}/>
                    </div>
                    <div className={"flex justify-evenly mt-10 gap-x-10 "}>
                        <div className={" py-5 rounded-lg bg-white shadow-xl mb-10 max-h-[400px]"}>
                            <ReactApexChart options={optionsDonut} series={seriesDonut} type="bar" height={350}
                                            width={500}/>
                        </div>
                        <div className={"py-5 rounded-lg bg-white shadow-xl mb-10"}>
                            <ReactApexChart options={optionsRadialBar} series={seriesDonut} type="radialBar"
                                            height={400}
                                            width={500}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
