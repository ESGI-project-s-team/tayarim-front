import React, {useCallback, useEffect, useState} from 'react';
import ModalEditOwner from "@/app/components/modal/modal-edit-owner/ModalEditOwner";
import {ProprietaireDTO} from "@/app/model/Owner";
import ModalDeleteOwner from "@/app/components/modal/modal-delete-owner/ModalDeleteOwner";
import {useAdminContext, useIsErrorContext, useNavbarContext, useTranslationContext} from "@/app/[lng]/hooks";
import ModalCreateOwner from "@/app/components/modal/modal-create-owner/ModalCreateOwner";
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

const ListReservations: React.FC = () => {
    const [ownerHousing, setOwnerHousing] = useState([] as any);
    const [reservationDetails, setReservationDetails] = useState({} as any);
    const [reservations, setReservations] = React.useState([] as any[]);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
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
    const categories = {
        Upcoming: (translation: any) => (
            <>
                {reservations.filter((reservation: {
                    statut: string;
                }) => reservation.statut === 'payed').map((reservation: any, index: React.Key | null | undefined) => (
                    <ReservationRow key={index} reservation={reservation} translation={translation}
                                    openModalInfoClient={openModalInfoClient} currentLanguage={currentLanguage}
                                    openModalInfoHousing={openModalInfoHousing} openModalEdit={openModalEdit}
                                    openModalDelete={openModalDelete}/>
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
                                    openModalDelete={openModalDelete}/>
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
                                    openModalDelete={openModalDelete}/>
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
                                    openModalDelete={openModalDelete}/>
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
                                    openModalDelete={openModalDelete}/>
                ))
                }
            </>
        )
    };

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    function openModalEdit(owner: ProprietaireDTO) {

        setIsOpenEdit(true)
    }

    function openModalDelete(id: { id: number }) {
        setReservationDetails(id)
        setIsOpenDelete(true)
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
                    <div className=" relative  mx-auto my-auto top-32 ">
                        <Tab.Group
                            selectedIndex={selectedIndex}
                            onChange={setSelectedIndex}
                        >
                            <Tab.List
                                className="flex gap-5  w-full rounded-xl bg-custom-search  p-1  max-w-xl
                                float-start overflow-x-auto no-scrollbar mb-10
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
                            </div>
                            <div
                                className="relative border bg-white  rounded-[10px] stroke-2 max-h-[70%] overflow-auto">
                                <div className="max-w-full">
                                    <div className="min-w-[1170px]">
                                        <div
                                            className="grid grid-cols-20 bg-[#F9FAFB] px-5 py-4 gap-x-20 w-fit">
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
                <ModalUpdateReservation isOpen={isOpenEdit} onClose={closeModal} reservationData={""}
                                        getAllReservations={getAllReservationsInFun}/>
            }
            {isOpenDelete &&
                <ModalCancelHousing isOpen={isOpenDelete} onClose={closeModal} id={reservationDetails}
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
                            openModalDelete
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
                                    any
                            }) => {
    const {isAdmin} = useAdminContext();

    return (
        <div className="grid grid-cols-20 border-t px-5 py-4 gap-x-20 w-fit">
            <div className="col-span-2 flex items-center justify-center max-w-36 overflow-auto no-scrollbar">
                <p className="text-sm text-black text-nowrap">{translation?.t(reservation.statut)}</p>
            </div>
            <div
                className="col-span-2 flex items-center justify-center max-w-36 overflow-auto no-scrollbar text-[#3c50e0] hover:underline cursor-pointer text-nowrap"
                onClick={() => openModalInfoClient(reservation.nom, reservation.prenom, reservation.email, reservation.numTel)}>
                <p className="text-sm">{reservation.prenom} {reservation.nom}</p>
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
                    {/*cut reservation.titreLogement 10length*/}
                    {reservation.titreLogement.length > 10 ? reservation.titreLogement.substring(0, 10) + '...' : ''}
                </p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-black">{reservation.idCommande}</p>
            </div>
            <div className="col-span-2 flex items-center justify-center text-nowrap">
                <p className="text-sm text-black">{reservation.montant}</p>
            </div>
            {
                reservation.statut === 'payed' && isAdmin ?
                    <>
                        <div
                            className="col-span-2 flex items-center justify-center text-sm text-[#3c50e0] hover:underline cursor-pointer"
                            onClick={() => openModalEdit({
                                id: reservation.id,
                                nom: reservation.nom,
                                prenom: reservation.prenom,
                                email: reservation.email,
                                numTel: reservation.numTel,
                                dateInscription: reservation.dateInscription,
                                logements: reservation.logements,
                                commission: reservation.commission
                            })}>
                            {translation?.t('edit')}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-4 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                            </svg>
                        </div>
                        <div
                            className="col-span-2 flex items-center justify-center max-w-fit text-sm text-red-600 hover:underline cursor-pointer
                            pr-5"
                            onClick={() => openModalDelete({
                                id: reservation.id,
                            })}>
                            {translation?.t('remboursement')}
                        </div>
                    </>
                    :
                    <></>
            }
        </div>
    )
        ;
}

export default ListReservations;
