import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {useExpenseStatContext, useTranslationContext} from "@/app/[lng]/hooks";
import {getAllDepensesInFun} from "@/app/components/dashboard-components/list-depenses/actions";

const DepenseDashboard: React.FC = () => {
    const {translation} = useTranslationContext();
    const month_complete = translation?.t('month_complete', {returnObjects: true}) ?? [];
    const [data, setData] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        getAllDepensesInFun().then((responses) => {
            let depensesMonth = Array(12).fill(0);
            if (responses.errors) {
                return;
            }
            responses.map((response: any) => {
                let date = new Date(response.date);
                let month = date.getMonth();
                depensesMonth[month] += response.prix;
            });
            setData(depensesMonth);
        });
    }, []);
    const options: ApexOptions = {
        chart: {
            animations: {

                dynamicAnimation: {
                    enabled: true,
                    speed: 2000
                }
            },
            height: 350,
            type: 'bar',
        },
        colors: ["#0080ff"],
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
        xaxis: {
            categories: month_complete,
            labels: {
                style: {
                    colors: "#0080ff",
                    fontSize: '12px'
                }
            }
        }
    };

    const series = [
        {
            name: "Expenses",
            data: data
        }
    ];

    return (
        <>
            <div className="bg-[#f1f5f9] h-screen ">
                <div className="h-full lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
                    <div className="mb-10 relative top-32">
                        <ReactApexChart options={options} series={series} type="bar" height={350}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DepenseDashboard;
