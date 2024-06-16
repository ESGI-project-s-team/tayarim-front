import React, {useCallback, useEffect, useState} from 'react';
import ModalEditOwner from "@/app/components/modal/modal-edit-owner/ModalEditOwner";
import {ProprietaireDTO} from "@/app/model/Owner";
import ModalDeleteOwner from "@/app/components/modal/modal-delete-owner/ModalDeleteOwner";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import ModalCreateOwner from "@/app/components/modal/modal-create-owner/ModalCreateOwner";
import {useRouter} from "next/navigation";
import ModalInfoHousing from "@/app/components/modal/modal-info-housing/ModalInfoHousing";
import SpinnerDashboard from '@/app/components/ui/SpinnerDashboard';
import {Tab, Transition} from "@headlessui/react";
import {getAllReservations} from "@/utils/apiReservation";

const ListReservations: React.FC = () => {
    const [ownerHousing, setOwnerHousing] = useState([] as any);
    const [reservations, setReservations] = React.useState([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenInfoHousing, setIsOpenInfoHousing] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [ownerDetails, setOwnerDetails] = useState({} as ProprietaireDTO)
    const {setError} = useIsErrorContext();
    const {translation} = useTranslationContext();
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0);
    let [categories] = useState<Record<any, React.FC>>({
        Upcoming: (translation: any) => (
            <div>
            </div>
        ),
        InProgress: (translation: any) => (
            <div>
            </div>
        ),
        Done: (translation: any) => (
            <div>
            </div>
        ),
        Cancelled: (translation: any) => (
            <div>
            </div>
        ),
        All: (translation: any) => (
            <div>
            </div>
        )
    });

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    function openModalEdit(owner: ProprietaireDTO) {
        setOwnerDetails(owner)
        setIsOpenEdit(true)
    }

    function openModalDelete(owner: ProprietaireDTO) {
        setOwnerDetails(owner)
        setIsOpenDelete(true)
    }

    function openModalInfoHousing(housingDetails: any) {
        setIsOpenInfoHousing(true)
        setOwnerHousing(housingDetails)
    }

    function closeModal() {
        setIsOpenEdit(false)
        setIsOpenDelete(false)
        setIsOpenCreate(false)
        setIsOpenInfoHousing(false)
    }

    const getAllReservationsInFun = useCallback(() => {
        setLoading(true)
        getAllReservations()
            .then((response) => {
                console.log(response)
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

    return (
        <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
            {!loading ?
                <>
                    <div className=" relative  mx-auto my-auto top-32 mb-10">
                        <Tab.Group
                            selectedIndex={selectedIndex}
                            onChange={setSelectedIndex}
                        >
                            <Tab.List
                                className="flex justify-center space-x-1 rounded-xl bg-custom-search  p-1  sm:mx-auto max-w-xl mx-2
                                w-screen float-start ">
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({selected}: { selected: boolean }) =>
                                            classNames(
                                                'w-full py-2.5 text-sm font-medium leading-5',
                                                'focus:outline-none text-black',
                                                selected
                                                    ? ' border-black border-b'
                                                    : 'text-black'
                                            )
                                        }
                                    >
                                        {category === 'Upcoming' ? translation?.t('a_venir') :
                                            category === 'InProgress' ? translation?.t('en_cours') :
                                                category === 'Cancelled' ? translation?.t('annule') :
                                                    category === 'Done' ? translation?.t('termine') :
                                                        translation?.t('all')
                                        }
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-5 rounded-xl">
                                {Object.values(categories).map((posts, idx) => (
                                    <Tab.Panel
                                        key={idx}
                                        className={classNames(
                                            'rounded-3xl p-5 ',
                                            ' focus:outline-none '
                                        )}
                                    >
                                        <Transition
                                            appear
                                            show={selectedIndex === idx}
                                            enter="transition-all duration-500 ease-in-out"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="transition-all duration-500 ease-in-out"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                            as="div"
                                            className="transition-all duration-100"
                                        >
                                            {posts(
                                                translation
                                            )}
                                        </Transition>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>

                        </Tab.Group>
                    </div>
                    <div className="relative top-32 w-full flex justify-end mb-2 ">
                        <button
                            onClick={() => setIsOpenCreate(true)}
                            className="flex items-center gap-2 rounded bg-[#3c50e0] px-4 py-2 font-medium text-sm text-white hover:bg-opacity-80">
                            <svg className="fill-current" width="13" height="13" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                                    fill=""></path>
                            </svg>
                            {translation?.t('form_add_owner')}
                        </button>
                    </div>
                    <div className="relative border bg-white top-32 rounded-[10px] stroke-2 max-h-[70%] overflow-auto">
                        <div className="max-w-full">
                            <div className="min-w-[1170px]">
                                <div className="grid grid-cols-20 bg-[#F9FAFB] px-5 py-4 gap-x-20 w-fit">
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium">{translation?.t('statut')}</p></div>
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium">{translation?.t('traveler')}</p></div>
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium text-nowrap">{translation?.t('start_date')}</p></div>
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium text-nowrap">{translation?.t('end_date')}</p></div>
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium">{translation?.t('reserved')}</p></div>
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium">{translation?.t('house')}</p></div>
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium">{translation?.t('code_de_reservation')}</p></div>
                                    <div className="col-span-2 flex items-center justify-center"><p
                                        className="font-medium">{translation?.t('versement')}</p></div>
                                </div>
                                {reservations.map((reservation: any, index: number) => (
                                    <div className="grid grid-cols-20 border-t px-5 py-4 gap-x-20 w-fit " key={index}>
                                        <div
                                            className="col-span-2 flex items-center justify-center max-w-36 overflow-auto no-scrollbar">
                                            <p className="text-sm text-black text-nowrap">{reservation.statut}</p>
                                        </div>
                                        <div
                                            className="col-span-2 flex items-center justify-center max-w-36 overflow-auto no-scrollbar text-[#3c50e0] hover:underline cursor-pointer
                                            text-nowrap">
                                            <p className="text-sm">{reservation.prenom} {reservation.nom}</p>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center text-nowrap">
                                            <p className="text-sm text-black">{reservation.checkIn}</p>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center text-nowrap">
                                            <p className="text-sm text-black">{reservation.checkOut}</p>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center text-nowrap">
                                            <p className="text-sm text-black">{reservation.dateReservation}</p>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center text-nowrap">
                                            <p className="text-sm text-black hover:underline cursor-pointer"
                                               onClick={() => openModalInfoHousing(reservation.logements)}>
                                                {reservation.idLogement}
                                            </p>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center text-nowrap">
                                            <p className="text-sm text-black">{reservation.idCommande}</p>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-center text-nowrap">
                                            <p className="text-sm text-black">{reservation.montant}</p>
                                        </div>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                            </svg>
                                        </div>
                                        <div
                                            className="col-span-2 flex items-center justify-center min-w-fit text-sm text-red-600 hover:underline cursor-pointer"
                                            onClick={() => openModalDelete({
                                                id: reservation.id,
                                                nom: reservation.nom,
                                                prenom: reservation.prenom,
                                                email: reservation.email,
                                                numTel: reservation.numTel,
                                                dateInscription: reservation.dateInscription,
                                                logements: reservation.logements,
                                                commission: reservation.commission
                                            })}>
                                            {translation?.t('delete')}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </>
                :
                <SpinnerDashboard/>
            }
            {isOpenCreate &&
                <ModalCreateOwner isOpen={isOpenCreate} onClose={closeModal} getAllOwners={getAllReservationsInFun}/>
            }
            {isOpenEdit &&
                <ModalEditOwner isOpen={isOpenEdit} onClose={closeModal} ownerDetails={ownerDetails}
                                getAllOwners={getAllReservationsInFun}/>
            }
            {isOpenDelete &&
                <ModalDeleteOwner isOpen={isOpenDelete} onClose={closeModal} id={ownerDetails.id.toString()
                } getAllOwners={getAllReservationsInFun}/>
            }
            {isOpenInfoHousing &&
                <ModalInfoHousing isOpen={isOpenInfoHousing} onClose={closeModal} housings={ownerHousing}/>
            }

        </div>
    );
};

export default ListReservations;
