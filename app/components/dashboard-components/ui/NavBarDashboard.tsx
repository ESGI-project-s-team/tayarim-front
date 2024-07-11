import React, {useEffect, useRef, useState} from 'react';
import DropProfileItems from "@/app/components/dashboard-components/ui/drop-profile-items/DropProfileItems";
import DropNotificationItems from "@/app/components/dashboard-components/ui/notifications/DropNotificationItems";
import {
    useAdminContext,
    useNotificationContext,
    usePopupNotify,
    useTranslationContext
} from "@/app/[lng]/hooks";
import LanguageDropdown from "@/app/components/ui/LanguageDropdown";
import ModalInfoUser from "@/app/components/modal/modal-info-user/ModalInfoUser";
import {getAllNotificationsInFun} from "@/app/components/dashboard-components/ui/notifications/actions";

const NavBarDashboard: React.FC = () => {
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [isOpenNotificationPing, setIsOpenNotificationPing] = useState(false);
    const {items, setItems} = useNotificationContext();
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const {translation} = useTranslationContext();
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const {popupNotify} = usePopupNotify();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const {isAdmin} = useAdminContext();

    const handleOpenProfile = () => {
        setIsOpenProfile(!isOpenProfile);
        setIsOpenNotification(false);
    };

    const handleOpenNotification = () => {
        setIsLoading(true);
        getAllNotificationsInFun().then((response) => {
            if (response) {
                //sort by id desc
                response.sort((a: any, b: any) => b.id - a.id);
                setItems(response);
            }
            setIsLoading(false);
        });
        setIsOpenNotification(!isOpenNotification);
        setIsOpenProfile(false);

    };

    const handleOpenLanguage = () => {
        setIsOpenProfile(false);
        setIsOpenNotification(false);
    };

    function closeModal() {
        setIsOpenInfo(false);
    }

    useEffect(() => {
        let user = {
            id: localStorage.getItem("id"),
            nom: localStorage.getItem("nom"),
            prenom: localStorage.getItem("prenom"),
            email: localStorage.getItem("email"),
            numTel: localStorage.getItem("numTel"),
            lang: localStorage.getItem("lang")
        };
        setData(user);
    }, []);
    useEffect(() => {
        if (popupNotify) {
            setIsLoading(true);
            getAllNotificationsInFun().then((response) => {
                setItems(response);
                setIsLoading(false);
            });
        }
    }, [popupNotify, setItems]);

    useEffect(() => {

        if (items) {
            const hasOpenNotification = items.some((item: any) => !item.isRead);
            setIsOpenNotificationPing(hasOpenNotification);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current && !profileRef.current.contains(event.target as Node) &&
                notificationRef.current && !notificationRef.current.contains(event.target as Node)
            ) {
                setIsOpenNotification(false);
                setIsOpenProfile(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [items, popupNotify, setItems]);

    return (
        <div className="fixed bg-white w-screen top-0 drop-shadow-xl z-10">
            {isOpenInfo && <ModalInfoUser isOpen={isOpenInfo} onClose={closeModal} setData={setData} data={data}/>}
            <div className="flex flex-row-reverse px-10 py-5 gap-10">
                <div className="relative" ref={profileRef}>
                    <a className="flex items-center gap-4" href="#" onClick={handleOpenProfile}>
                        <span className="text-right block">
                            <span className="block text-sm font-medium text-black ">
                                {data?.prenom} {data?.nom}
                            </span>
                            <span className="block text-xs text-[#64748b]">
                                {isAdmin ? translation?.t('admin') : translation?.t('owner')}
                            </span>
                        </span>
                        <svg className="fill-current block" width="12" height="8" viewBox="0 0 12 8" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                                  fill=""></path>
                        </svg>
                    </a>
                    {isOpenProfile && <DropProfileItems setIsOpenInfo={setIsOpenInfo}/>}
                </div>

                <div className="relative" ref={notificationRef}>
                    <a className="relative flex h-9 w-9 items-center justify-center rounded-full border stroke-1 bg-[#f1f5f9] hover:bg-gray-200 mr-4"
                       href="#" onClick={handleOpenNotification}>
                        {isOpenNotificationPing && (
                            <>
                                <span
                                    className="absolute top-0 right-0 z-10 h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                                <span className="absolute top-0 right-0 z-10 h-2 w-2 rounded-full bg-red-600 "></span>
                            </>
                        )}
                        <svg className="fill-current duration-300 ease-in-out" width="18" height="18"
                             viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
                                fill=""></path>
                        </svg>
                    </a>
                    {isOpenNotification &&
                        <DropNotificationItems isLoading={isLoading}/>
                    }
                </div>
                <div onClick={handleOpenLanguage}>
                    <LanguageDropdown isOpen={false}/>
                </div>
            </div>
        </div>
    );
};

export default NavBarDashboard;
