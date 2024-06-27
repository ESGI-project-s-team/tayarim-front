import React, {useState} from "react";
import FormConnection from "@/app/components/ui/signin/FormConnection";
import ModalCreateOwner from "@/app/components/modal/modal-create-owner/ModalCreateOwner";
import {useTranslationContext} from "@/app/[lng]/hooks";
import ModalAddCandidate from "@/app/components/modal/modal-add-candidate/ModalAddCandidate";
import ModalAddCandidateHousing from "@/app/components/modal/modal-add-candidate/ModalAddCandidateHousing";

const OwnerConnection: React.FC = () => {
    const [isOpenCreate, setIsOpenCreate] = React.useState(false);
    const {translation} = useTranslationContext();
    const [isOpenModalHousing, setIsOpenModalHousing] = useState(false);
    const [owner, setOwner] = useState<any>(null);

    function closeModal() {
        setIsOpenCreate(false)
        setIsOpenModalHousing(false)
    }

    return (
        <div className="overflow-hidden ">
            <div
                className=" absolute w-full h-screen  bg-image flex lg:justify-around justify-center items-center ">
                <div className={"z-30"}>
                    <FormConnection/>
                </div>
                <div className={"bg-white min-w-0.5 min-h-[70vh] hidden lg:block top-36 absolute z-30"}>
                </div>
                <div className={"hidden lg:block z-30"}>
                    <div className="align-middle">
                        <div className="bg-white rounded-xl p-14">
                            <div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="mx-auto h-10 w-auto "
                                    src="/white-logo-short-removebg.png"
                                    alt="Your Company"
                                />

                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                                <p className={"font-medium"}>{translation?.t('candidate_desc')}</p>
                                <button
                                    onClick={() => setIsOpenCreate(true)}
                                    type="submit"
                                    className="mt-10 flex w-full justify-center rounded-md bg-custom-search px-3 py-1.5 text-sm font-semibold leading-6 text-black border-black border shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    {translation?.t('start_now')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            {isOpenCreate &&
                <ModalAddCandidate isOpen={isOpenCreate} onClose={closeModal}
                                   setIsOpenModalHousing={setIsOpenModalHousing}
                                   setOwner={setOwner}
                />
            }
            {
                isOpenModalHousing &&
                <ModalAddCandidateHousing isOpen={isOpenModalHousing} onClose={closeModal}
                                          owner={owner}/>
            }
        </div>
    );
}

export default OwnerConnection;