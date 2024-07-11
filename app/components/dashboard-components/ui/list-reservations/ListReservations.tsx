import React, {useCallback, useEffect, useState} from 'react';
import {useAdminContext, useIsErrorContext, useNavbarContext, useTranslationContext} from "@/app/[lng]/hooks";
import {useRouter} from "next/navigation";
import ModalInfoHousing from "@/app/components/modal/modal-info-housing/ModalInfoHousing";
import SpinnerDashboard from '@/app/components/ui/SpinnerDashboard';
import {Tab} from "@headlessui/react";
import {getAllReservations} from "@/utils/apiReservation";
import DateFormaterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import ModalInfoClient from "@/app/components/modal/modal-info-client/ModalInfoClient";
import {getByIdHousingInFun} from "@/app/components/dashboard-components/ui/list-reservations/action";
import ModalAddReservation from "@/app/components/modal/modal-add-reservation/ModalAddReservation";
import ModalCancelHousing from "@/app/components/modal/modal-cancel-housing/ModalCancelHousing";
import ModalUpdateReservation from "@/app/components/modal/modal-update-reservation/ModalUpdateReservation";
import {Popover, PopoverButton, PopoverPanel, Transition} from '@headlessui/react'
import ModalValidateHousing from "@/app/components/modal/modal-validate-housing/ModalValidateHousing";

