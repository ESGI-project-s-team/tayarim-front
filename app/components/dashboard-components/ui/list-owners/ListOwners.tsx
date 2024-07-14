import React, {useCallback, useEffect, useState} from 'react';
import ModalEditOwner from "@/app/components/modal/modal-edit-owner/ModalEditOwner";
import {ProprietaireDTO} from "@/app/model/Owner";
import ModalDeleteOwner from "@/app/components/modal/modal-delete-owner/ModalDeleteOwner";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import ModalCreateOwner from "@/app/components/modal/modal-create-owner/ModalCreateOwner";
import {useRouter} from "next/navigation";
import {getAllOwners} from "@/utils/apiOwner";
import ModalInfoHousing from "@/app/components/modal/modal-info-housing/ModalInfoHousing";
import SpinnerDashboard from '@/app/components/ui/SpinnerDashboard';


const ListOwners: React.FC = () => {
    const [ownerHousing, setOwnerHousing] = useState([] as any);
    const [owners, setOwners] = React.useState([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenInfoHousing, setIsOpenInfoHousing] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [ownerDetails, setOwnerDetails] = useState({} as ProprietaireDTO)
    const {setError} = useIsErrorContext();
    const {translation} = useTranslationContext();
    const router = useRouter()
    const [loading, setLoading] = useState(true)

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

    const getAllOwnersInFun = useCallback(() => {
        setLoading(true)
        getAllOwners()
            .then((response) => {
                if (response.errors) {
                    setError(response.errors);
                    router.push("/dashboard");
                } else {
                    setError(null);
                    setOwners(response);
                }
                setLoading(false)
            });
    }, [router, setError]);

    useEffect(() => {
        getAllOwnersInFun();
    }, [getAllOwnersInFun]);

    return (
        <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0">
            <div className="mb-4  relative top-32"><h2
                className="text-2xl font-semibold text-black  ml-2">{translation?.t('owner')}</h2>
            </div>
            {!loading ?
                <>
                    <div className="relative top-32 w-full flex justify-end mb-2  ">
                        <button
                            onClick={() => setIsOpenCreate(true)}
                            className="flex items-center gap-2 rounded bg-[#3c50e0] px-4 py-2 font-medium text-sm text-white hover:bg-opacity-80 mr-2">
                            <svg className="fill-current" width="13" height="13" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                                    fill=""></path>
                            </svg>
                            {translation?.t('form_add_owner')}
                        </button>
                    </div>
                    <div
                        className="relative  border  bg-white   top-32   rounded-[10px] stroke-2 max-h-[70vh] overflow-auto ">
                        <div className="max-w-full">
                            <div className="min-w-[1170px]">
                                <div className="grid grid-cols-12 bg-[#F9FAFB] px-5 py-4 sticky top-0 z-10">
                                    <div className="col-span-2 items-center "><p className="font-medium">
                                        {translation?.t('owner_name')}
                                    </p>
                                    </div>
                                    <div className="col-span-2  items-center ">
                                        <p className="font-medium">Email</p>
                                    </div>
                                    <div className="col-span-2  items-center ">
                                        <p className="font-medium">{translation?.t('phone')}</p>
                                    </div>
                                    <div className="col-span-2  items-center ">
                                        <p className="font-medium">{translation?.t('house')}</p>
                                    </div>
                                    <div className="col-span-2  items-center ">
                                        <p className="font-medium">Commission</p>
                                    </div>
                                </div>
                                {owners.map((owner: any, index: number) => (
                                    <div
                                        className={`grid  border-t  py-4 grid-cols-12 px-5  ${owner.isValidated ? "bg-white" : "bg-gray-200"}`}
                                        key={index}>
                                        <div
                                            className="col-span-2 items-center flex max-w-36 overflow-auto no-scrollbar">
                                            <div className="flex gap-4 flex-row items-center">
                                                <p className="text-sm text-black">{owner.prenom} {owner.nom}</p></div>
                                        </div>
                                        <div
                                            title={owner.email}
                                            className="col-span-2 items-center flex max-w-36 overflow-auto no-scrollbar">
                                            <p className="text-sm text-black ">
                                                {owner.email.length > 15 ? owner.email.substring(0, 15) + '...' : owner.email}
                                            </p>
                                        </div>
                                        <div className="col-span-2 flex items-center"><p
                                            className="text-sm text-black">{owner.numTel}</p>
                                        </div>
                                        {owner.logements.length > 0 ?
                                            <div
                                                className="col-span-2  items-center flex-col text-[#3c50e0] hover:underline cursor-pointer
                                           max-w-36 overflow-auto no-scrollbar">
                                                <p className="text-sm " key={index}
                                                   onClick={() => openModalInfoHousing(owner.logements)}>{owner.logements.length} {translation?.t('owner_house')}{owner.logements.length > 1 ? 's' : ''}  </p>
                                            </div>
                                            :
                                            <div
                                                className="col-span-2 items-center text-gray-400 ml-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6 18 18 6M6 6l12 12"/>
                                                </svg>
                                            </div>
                                        }
                                        <div className="col-span-1 flex items-center ml-5 "><p
                                            className="text-sm text-black">{owner.commission}%</p>
                                        </div>
                                        <div
                                            className="col-span-1 items-center flex text-sm text-[#3c50e0] hover:underline cursor-pointer
                                            ml-10 w-fit"
                                            onClick={() =>
                                                openModalEdit({
                                                    id: owner.id,
                                                    nom: owner.nom,
                                                    prenom: owner.prenom,
                                                    email: owner.email,
                                                    numTel: owner.numTel,
                                                    dateInscription: owner.dateInscription,
                                                    logements: owner.logements,
                                                    commission: owner.commission,
                                                    adresse: owner.adresse,
                                                    isValidated: owner.isValidated,
                                                    lang: owner.lang
                                                })
                                            }
                                        >
                                            {owner.isValidated ? translation?.t('edit') : translation?.t('validate')}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5"
                                                 stroke="currentColor" className="w-4 h-4 ml-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                            </svg>
                                        </div>
                                        <div
                                            className="col-span-1 items-center flex text-sm text-red-600 hover:underline cursor-pointer ml-14
                                            w-fit"
                                            onClick={() =>
                                                openModalDelete(
                                                    {
                                                        id: owner.id,
                                                        nom: owner.nom,
                                                        prenom: owner.prenom,
                                                        email: owner.email,
                                                        numTel: owner.numTel,
                                                        dateInscription: owner.dateInscription,
                                                        logements: owner.logements,
                                                        commission: owner.commission,
                                                        adresse: owner.adresse,
                                                        isValidated: owner.isValidated,
                                                        lang: owner.lang
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
                </>
                :
                <SpinnerDashboard/>
            }
            {isOpenCreate &&
                <ModalCreateOwner isOpen={isOpenCreate} onClose={closeModal} getAllOwners={getAllOwnersInFun}/>
            }
            {isOpenEdit &&
                <ModalEditOwner isOpen={isOpenEdit} onClose={closeModal} ownerDetails={ownerDetails}
                                getAllOwners={getAllOwnersInFun}/>
            }
            {isOpenDelete &&
                <ModalDeleteOwner isOpen={isOpenDelete} onClose={closeModal} id={ownerDetails.id.toString()
                } getAllOwners={getAllOwnersInFun}/>
            }
            {isOpenInfoHousing &&
                <ModalInfoHousing isOpen={isOpenInfoHousing} onClose={closeModal} housings={ownerHousing}/>
            }

        </div>
    );
};

export default ListOwners;
