import React from "react";
import {useAdminContext, useTranslationContext} from "@/app/[lng]/hooks";
import ModalAddInvoice from "@/app/components/modal/modal-add-invoice/ModalAddInvoice";

export const InvoiceDashboard: React.FC = () => {
    const {translation} = useTranslationContext();
    const {isAdmin} = useAdminContext();
    const [isOpenCreate, setIsOpenCreate] = React.useState(false);

    function closeModal() {
        setIsOpenCreate(false);
    }

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
                                    {translation?.t('form_add_invoice')}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                isOpenCreate &&
                <ModalAddInvoice isOpen={isOpenCreate} onClose={closeModal} getAllOwners={null}/>
            }
        </>
    );
}