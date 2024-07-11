import React, {useCallback, useEffect, useState} from 'react';
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import {useRouter} from "next/navigation";
import ModalAddHousing from "@/app/components/modal/modal-add-housing/ModalAddHousing";
import {getAllHousing} from "@/utils/apiHousing";
import {getOwnerById} from "@/app/components/dashboard-components/ui/list-housings/action";
import ModalInfoOwner from "@/app/components/modal/modal-info-owner/ModalInfoOwner";
import ModalUpdateHousing from "@/app/components/modal/modal-update-housing/ModalUpdateHousing";
import ModalDeleteHousing from "@/app/components/modal/modal-delete-housing/ModalDeleteHousing";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";

const ListHousings: React.FC = () => {
    const [housing, setHousing] = useState<HouseDTO[]>([]);
    const [allHousing, setAllHousing] = useState<any>([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenInfoOwner, setIsOpenInfoOwner] = useState(false);
    const [ownerDetailsList, setOwnerDetailsList] = useState<any>([{nom: ""}]);
    const [ownerDetails, setOwnerDetails] = useState<any>({});
    const {setError} = useIsErrorContext();
    const {translation} = useTranslationContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    function openModalEdit(housing: any) {
        setAllHousing(housing);
        setIsOpenEdit(true);
    }

    function openModalDelete(house: HouseDTO) {
        setAllHousing(house);
        setIsOpenDelete(true);
    }

    function openModalInfoOwner(index: number) {
        setOwnerDetails(ownerDetailsList[index]);
        setIsOpenInfoOwner(true);
    }

    function closeModal() {
        setIsOpenEdit(false);
        setIsOpenDelete(false);
        setIsOpenCreate(false);
        setIsOpenInfoOwner(false);
    }

    const getAllHousingFun = useCallback(() => {
        setLoading(true);

        function getOwnerByIdFun(id: string, ownerCache: any): any {
            if (ownerCache[id]) {
                return Promise.resolve(ownerCache[id]);
            }
            return getOwnerById(id)
                .then((response) => {
                    if (response.errors) {
                        setError(response.errors);
                        return false;
                    } else {
                        setError(null);
                        ownerCache[id] = response;
                        return response;
                    }
                });
        }

        const ownerCache = {};
        const ownerDetailsList: any = [];
        getAllHousing()
            .then(async (response) => {
                if (response.errors) {
                    setError(response.errors);
                    router.push("/dashboard");
                } else {
                    setError(null);
                    setHousing(response);
                    for (let i = 0; i < response.length; i++) {
                        const ownerDetailsUnique = await getOwnerByIdFun(response[i].idProprietaire, ownerCache);
                        if (ownerDetailsUnique) {
                            ownerDetailsList.push(ownerDetailsUnique);
                        }
                    }
                    setOwnerDetailsList(ownerDetailsList);
                    setLoading(false);
                }
            });
    }, [router, setError]);

    useEffect(() => {
        getAllHousingFun();
    }, [getAllHousingFun]);

    return (
        <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
            {!loading ?
                <>
                    <div className="mb-4 relative top-32">
                        <h2 className="text-2xl font-semibold text-black ml-2">
                            {translation?.t('house')}
                        </h2>
                    </div>
                    <div className="relative top-32 w-full flex justify-end mb-2">
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
                    <div className="relative border bg-white top-32 rounded-[10px] stroke-2 max-h-[70vh] overflow-auto">
                        <div className="max-w-full">
                            <div className="min-w-[1170px]">
                                <div className="grid bg-[#F9FAFB] px-5 py-4 sticky top-0 z-10"
                                     style={{gridTemplateColumns: "repeat(14, minmax(0, 1fr))"}}>
                                    <div className="col-span-2 items-center">
                                        <p className="font-medium">{translation?.t('housing_titre')}</p>
                                    </div>
                                    <div className="col-span-2 items-center">
                                        <p className="font-medium">{translation?.t('owner')}</p>
                                    </div>
                                    <div className="col-span-2 items-center">
                                        <p className="font-medium">{translation?.t('adresse')}</p>
                                    </div>
                                    <div className="col-span-2 items-center">
                                        <p className="font-medium">{translation?.t('montant')}</p>
                                    </div>
                                    <div className="col-span-2 items-center">
                                        <p className="font-medium">Service</p>
                                    </div>
                                </div>
                                {housing.map((house: any, index: number) => (
                                    <div className={`grid border-t py-4 grid-cols-12 px-5`}
                                         style={{gridTemplateColumns: "repeat(14, minmax(0, 1fr))"}} key={index}>
                                        <div title={house.titre}
                                             className="col-span-2 items-center max-w-36 overflow-auto no-scrollbar text-nowrap">
                                            <p className="text-sm text-black">
                                                {house.titre.length > 10 ? house.titre.substring(0, 10) + '...' : house.titre}
                                            </p>
                                        </div>
                                        <div
                                            className="col-span-2 items-center max-w-36 overflow-auto no-scrollbar flex text-[#3c50e0] hover:underline cursor-pointer text-nowrap">
                                            <p className="text-sm" onClick={() => openModalInfoOwner(index)}>
                                                {ownerDetailsList[index]?.prenom} {ownerDetailsList[index]?.nom}
                                            </p>
                                        </div>
                                        <div title={house.adresse}
                                             className="col-span-2 items-center max-w-32 overflow-x-auto flex no-scrollbar text-nowrap text-sm">
                                            {house.adresse.length > 10 ? house.adresse.substring(0, 10) + '...' : house.adresse}
                                        </div>
                                        <div className="col-span-2 items-center">
                                            {house.prixParNuit !== 1 && house.prixParNuit ?
                                                <p className="text-sm text-black ml-2">{house.prixParNuit} €</p>
                                                :
                                                <p className="text-sm text-gray-400 ml-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                         className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M6 18 18 6M6 6l12 12"/>
                                                    </svg>
                                                </p>
                                            }
                                        </div>
                                        <div className="col-span-2 items-center flex-col">
                                            {house.isLouable ?
                                                <p className="text-sm text-black">{translation?.t('rental')}</p>
                                                :
                                                <p className="text-sm text-black">{translation?.t('concierge')}</p>
                                            }
                                        </div>
                                        <div
                                            className="col-span-2 items-center flex text-sm text-[#3c50e0] hover:underline cursor-pointer"
                                            onClick={() => openModalEdit(house)}>
                                            {translation?.t('edit')}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                            </svg>
                                        </div>
                                        <div
                                            className="col-span-2 items-center flex text-sm text-red-600 hover:underline cursor-pointer"
                                            onClick={() => openModalDelete(house)}>
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
                </>
                :
                <SpinnerDashboard/>
            }
            {isOpenCreate &&
                <ModalAddHousing isOpen={isOpenCreate} onClose={closeModal} getAllHousing={getAllHousingFun}/>}
            {isOpenEdit && <ModalUpdateHousing isOpen={isOpenEdit} onClose={closeModal} housingData={allHousing}
                                               getAllHousing={getAllHousingFun}/>}
            {isOpenDelete && <ModalDeleteHousing isOpen={isOpenDelete} onClose={closeModal} id={allHousing.id}
                                                 getAllHousing={getAllHousingFun}/>}
            {isOpenInfoOwner && <ModalInfoOwner isOpen={isOpenInfoOwner} onClose={closeModal} user={ownerDetails}/>}
        </div>
    );
};

export default ListHousings;
