import React from "react";
import {useIsErrorContext, usePopupNotify, useTranslationContext} from "@/app/[lng]/hooks";


const NotifyManagement: React.FC = () => {
    const {translation} = useTranslationContext();
    const {popupNotify, setPopupNotify} = usePopupNotify();

    function handleClose() {
        setPopupNotify(null)
    }

    return (
        <div className=" lg:ml-80 lg:mr-7 mr-2 ml-14  right-0 absolute z-50 top-32">
            <div className="relative  flex justify-end mb-2">
                <div className="flex p-5 rounded text-blue-600" style={
                    {
                        backgroundColor: "#a8c9ff",
                        color: "#002e81"
                    }
                }>
                    <div className="flex-col">
                        <strong className="font-bold mr-5">{translation?.t('alert_notify')}</strong>
                        <div>
                            <div className="block sm:inline">
                                {popupNotify == "Indisponibilite" ? translation?.t('alert_notify_description_indispo') :
                                    popupNotify == "Reservation" ? translation?.t('alert_notify_description_reservation') :
                                        popupNotify == "Depense" ? translation?.t('alert_notify_description_depense') :
                                            popupNotify == "facture" ? translation?.t('alert_notify_description_facture') :
                                                null
                                }
                            </div>
                        </div>
                    </div>
                    <span className="relative cursor-pointer"
                          onClick={handleClose}>
                  <svg
                      className="fill-current h-6 w-6 text-blue-600"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                    />
                  </svg>
                </span>
                </div>
            </div>
        </div>
    );
}
export default NotifyManagement;


