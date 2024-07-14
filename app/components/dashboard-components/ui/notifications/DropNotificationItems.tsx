import React from 'react';
import {useNavbarContext, useNotificationContext, useTranslationContext} from "@/app/[lng]/hooks";
import DateFormaterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {updateStatusNotificationsInFun} from "@/app/components/dashboard-components/ui/notifications/actions";


const DropNotificationItems: React.FC<any> = ({isLoading}: {
    isLoading: boolean;
}) => {
    const {items, setItems} = useNotificationContext();
    const {translation} = useTranslationContext();
    const {theLanguage} = useNavbarContext();


    function handleMouseEnter(index: number, id: number) {
        const newItems = items.map((item: any, i: number) => {
            if (i === index) {
                return {...item, isRead: true};
            }
            return item;
        });

        updateStatusNotificationsInFun(id.toString()).then();
        setItems(newItems);
    }

    return (
        <div className="fixed sm:absolute right-8 mt-2 h-auto max-h-48 w-72 flex-col rounded-sm border stroke-1 shadow sm:w-80 block overflow-y-auto
             z-50 bg-white">
            <div className="px-4 py-3">
                <h5 className="text-sm font-medium text-[#8a99af]">Notifications</h5></div>
            <ul className="flex h-auto flex-col">
                {isLoading ? <div className={"px-4 py-3 "}><SpinnerUI/></div> : items ?
                    items.map((item: any, index: number) => (
                        <li key={index} className={!item.isRead ? "" : ""}>
                            <div className="relative">
                                {!item.isRead && (
                                    <span
                                        className="absolute top-5 left-1 z-10 h-2 w-2 rounded-full bg-red-600"></span>
                                )}
                                <a
                                    className="flex flex-col gap-2.5 border-t stroke-1 px-4 py-3 text-[#64748b] hover:bg-[#f1f5f9]"
                                    href={
                                        item.type == "Indisponibilite" ? "/dashboard/planning" :
                                            item.type == "Reservation" ? "/dashboard/reservation" :
                                                item.type == "Depense" ? "/dashboard/depense" :
                                                    item.type == "facture" ? "/dashboard/invoice" :
                                                        "#"
                                    }
                                    onMouseEnter={() => handleMouseEnter(index, item.id)}>
                                    <p className="text-sm">
                                        <p
                                            className="text-black font-medium"
                                        >
                                            {translation?.t(item.type)?.charAt(0).toUpperCase() + translation?.t(item.type)?.slice(1)}
                                        </p>
                                        <p className={"mt-2"}>
                                            {item.type == "Indisponibilite" ? translation?.t('alert_notify_description_indispo') :
                                                item.type == "Reservation" ? translation?.t('alert_notify_description_reservation') :
                                                    item.type == "Depense" ? translation?.t('alert_notify_description_depense') :
                                                        item.type == "facture" ? translation?.t('alert_notify_description_facture') :
                                                            null
                                            }
                                        </p>
                                    </p>
                                    <p className="text-xs"><DateFormaterEnFr
                                        date={item.date}
                                        theLanguage={theLanguage}
                                    /></p>
                                </a>
                            </div>
                        </li>
                    ))
                    :
                    <span
                        className="border-t px-4 py-3 text-[#64748b] text-xs">{translation?.t('no_notifications')}</span>
                }
            </ul>
        </div>
    );
};

export default DropNotificationItems;
