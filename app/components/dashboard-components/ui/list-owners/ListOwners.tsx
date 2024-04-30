import React, {useEffect, useState} from 'react';
import {getAllOwnersInFun} from "@/app/components/dashboard-components/ui/list-owners/action";
import ModalEditOwner from "@/app/components/ui/modal/modal-edit-owner/ModalEditOwner";
import {ProprietaireDTO} from "@/app/model/Owner";
import ModalDeleteOwner from "@/app/components/ui/modal/modal-delete-owner/ModalDeleteOwner";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import {Simulate} from "react-dom/test-utils";


const ListOwners: React.FC = () => {
    const [owners, setOwners] = React.useState([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [ownerDetails, setOwnerDetails] = useState({} as ProprietaireDTO)
    const {setError} = useIsErrorContext();
    const {translation} = useTranslationContext();

    function openModalEdit(owner: ProprietaireDTO) {
        setOwnerDetails(owner)
        setIsOpenEdit(true)
    }

    function openModalDelete(owner: ProprietaireDTO) {
        setOwnerDetails(owner)
        setIsOpenDelete(true)
    }

    function closeModal() {
        setIsOpenEdit(false)
        setIsOpenDelete(false)
    }

    useEffect(() => {
        getAllOwnersInFun()
            .then((response) => {
                if (response.errors) {
                    setError(response.errors)
                } else {
                    setError(null)
                    setOwners(response);
                }
            });
    }, [setError, ownerDetails]);
    return (
        <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0  ">
            <div className="relative top-32 w-full flex justify-end mb-2 ">
                <button
                    className="flex items-center gap-2 rounded bg-[#3c50e0] px-4 py-2 font-medium text-sm text-white hover:bg-opacity-80">
                    <svg className="fill-current" width="13" height="13" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                            fill=""></path>
                    </svg>
                    Add Owner
                </button>
            </div>
            <div className="relative  border  bg-white   top-32  overflow-hidden rounded-[10px] stroke-2">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1170px]">
                        <div className="grid grid-cols-12 bg-[#F9FAFB] px-5 py-4 ">
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
                        </div>
                        {owners.map((owner: any, index: number) => (
                            <div
                                className="grid  border-t  py-4 grid-cols-12 px-5 "
                                key={index}>
                                <div className="col-span-2  items-center">
                                    <div className="flex gap-4 flex-row items-center">
                                        <p className="text-sm text-black">{owner.prenom} {owner.nom}</p></div>
                                </div>
                                <div className="col-span-2 items-center flex"><p
                                    className="text-sm text-black ">{owner.email}</p>
                                </div>
                                <div className="col-span-2 flex items-center"><p
                                    className="text-sm text-black">{owner.numTel}</p>
                                </div>
                                {owner.logements.length > 0 ?
                                    <div
                                        className="col-span-2  items-center flex-col text-[#3c50e0] hover:underline cursor-pointer">
                                        {owner.logements.map((logement: any, index: number) => (
                                            <p className="text-sm" key={index}>House {logement.id}</p>
                                        ))}
                                    </div>
                                    :
                                    <div className="col-span-2  items-center ml-3 flex cursor-pointer ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-6 h-6 text-[#3c50e0]">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </div>
                                }
                                <div
                                    className="col-span-2  items-center flex text-sm text-[#3c50e0] hover:underline cursor-pointer"
                                    onClick={() =>
                                        openModalEdit({
                                            id: owner.id,
                                            nom: owner.nom,
                                            prenom: owner.prenom,
                                            email: owner.email,
                                            numTel: owner.numTel,
                                            dateInscription: owner.dateInscription,
                                            logements: owner.logements,
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
                                                id: owner.id,
                                                nom: owner.nom,
                                                prenom: owner.prenom,
                                                email: owner.email,
                                                numTel: owner.numTel,
                                                dateInscription: owner.dateInscription,
                                                logements: owner.logements,
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
            {isOpenEdit &&
                <ModalEditOwner isOpen={isOpenEdit} onClose={closeModal} ownerDetails={ownerDetails}
                                setOwnerDetails={setOwnerDetails}/>
            }
            {isOpenDelete &&
                <ModalDeleteOwner isOpen={isOpenDelete} onClose={closeModal} id={ownerDetails.id.toString()
                } setOwnerDetails={setOwnerDetails}/>
            }
        </div>
    );
};

export default ListOwners;
