import React, {useCallback, useEffect, useState} from 'react';
import ModalEditOwner from "@/app/components/modal/modal-edit-owner/ModalEditOwner";
import {ProprietaireDTO} from "@/app/model/Owner";
import ModalDeleteOwner from "@/app/components/modal/modal-delete-owner/ModalDeleteOwner";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import {useRouter} from "next/navigation";
import ModalCalendar from "@/app/components/modal/modal-calendar-housing/ModalCalendar";
import ModalAddHousing from "@/app/components/modal/modal-add-housing/ModalAddHousing";
import {getAllHousing} from "@/utils/apiHousing";
import {getOwnerById} from "@/app/components/dashboard-components/ui/list-housings/action";
import ModalInfoUser from "@/app/components/modal/modal-info-user/ModalInfoUser";
import ModalInfoOwner from "@/app/components/modal/modal-info-owner/ModalInfoOwner";

const ListHousings: React.FC = () => {
    const [housing, setHousing] = useState<HouseDTO[]>([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)
    const [isOpenInfoOwner, setIsOpenInfoOwner] = useState(false)
    const [ownerDetailsList, setOwnerDetailsList] = useState<any>([{nom: ""}])
    const [ownerDetails, setOwnerDetails] = useState<any>({});
    const {setError} = useIsErrorContext();
    const {translation} = useTranslationContext();
    const router = useRouter()

    function openModalEdit(owner: ProprietaireDTO) {
        setOwnerDetailsList(owner)
        setIsOpenEdit(true)
    }

    function openModalDelete(owner: ProprietaireDTO) {
        setOwnerDetailsList(owner)
        setIsOpenDelete(true)
    }

    function openModalInfoOwner(index: number) {
        setOwnerDetails(ownerDetailsList[index])
        setIsOpenInfoOwner(true)
    }

    function openModalCalendar() {
        setIsOpenCalendar(true)
    }

    function closeModal() {
        setIsOpenEdit(false)
        setIsOpenDelete(false)
        setIsOpenCreate(false)
        setIsOpenCalendar(false)
        setIsOpenInfoOwner(false)
    }

    function getOwnerByIdFun(id: string): any {
        return getOwnerById(id)
            .then((response) => {
                if (response.errors) {
                    setError(response.errors);
                    return false
                } else {
                    setError(null);
                    return response;
                }
            });
    }

    const getAllHousingFun = useCallback(() => {
        let ownerDetailsList: any = [];
        getAllHousing()
            .then(async (response) => {
                if (response.errors) {
                    setError(response.errors);
                    router.push("/dashboard");
                } else {
                    setError(null);
                    setHousing(response);
                    for (let i = 0; i < response.length; i++) {
                        let ownerDetailsUnique = await getOwnerByIdFun(response[i].idProprietaire);
                        if (ownerDetailsUnique) {
                            ownerDetailsList.push(ownerDetailsUnique);
                        }
                    }
                    setOwnerDetailsList(ownerDetailsList);
                }
            });
    }, [router, setError]);

    useEffect(() => {
        getAllHousingFun();
    }, [getAllHousingFun]);

    return (
        <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0  ">
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
                    {translation?.t('form_add_housing')}
                </button>
            </div>
            <div
                className="relative  border  bg-white   top-32   rounded-[10px] stroke-2 max-h-[70%] overflow-auto ">
                <div className="max-w-full">
                    <div className="min-w-[1170px]">
                        <div className="grid  bg-[#F9FAFB] px-5 py-4"
                             style={{gridTemplateColumns: "repeat(14, minmax(0, 1fr))"}}>
                            <div className="col-span-2 items-center">
                                <p className="font-medium">{translation?.t('housing_titre')}</p>
                            </div>
                            <div className="col-span-2 items-center">
                                <p className="font-medium">{translation?.t('owner')}</p>
                            </div>
                            <div className="col-span-2 items-center">
                                <p className="font-medium">{translation?.t('housing_type')}</p>
                            </div>
                            <div className="col-span-2 items-center">
                                <p className="font-medium">{translation?.t('price_per_night')}</p>
                            </div>
                        </div>
                        {housing.map((house: any, index: number) => (
                            <div
                                className="grid border-t py-4 grid-cols-12 px-5"
                                style={{gridTemplateColumns: "repeat(14, minmax(0, 1fr))"}}
                                key={index}>
                                <div className="col-span-2 items-center  max-w-36 overflow-auto no-scrollbar">
                                    <p className="text-sm text-black">{house.titre}</p>
                                </div>
                                <div className="col-span-2 items-center  max-w-36 overflow-auto no-scrollbar flex
                                text-[#3c50e0] hover:underline cursor-pointer">
                                    <p className="text-sm ml-2"
                                       onClick={() => openModalInfoOwner(index)}>{ownerDetailsList[index].prenom} {ownerDetailsList[index].nom}</p>
                                </div>
                                <div className="col-span-2 items-center">
                                    <p className="text-sm text-black">{house.typeLogement}</p>
                                </div>
                                <div className="col-span-2 items-center">
                                    <p className="text-sm text-black">{house.prixParNuit} €</p>
                                </div>
                                <div
                                    className="col-span-2  items-center flex-col text-[#3c50e0] hover:underline cursor-pointer"
                                    onClick={() => openModalCalendar()}>
                                    <div className="flex">
                                        <p className="text-sm">Calendrier</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-4 h-4 ml-1 mt-0.5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    className="col-span-2  items-center flex text-sm text-[#3c50e0] hover:underline cursor-pointer"
                                    onClick={() =>
                                        openModalEdit({
                                            id: house.id,
                                            nom: house.nom,
                                            prenom: house.prenom,
                                            email: house.email,
                                            numTel: house.numTel,
                                            dateInscription: house.dateInscription,
                                            logements: house.logements,
                                            commission: house.commissions,
                                        })
                                    }
                                >
                                    {translation?.t('edit')}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                    </svg>
                                </div>
                                <div
                                    className="col-span-2  items-center flex text-sm text-red-600 hover:underline cursor-pointer"
                                    onClick={() =>
                                        openModalDelete(
                                            {
                                                id: house.id,
                                                nom: house.nom,
                                                prenom: house.prenom,
                                                email: house.email,
                                                numTel: house.numTel,
                                                dateInscription: house.dateInscription,
                                                logements: house.logements,
                                                commission: house.commissions,
                                            }
                                        )
                                    }
                                >
                                    {translation?.t('delete')}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {
                isOpenCreate &&
                <ModalAddHousing isOpen={isOpenCreate} onClose={closeModal} getAllOwners={getAllHousing}/>
            }
            {
                isOpenEdit &&
                <ModalEditOwner isOpen={isOpenEdit} onClose={closeModal} ownerDetails={ownerDetailsList}
                                getAllOwners={getAllHousing}/>
            }
            {
                isOpenDelete &&
                <ModalDeleteOwner isOpen={isOpenDelete} onClose={closeModal} id={ownerDetailsList.id.toString()
                } getAllOwners={getAllHousing}/>
            }
            {isOpenCalendar &&
                <ModalCalendar isOpen={isOpenCalendar} onClose={closeModal} id={"id"}/>
            }
            {isOpenInfoOwner &&
                <ModalInfoOwner isOpen={isOpenInfoOwner} onClose={closeModal} user={ownerDetails}/>
            }
        </div>
    );
};

export default ListHousings;