const ListReservations: React.FC = () => {
    const [ownerHousing, setOwnerHousing] = useState([] as any);
    const [reservationDetails, setReservationDetails] = useState({} as any);
    const [reservations, setReservations] = React.useState([] as any[]);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenValidate, setIsOpenValidate] = useState(false)
    const [isOpenInfoHousing, setIsOpenInfoHousing] = useState(false)
    const [isOpenInfoClient, setIsOpenInfoClient] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [clientDetails, setClientDetails] = useState({})
    const {setError} = useIsErrorContext();
    const {translation} = useTranslationContext();
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(4);
    const {theLanguage} = useNavbarContext();
    const [currentLanguage, setCurrentLanguage] = useState(theLanguage);
    const {isAdmin} = useAdminContext();
    const categories = {
        Upcoming: (translation: any) => (
            <>
                {reservations.filter((reservation: {
                    statut: string;
                }) => reservation.statut === 'reserved' || reservation.statut === 'payed').map((reservation: any, index: React.Key | null | undefined) => (
                    <ReservationRow key={index} reservation={reservation} translation={translation}
                                    openModalInfoClient={openModalInfoClient} currentLanguage={currentLanguage}
                                    openModalInfoHousing={openModalInfoHousing} openModalEdit={openModalEdit}
                                    openModalDelete={openModalDelete}
                                    openModalValidate={openModalValidate}/>
                ))
                }
            </>
        ),
        InProgress: (translation: any) => (
            <>
                {reservations.filter((reservation: {
                    statut: string;
                }) => reservation.statut === 'in progress').map((reservation: any, index: React.Key | null | undefined) => (
                    <ReservationRow key={index} reservation={reservation} translation={translation}
                                    openModalInfoClient={openModalInfoClient} currentLanguage={currentLanguage}
                                    openModalInfoHousing={openModalInfoHousing} openModalEdit={openModalEdit}
                                    openModalDelete={openModalDelete}
                                    openModalValidate={openModalValidate}/>

                ))
                }
            </>
        ),
        Done: (translation: any) => (
            <>
                {reservations.filter((reservation: {
                    statut: string;
                }) => reservation.statut === 'done').map((reservation: any, index: React.Key | null | undefined) => (
                    <ReservationRow key={index} reservation={reservation} translation={translation}
                                    openModalInfoClient={openModalInfoClient} currentLanguage={currentLanguage}
                                    openModalInfoHousing={openModalInfoHousing} openModalEdit={openModalEdit}
                                    openModalDelete={openModalDelete}
                                    openModalValidate={openModalValidate}/>

                ))
                }
            </>
        ),
        Cancelled: (translation: any) => (
            <>
                {reservations.filter((reservation: {
                    statut: string;
                }) => reservation.statut === 'cancelled').map((reservation: any, index: React.Key | null | undefined) => (
                    <ReservationRow key={index} reservation={reservation} translation={translation}
                                    openModalInfoClient={openModalInfoClient} currentLanguage={currentLanguage}
                                    openModalInfoHousing={openModalInfoHousing} openModalEdit={openModalEdit}
                                    openModalDelete={openModalDelete}
                                    openModalValidate={openModalValidate}/>

                ))
                }
            </>
        ),
        All: (translation: any) => (
            <>
                {reservations.map((reservation: any, index: React.Key | null | undefined) => (
                    <ReservationRow key={index} reservation={reservation} translation={translation}
                                    openModalInfoClient={openModalInfoClient} currentLanguage={currentLanguage}
                                    openModalInfoHousing={openModalInfoHousing} openModalEdit={openModalEdit}
                                    openModalDelete={openModalDelete}
                                    openModalValidate={openModalValidate}/>
                ))
                }
            </>
        )
    };

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    function openModalEdit(reservation: any) {
        setReservationDetails(reservation)
        setIsOpenEdit(true)
    }

    function openModalDelete(id: { id: number }) {
        setReservationDetails(id)
        setIsOpenDelete(true)
    }

    function openModalValidate(reservation: any) {
        setReservationDetails(reservation)
        setIsOpenValidate(true)
    }

    function openModalInfoHousing(id: number) {
        getByIdHousingInFun(id).then(
            (response) => {
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setError(null);
                    setOwnerHousing([response])
                    setIsOpenInfoHousing(true)
                }
            }
        )
    }

    function openModalInfoClient(nom: string, prenom: string, email: string, numTel: string) {

        let clientDetails = {
            nom: nom,
            prenom: prenom,
            email: email,
            numTel: numTel
        }
        setClientDetails(clientDetails)
        setIsOpenInfoClient(true)
    }

    function closeModal() {
        setIsOpenEdit(false)
        setIsOpenDelete(false)
        setIsOpenCreate(false)
        setIsOpenInfoHousing(false)
        setIsOpenInfoClient(false)
        setIsOpenValidate(false)
    }

    const getAllReservationsInFun = useCallback(() => {
        setLoading(true)
        getAllReservations()
            .then((response) => {
                if (response.errors) {
                    setError(response.errors);
                    router.push("/dashboard");
                } else {
                    setError(null);
                    // met les reservation avec statut 'reserved' en premier
                    response.sort((a: any, b: any) => {
                        if (a.statut === 'reserved') {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    setReservations(response);
                }
                setLoading(false)
            });
    }, [router, setError]);

    useEffect(() => {
        getAllReservationsInFun();
    }, [getAllReservationsInFun]);

    useEffect(() => {
        setCurrentLanguage(theLanguage);
    }, [theLanguage]);
    return (
        <div className="h-full lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
            {!loading ?
                <>
                    <div className="mb-10  relative top-32"><h2
                        className="text-2xl font-semibold text-black  ml-2">{translation?.t('Reservation')}</h2>
                    </div>
                    <div className=" relative my-auto top-32 ">
                        <Tab.Group
                            selectedIndex={selectedIndex}
                            onChange={setSelectedIndex}
                        >
                            <Tab.List
                                className="flex gap-5  w-full rounded-xl bg-custom-search  p-1  max-w-xl
                                float-start overflow-x-auto no-scrollbar mb-2
                           ">
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({selected}: { selected: boolean }) =>
                                            classNames(
                                                'w-full py-2.5 text-sm font-medium leading-5',
                                                'focus:outline-none text-black text-nowrap',
                                                selected
                                                    ? ' border-[#3c50e0]  border-b'
                                                    : 'text-black'
                                            )
                                        }
                                    >
                                        {category === 'Upcoming' ? translation?.t('a_venir') :
                                            category === 'InProgress' ? translation?.t('en_cours') :
                                                category === 'Cancelled' ? translation?.t('cancelled') :
                                                    category === 'Done' ? translation?.t('termine') :
                                                        category === 'All' ?
                                                            translation?.t('all') :
                                                            <></>
                                        }
                                    </Tab>
                                ))}
                            </Tab.List>
                            <div className="relative  w-full flex justify-end mb-2 ">
                                {
                                    isAdmin &&
                                    <button
                                        onClick={() => setIsOpenCreate(true)}
                                        className="flex items-center gap-2 rounded bg-[#3c50e0] px-4 py-2 font-medium text-sm text-white hover:bg-opacity-80">
                                        <svg className="fill-current" width="13" height="13"
                                             viewBox="0 0 16 16"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                                                fill=""></path>
                                        </svg>
                                        {translation?.t('form_add_reservation')}
                                    </button>
                                }
                            </div>
                            <div
                                className="relative border rounded-[10px] stroke-2 bg-white max-h-[60vh]  overflow-auto"
                            >
                                <div className="max-w-full ">
                                    <div className="min-w-[1170px]">
                                        <div
                                            className="grid grid-cols-20 bg-[#F9FAFB] px-5 py-4 gap-x-20 min-w-fit sticky top-0 z-10">
                                            <div
                                                className="col-span-3 flex items-center justify-center">
                                                <p
                                                    className="font-medium">Action</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium">{translation?.t('statut')}</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium">{translation?.t('traveler')}</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium text-nowrap">{translation?.t('start_date')}</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium text-nowrap">{translation?.t('end_date')}</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium">{translation?.t('reserved')}</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium">{translation?.t('house')}</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium">{translation?.t('code_de_reservation')}</p>
                                            </div>
                                            <div
                                                className="col-span-2 flex items-center justify-center">
                                                <p
                                                    className="font-medium">{translation?.t('versement')}</p>
                                            </div>
                                        </div>
                                        <Tab.Panels className="rounded-xl">
                                            {Object.values(categories).map((posts, idx) => (
                                                <Tab.Panel
                                                    key={idx}
                                                    className={classNames(
                                                        'rounded-3xl',
                                                        ' focus:outline-none '
                                                    )}
                                                >
                                                    {posts(translation)}
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                    </div>
                                </div>
                            </div>
                        </Tab.Group>
                    </div>
                </>
                :
                <SpinnerDashboard/>
            }
            {isOpenCreate &&
                <ModalAddReservation isOpen={isOpenCreate} onClose={closeModal}
                                     getAllReservations={getAllReservationsInFun}/>
            }
            {isOpenEdit &&
                <ModalUpdateReservation isOpen={isOpenEdit} onClose={closeModal} reservationData={reservationDetails}
                                        getAllReservations={getAllReservationsInFun}/>
            }
            {isOpenDelete &&
                <ModalCancelHousing isOpen={isOpenDelete} onClose={closeModal} id={reservationDetails}
                                    getAllOwners={getAllReservationsInFun}/>
            }
            {isOpenValidate &&
                <ModalValidateHousing isOpen={isOpenValidate} onClose={closeModal}
                                      id={reservationDetails.id.toString()}
                                      getAllOwners={getAllReservationsInFun}/>
            }
            {isOpenInfoHousing &&
                <ModalInfoHousing isOpen={isOpenInfoHousing} onClose={closeModal} housings={ownerHousing}/>
            }
            {isOpenInfoClient &&
                <ModalInfoClient isOpen={isOpenInfoClient} onClose={closeModal} user={clientDetails}/>
            }
        </div>
    );
};

const ReservationRow = ({
                            reservation,
                            translation,
                            openModalInfoClient,
                            currentLanguage,
                            openModalInfoHousing,
                            openModalEdit,
                            openModalDelete,
                            openModalValidate
                        }:
                            {
                                reservation: any,
                                translation
                                    :
                                    any
                                openModalInfoClient: any,
                                currentLanguage
                                    :
                                    any,
                                openModalInfoHousing
                                    :
                                    any,
                                openModalEdit
                                    :
                                    any,
                                openModalDelete
                                    :
                                    any,
                                openModalValidate
                                    :
                                    any
                            }) => {
    const {isAdmin} = useAdminContext();

    return (
        <div className="grid grid-cols-20 border-t px-5 py-4 gap-x-20 min-w-fit ">
            {
                reservation.statut === 'reserved' && isAdmin ?

                    <div className={"col-span-3 flex flex-row justify-center"}>
                        <Popover className="relative">
                            <PopoverButton
                                className="px-2 py-1 bg-[#3c50e0] text-white rounded focus:outline-none text-sm flex ">
                                Actions
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="size-4  ml-2 mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                </svg>

                            </PopoverButton>
                            <PopoverPanel anchor="bottom"
                                          className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center">
                                <div
                                    className="flex text-sm text-[#3c50e0] hover:underline cursor-pointer "
                                    onClick={() => openModalEdit(reservation)}>
                                    {translation?.t('edit')}
                                </div>
                                <hr className={"mt-1"}/>
                                <div
                                    className=" text-sm text-green-600 hover:underline cursor-pointer mt-2 "
                                    onClick={() => openModalValidate(reservation)}>
                                    {translation?.t('validate')}
                                </div>
                                <hr className={"mt-1"}/>
                                <div
                                    className=" text-sm text-red-600 hover:underline cursor-pointer mt-2 "
                                    onClick={() => openModalDelete({
                                        id: reservation.id,
                                    })}>
                                    {translation?.t('remboursement')}
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </div>

                    :
                    <div
                        className="col-span-3 flex items-center justify-center">
                        <p
                            className="font-medium text-sm">{translation?.t('no_action')}</p>
                    </div>

            }

            <div className="col-span-2 flex items-center justify-center max-w-36 overflow-auto no-scrollbar">
                <p className="text-sm text-black text-nowrap">{translation?.t(reservation.statut)}</p>
            </div>
            <div
                className="col-span-2 flex items-center pl-2  text-[#3c50e0] hover:underline cursor-pointer text-nowrap"
                onClick={() => openModalInfoClient(reservation.nom, reservation.prenom, reservation.email, reservation.numTel)}>
                <p className="text-sm">
                    {(reservation.prenom.length + reservation.nom.length) > 10
                        ? `${reservation.prenom.substring(0, 9)} ${reservation.nom.substring(0, Math.max(0, 9 - reservation.prenom.substring(0, 9).length))}...`
                        : `${reservation.prenom} ${reservation.nom}`
                    }
                </p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-black"><DateFormaterEnFr date={reservation.dateArrivee}
                                                                    theLanguage={currentLanguage}/></p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-black"><DateFormaterEnFr date={reservation.dateDepart}
                                                                    theLanguage={currentLanguage}/></p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-black"><DateFormaterEnFr date={reservation.dateReservation}
                                                                    theLanguage={currentLanguage}/></p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-[#3c50e0] hover:underline cursor-pointer"
                   onClick={() => openModalInfoHousing(reservation.idLogement)}>
                    {reservation.titreLogement.length > 10 ? reservation.titreLogement.substring(0, 10) + '...' : reservation.titreLogement}
                </p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-black">{reservation.idCommande}</p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-black">{reservation.montant}</p>
            </div>
        </div>
    )
        ;
}

export default ListReservations;
