import React, {useCallback, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {
    useAdminContext,
    useIsErrorContext,
    useNavbarContext,
    useTranslationContext
} from "@/app/[lng]/hooks";
import {getAllDepensesInFun} from "@/app/components/dashboard-components/list-depenses/actions";
import DateFormaterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import {getByIdHousingInFun} from "@/app/components/dashboard-components/ui/list-reservations/action";
import ModalInfoHousing from "@/app/components/modal/modal-info-housing/ModalInfoHousing";
import ModalAddDepense from "@/app/components/modal/modal-add-depense/ModalAddDepense";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import {ApexOptions} from "apexcharts";
import ModalUpdateDepense from "@/app/components/modal/modal-update-depense/ModalUpdateDepense";
import ModalDeleteDepense from "@/app/components/modal/modal-delete-depense/ModalDeleteDepense";
import {de} from "date-fns/locale";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});

const DepenseDashboard: React.FC = () => {
    const {translation} = useTranslationContext();
    const {theLanguage} = useNavbarContext();
    const month_complete = translation?.t('month_complete', {returnObjects: true}) ?? [];
    const [data, setData] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [depenses, setDepenses] = useState<any>([]);
    const [depenseCurrent, setDepenseCurrent] = useState<any>(null);
    const {setError} = useIsErrorContext();
    const [housing, setHousing] = useState<any>([]);
    const [isOpenInfoHousing, setIsOpenInfoHousing] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const {isAdmin} = useAdminContext();
    const [isLoading, setLoading] = useState(false);

    const getAllDep = useCallback(() => {
        setLoading(true);
        getAllDepensesInFun()
            .then((response) => {
                let depensesMonth = Array(12).fill(0);
                if (response.errors) {
                    return;
                }
                response.map((response: any) => {
                    let date = new Date(response.date);
                    let month = date.getMonth();
                    depensesMonth[month] += response.prix;
                });
                setData(depensesMonth);
                setDepenses(response);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        getAllDep();
    }, [getAllDep]);

    function openModalInfoHousing(id: number) {
        getByIdHousingInFun(id).then(
            (response) => {
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setError(null);
                    setHousing([response]);
                    setIsOpenInfoHousing(true);
                }
            }
        );
    }

    function openModalCreate() {
        setIsOpenCreate(true);
    }

    function openModalDelete(depense: any) {
        setIsOpenDelete(true);
        setDepenseCurrent(depense)
    }

    function openModalUpdate(depense: any) {
        setDepenseCurrent(depense)
        setIsOpenUpdate(true);
    }

    function closeModal() {
        setIsOpenInfoHousing(false);
        setIsOpenCreate(false);
        setIsOpenUpdate(false);
        setIsOpenDelete(false);
    }

    const options: ApexOptions = {
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
            type: 'bar',
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

    const series = [
        {
            name: translation?.t('Depense'),
            data: data
        }
    ];

    return (
        <>
            <div className="bg-[#f1f5f9] h-screen">
                <div className="h-full lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
                    <div className="mb-4 relative top-32">
                        <h2 className="text-2xl font-semibold text-black dark:text-white ml-2">
                            {translation?.t('Depense')}
                        </h2>
                    </div>
                    <div className="mb-10 relative top-32">
                        <ReactApexChart options={options} series={series} type="bar" height={200}/>
                    </div>
                    <div>
                        {isLoading ? (
                            <SpinnerDashboard/>
                        ) : (
                            <>
                                <div className="relative w-full flex justify-end mb-2 top-32">
                                    {isAdmin && (
                                        <button
                                            onClick={openModalCreate}
                                            className="flex items-center gap-2 rounded bg-[#3c50e0] px-4 py-2 font-medium text-sm text-white hover:bg-opacity-80"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="13"
                                                height="13"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                                                    fill=""
                                                ></path>
                                            </svg>
                                            {translation?.t('form_add_reservation')}
                                        </button>
                                    )}
                                </div>
                                <div
                                    className="relative border bg-white top-32 rounded-[10px] stroke-2 max-h-[40vh] overflow-auto">
                                    <div className="max-w-full">
                                        <div className="min-w-[1170px]">
                                            <div className="grid grid-cols-12 bg-[#F9FAFB] px-5 py-4">
                                                <div className="col-span-2 items-center">
                                                    <p className="font-medium">
                                                        {translation?.t('housing_titre')}
                                                    </p>
                                                </div>
                                                <div className="col-span-2 items-center">
                                                    <p className="font-medium">Date</p>
                                                </div>
                                                <div className="col-span-2 items-center">
                                                    <p className="font-medium">
                                                        {translation?.t('house')}
                                                    </p>
                                                </div>
                                                <div className="col-span-2 items-center">
                                                    <p className="font-medium">
                                                        {translation?.t('montant')}
                                                    </p>
                                                </div>
                                            </div>
                                            {depenses.map((depense: any, index: number) => (
                                                <div
                                                    className="grid border-t py-4 grid-cols-12 px-5"
                                                    key={index}
                                                >
                                                    <div
                                                        className="col-span-2 items-center flex max-w-36 overflow-auto no-scrollbar">
                                                        <div className="flex gap-4 flex-row items-center">
                                                            <p className="text-sm text-black">
                                                                {depense.libelle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-span-2 items-center flex max-w-36 overflow-auto no-scrollbar">
                                                        <p className="text-sm text-black">
                                                            <DateFormaterEnFr
                                                                date={depense.date}
                                                                theLanguage={theLanguage}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="col-span-2 flex items-center text-nowrap">
                                                        <p
                                                            className="text-sm text-[#3c50e0] hover:underline cursor-pointer"
                                                            onClick={() =>
                                                                openModalInfoHousing(depense.idLogement)
                                                            }
                                                        >
                                                            {depense.titreLogement.length > 10
                                                                ? depense.titreLogement.substring(
                                                                0,
                                                                10
                                                            ) + '...'
                                                                : depense.titreLogement}
                                                        </p>
                                                    </div>
                                                    <div className="col-span-2 flex items-center">
                                                        <p className="text-sm text-black">
                                                            {depense.prix} €
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="col-span-1 items-center flex text-sm text-[#3c50e0] hover:underline cursor-pointer"
                                                        onClick={() => openModalUpdate(depense)}
                                                    >
                                                        {translation?.t('edit')}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-4 h-4 ml-1"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        className="col-span-1 items-center flex text-sm text-red-600 hover:underline cursor-pointer ml-10 w-fit"
                                                        onClick={() => {
                                                            openModalDelete(depense);
                                                        }}
                                                    >
                                                        {translation?.t('delete')}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-4 h-4 ml-1"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {isOpenInfoHousing && (
                    <ModalInfoHousing
                        isOpen={isOpenInfoHousing}
                        onClose={closeModal}
                        housings={housing}
                    />
                )}
                {isOpenCreate && (
                    <ModalAddDepense
                        isOpen={isOpenCreate}
                        onClose={closeModal}
                        getAllDepense={getAllDep}
                    />
                )}
                {isOpenUpdate && (
                    <ModalUpdateDepense
                        isOpen={isOpenUpdate}
                        onClose={closeModal}
                        getAllDepense={getAllDep}
                        depense={depenseCurrent}
                    />
                )}
                {isOpenDelete && (
                    <ModalDeleteDepense
                        isOpen={isOpenDelete}
                        onClose={closeModal}
                        getAllDepense={getAllDep}
                        id={depenseCurrent.id}
                    />
                )}
            </div>
        </>
    );
};

export default DepenseDashboard;
