import React, {useCallback, useEffect, useState} from "react";
import {useAdminContext, useIsErrorContext, useNavbarContext, useTranslationContext} from "@/app/[lng]/hooks";
import ModalAddInvoice from "@/app/components/modal/modal-add-invoice/ModalAddInvoice";
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronDownIcon, PaperAirplaneIcon} from '@heroicons/react/20/solid'
import DatePicker from "react-datepicker";
import {downloadInvoiceFun, getAllInvoiceInFun} from "@/app/components/dashboard-components/list-invoice/actions";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import dayjs from "dayjs";
import ModalSendInvoice from "@/app/components/modal/modal-send-invoice/ModalSendInvoice";
import {getByIdOwner} from "@/utils/apiOwner";
import {ProprietaireDTO} from "@/app/model/Owner";
import ModalInfoOwner from "@/app/components/modal/modal-info-owner/ModalInfoOwner";
import ModalDeleteInvoice from "@/app/components/modal/modal-delete-invoice/ModalDeleteInvoice";

export const InvoiceDashboard: React.FC = () => {
    const {translation} = useTranslationContext();
    const {isAdmin} = useAdminContext();
    const [isOpenCreate, setIsOpenCreate] = React.useState(false);
    const [isOpenSend, setIsOpenSend] = React.useState(false);
    const [isOpenInfoOwner, setIsOpenInfoOwner] = React.useState(false);
    const [isOpenDelete, setIsOpenDelete] = React.useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataAllInvoice, setDataAllInvoice] = useState([] as any);
    const [filteredInvoices, setFilteredInvoices] = useState([] as any);
    const {setError} = useIsErrorContext()
    const days = translation?.t('days_calendar', {returnObjects: true}) ?? [];
    const months = translation?.t('months', {returnObjects: true}) ?? [];
    const {theLanguage} = useNavbarContext();
    const getAllInv = useCallback(() => {
        setIsLoading(true);
        getAllInvoiceInFun().then(
            (res: any) => {
                if (res.errors) {
                    setError(res.errors[0]);
                    return;
                }
                setDataAllInvoice(res);
            }
        ).finally(() => setIsLoading(false));
    }, [setError]);
    const [idInvoiceSleected, setIdInvoiceSelected] = useState(null);
    const [ownerSlected, setOwnerSelected] = useState<ProprietaireDTO>({} as ProprietaireDTO);
    const [openStates, setOpenStates] = useState<any>({});

    useEffect(() => {
        getAllInv();
    }, [getAllInv]);

    useEffect(() => {
        if (selectedDate) {
            const filtered = dataAllInvoice
                .filter((invoice: any) =>
                    dayjs(invoice.dateFacture).month() === selectedDate.getMonth() &&
                    dayjs(invoice.dateFacture).year() === selectedDate.getFullYear()
                )
                .sort((a: any, b: any) => dayjs(a.dateFacture).isBefore(dayjs(b.dateFacture)) ? -1 : 1);
            setFilteredInvoices(filtered);
        } else {
            const sorted = dataAllInvoice.sort((a: any, b: any) => dayjs(a.dateFacture).isBefore(dayjs(b.dateFacture)) ? -1 : 1);
            setFilteredInvoices(sorted);
        }
    }, [selectedDate, dataAllInvoice]);

    const toggleOpen = (date: any) => {
        setOpenStates((prev: any) => ({
            ...prev,
            [date]: !prev[date],
            [date]: !prev[date],
        }));
    };

    function downloadInvoice(id: any) {
        downloadInvoiceFun(id).then(
            (res: any) => {
                if (res.errors) {
                    setError(res.errors[0]);
                    return;
                }
                window.location.href = res.url
            }
        )
    }

    function closeModal() {
        setIsOpenCreate(false);
        setIsOpenSend(false);
        setIsOpenInfoOwner(false);
        setIsOpenDelete(false);
    }

    function openModalInfoOwner(id: number) {
        getByIdOwner(id.toString()).then((response) => {
            if (response.errors) {
                setError(response.errors);
                return;
            } else {
                setOwnerSelected(response);
                setIsOpenInfoOwner(true);
            }
        });
    }

    const handleChangeDate = (date: any) => {
        setSelectedDate(date);
    };

    const handleFocus = (e: any) => {
        e.preventDefault();
        e.target.blur();
    };

    const clearFilter = () => {
        setSelectedDate(null);
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

    const groupedInvoices = filteredInvoices.reduce((acc: any, invoice: any) => {
        const date = dayjs(invoice.dateFacture).format('YYYY-MM-DD');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(invoice);
        return acc;
    }, {});

    return (
        <>
            <div className="bg-[#f1f5f9] h-screen">
                <div className="h-full lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
                    <div className="mb-4 relative top-32">
                        <h2 className="text-2xl font-semibold text-black ml-2">
                            {translation?.t('Invoice')}
                        </h2>
                    </div>
                    <div className=" relative my-auto top-32 ">
                        <div className="relative  w-full flex justify-end mb-2 mt-10 px-4">

                            <div className={"flex justify-between w-full gap-x-10  items-center"}>
                                <div className="flex items-center gap-2">
                                    <DatePicker
                                        id="datePicker"
                                        selected={selectedDate}
                                        showMonthYearPicker
                                        dateFormat="MMM, yyyy"
                                        onChange={handleChangeDate}
                                        onChangeRaw={handleFocus}
                                        onFocus={handleFocus}
                                        locale={locale}
                                        className="border-1 border-solid border-gray-300 rounded-md cursor-pointer"
                                        placeholderText={translation?.t('select_month')}
                                    />
                                    {
                                        selectedDate &&
                                        <button
                                            onClick={clearFilter}
                                            className="flex items-center gap-2 rounded bg-gray-300 px-4 py-2 font-medium text-sm text-black hover:bg-opacity-80 text-nowrap">
                                            {translation?.t('clear_filter')}
                                        </button>
                                    }
                                </div>
                                {
                                    isAdmin &&
                                    <button
                                        onClick={() => setIsOpenCreate(true)}
                                        className="flex items-center gap-2 rounded bg-[#3c50e0] px-4 py-2 font-medium text-sm text-white hover:bg-opacity-80 text-nowrap">
                                        <svg className="fill-current" width="13" height="13"
                                             viewBox="0 0 16 16"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                                                fill=""></path>
                                        </svg>
                                        {translation?.t('form_add_invoice')}
                                    </button>
                                }
                            </div>
                        </div>
                        {isLoading ?
                            <SpinnerDashboard/>
                            :
                            <div
                                className=" w-full divide-y divide-gray-200 rounded-xl max-h-[60vh] overflow-y-auto ">
                                {Object.keys(groupedInvoices)?.map((date) => (
                                    <Disclosure as="div" className="p-6" key={date}>
                                        <DisclosureButton className="group flex w-full items-center "
                                                          onClick={() => toggleOpen(date)}
                                        >
                                            <p className="text-lg font-medium  group-hover:text-gray-700">
                                                {months[dayjs(date).month()]}, {dayjs(date).year()}
                                            </p>
                                            <ChevronDownIcon
                                                className={`size-5 fill-gray-600 group-hover:fill-gray-500 ml-5 transition-transform duration-300 ${
                                                    openStates[date] ? 'transform rotate-180' : 'rotate-0'
                                                }`}
                                            />
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-2 text-sm text-gray-500">
                                            {groupedInvoices[date]?.map((invoice: any) => (
                                                <div className="py-2" key={invoice.id}>
                                                    <dd className="mt-2 text-sm text-gray-900">
                                                        <ul role="list"
                                                            className="divide-y divide-gray-100 rounded-md border border-gray-200 overflow-x-auto no-scrollbar">
                                                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                                <div className="flex gap-x-10 items-center">
                                                                    <div className=" max-w-36 overflow-auto no-scrollbar flex
                                                                    text-[#3c50e0] hover:underline cursor-pointer text-nowrap"
                                                                         onClick={
                                                                             () => {
                                                                                 openModalInfoOwner(invoice.idProprietaire);
                                                                             }
                                                                         }>
                                                                        <p className="text-sm">
                                                                            {(invoice.prenomProprietaire.length + invoice.nomProprietaire.length) > 30
                                                                                ? `${invoice.prenomProprietaire.substring(0, 30)} ${invoice.nomProprietaire.substring(0, Math.max(0, 30 - invoice.prenomProprietaire.substring(0, 30).length))}...`
                                                                                : `${invoice.prenomProprietaire} ${invoice.nomProprietaire}`
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className={"flex"}>
                                                                        <svg
                                                                            className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor" aria-hidden="true">
                                                                            <path fillRule="evenodd"
                                                                                  d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                                                  clipRule="evenodd"/>
                                                                        </svg>
                                                                        <div
                                                                            className="ml-1 flex min-w-0 flex-1 gap-2"
                                                                            onClick={() => downloadInvoice(invoice.numeroFacture)}>
                                                                            <p className="truncate font-medium hover:underline text-[#3c50e0]">{invoice.url.split('/').pop()}</p>
                                                                            <span
                                                                                className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {isAdmin &&
                                                                    <div className="flex">
                                                                        <div
                                                                            className={" text-[#3c50e0] flex hover:underline cursor-pointer"}
                                                                            onClick={() => {
                                                                                setIsOpenSend(true);
                                                                                setIdInvoiceSelected(invoice.id);
                                                                            }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                 fill="none"
                                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                                 stroke="currentColor"
                                                                                 className="size-4 mt-1">
                                                                                <path strokeLinecap="round"
                                                                                      strokeLinejoin="round"
                                                                                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
                                                                            </svg>
                                                                            <p className="font-medium ml-2">{translation?.t('send')}</p>
                                                                        </div>
                                                                        <div
                                                                            className={" text-red-600 flex ml-10 hover:underline cursor-pointer"}
                                                                            onClick={
                                                                                () => {
                                                                                    setIsOpenDelete(true);
                                                                                    setIdInvoiceSelected(invoice.id);
                                                                                }
                                                                            }>
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                 fill="none" viewBox="0 0 24 24"
                                                                                 strokeWidth={1.5} stroke="currentColor"
                                                                                 className="size-4 mt-1">
                                                                                <path strokeLinecap="round"
                                                                                      strokeLinejoin="round"
                                                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                                            </svg>
                                                                            <p className="font-medium ml-2">{translation?.t('delete')}</p>
                                                                        </div>
                                                                    </div>

                                                                }
                                                            </li>
                                                        </ul>
                                                    </dd>
                                                </div>
                                            ))}
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
            {
                isOpenCreate &&
                <ModalAddInvoice isOpen={isOpenCreate} onClose={closeModal} getAllInvoice={getAllInv}/>
            }
            {
                isOpenSend &&
                <ModalSendInvoice isOpen={isOpenSend} onClose={closeModal} id={idInvoiceSleected}/>
            }
            {
                isOpenInfoOwner &&
                <ModalInfoOwner isOpen={isOpenInfoOwner} onClose={closeModal} user={ownerSlected}/>
            }
            {
                isOpenDelete &&
                <ModalDeleteInvoice isOpen={isOpenDelete} onClose={closeModal} id={idInvoiceSleected ?? ''}
                                    getAllInvoice={getAllInv}/>
            }
        </>
    );
}
