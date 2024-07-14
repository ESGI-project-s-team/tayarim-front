"use client";
import React, {useEffect, useState} from "react";
import {useParams} from 'next/navigation';
import {MdOutlinePhotoLibrary} from "react-icons/md";
import "../../globals.css";
import ModalPhotos from "@/app/components/details-result/ModalPhotos";
import {IoLocationOutline} from "react-icons/io5";
import {HiOutlineUserGroup} from "react-icons/hi";
import {LiaBedSolid} from "react-icons/lia";
import {PiBathtub} from "react-icons/pi";
import {useTranslationContext} from "@/app/[lng]/hooks";
import {MdOutlinePets, MdApartment, MdVilla, MdElevator} from "react-icons/md";
import {LuPartyPopper} from "react-icons/lu";
import {PiWarehouseFill, PiStudent, PiSwimmingPool, PiOvenDuotone} from "react-icons/pi";
import {FaSmoking, FaHouse, FaHouseUser, FaPeopleRoof} from "react-icons/fa6";
import {FaParking, FaWifi, FaChild, FaBaby} from "react-icons/fa";
import {TbAirConditioning} from "react-icons/tb";
import {BiSolidWasher, BiHandicap} from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerRangerCustomForm from "@/app/components/ui/DatePickerRangerCustomForm";
import {ModalPayment} from "@/app/components/modal/modal-payment/ModalPayment";
import {getDaysDifference} from "@/utils/constants";
import {
    getDatesIndispoByIdHousingInFun,
    getHousingByIdInFun
} from "@/app/components/details-result/actions";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";

const DetailsResult = () => {
    const params = useParams()
    const id = params.id;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPayment, setIsModalPayment] = useState(false);
    const [initialImage, setInitialImage] = useState<any>();
    const [minDayMessage, setMinDayMessage] = useState("");
    const [containsDateIndispoMessage, setContainsDateIndispoMessage] = useState("");
    const {translation} = useTranslationContext();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [datesIndispo, setDatesIndispo] = useState<any>([]);
    const [housing, setHousing] = useState<any>(null);

    const handleOpenModal = (image: string | null) => {
        setInitialImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setInitialImage(null);
        setIsModalPayment(false);
    };

    const iconMap: any = {
        MdOutlinePets: MdOutlinePets,
        MdApartment: MdApartment,
        MdVilla: MdVilla,
        LuPartyPopper: LuPartyPopper,
        PiWarehouseFill: PiWarehouseFill,
        PiStudent: PiStudent,
        FaChild: FaChild,
        FaBaby: FaBaby,
        FaSmoking: FaSmoking,
        FaHouse: FaHouse,
        FaHouseUser: FaHouseUser,
        FaPeopleRoof: FaPeopleRoof,
        FaParking: FaParking,
        FaWifi: FaWifi,
        TbAirConditioning: TbAirConditioning,
        BiSolidWasher: BiSolidWasher,
        BiHandicap: BiHandicap,
        PiSwimmingPool: PiSwimmingPool,
        PiOvenDuotone: PiOvenDuotone,
        MdElevator: MdElevator,
    };

    const renderIcon = (iconName: any) => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent className="size-5"/> : null;
    };

    useEffect(() => {
        if (id) {
            getHousingByIdInFun(id.toString())
                .then((res: any) => {
                    if (!res.errors) {
                        setHousing(res);
                    }
                });
            getDatesIndispoByIdHousingInFun(parseInt(id.toString()))
                .then((res) => {
                    if (!res.errors) {
                        setDatesIndispo(res)
                    }
                });
        }
    }, [id]);

    function checkDateRangeForIndispo(startDate: any, endDate: any) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        for (let date of datesIndispo) {
            let checkDate = new Date(date);
            if (checkDate >= start && checkDate <= end) {
                return true; // Une date indisponible est incluse dans la plage de dates
            }
        }
        return false; // Aucune date indisponible n'est incluse dans la plage de dates
    }

    const handleInputChange = (field: string, value: React.SetStateAction<any>) => {
        if (value !== null) {
            if (field === 'dateArrivee') {
                setStartDate(value);
            } else if (field === 'dateDepart') {
                setEndDate(value);
                if (housing) {
                    if (getDaysDifference(startDate, value) < housing.nombresNuitsMin) {
                        setMinDayMessage(`${translation?.t('minimum_nights_label')} ${housing.nombresNuitsMin}`);
                    } else {
                        setMinDayMessage("");
                    }
                    if (datesIndispo.length > 0) {
                        if (checkDateRangeForIndispo(startDate, value)) {
                            setContainsDateIndispoMessage(translation?.t('contains_date_indispo'));
                        } else {
                            setContainsDateIndispoMessage("");
                        }
                    }
                }
            }
        }
    };

    if (!housing) {
        return <SpinnerDashboard/>;
    }

    return (
        <>
            <div className="max-w-7xl mx-auto p-4 mt-28 bg-white rounded mb-5">
                <div
                    className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 relative overflow-hidden  max-h-[500px]">
                    <div className="sm:col-span-2 sm:row-span-2  overflow-hidden ">
                        <img
                            src={housing.images[0]?.url ?? '/no-image.png'}
                            alt="Main Image"
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            onClick={() => handleOpenModal(housing.images[0].url)}
                        />
                    </div>
                    {housing.images.slice(1).map((image: any, index: number) => (
                        index < 4 && (
                            <div key={index} className="hidden sm:block">
                                <img
                                    src={image.url ?? '/no-image.png'}
                                    alt={`Image ${index + 2}`}
                                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                                    onClick={() => handleOpenModal(image.url ?? '/no-image.png')}
                                />
                            </div>
                        )
                    ))}
                    <div className="absolute right-5 bottom-5">
                        <input
                            className="bg-white px-7 py-2 pl-8 rounded-lg font-bold text-sm cursor-pointer border border-black"
                            type="button"
                            value={translation?.t('see_all_picture')}
                            onClick={() => handleOpenModal(null)}
                        />
                        <div className="absolute top-2.5 left-2">
                            <MdOutlinePhotoLibrary/>
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4 mt-16">{housing.titre}</h1>
                <div className="flex">
                    <IoLocationOutline size={20}/>
                    <p className="text-sm text-gray-950 ml-2">{housing.adresseComplete}</p>
                </div>
                <div className="flex flex-wrap mt-10 sm:justify-around justify-between">
                    <div className="flex items-center">
                        <HiOutlineUserGroup size="20"/>
                        <p className="text-sm text-gray-600 ml-2">{housing.capaciteMaxPersonne} {translation?.t('guest')}</p>
                    </div>
                    <div className="flex items-center">
                        <LiaBedSolid size="20"/>
                        <p className="text-sm text-gray-600 ml-2">{housing.nombresDeChambres} {translation?.t('beds')}</p>
                    </div>
                    <div className="flex items-center">
                        <PiBathtub size="20"/>
                        <p className="text-sm text-gray-600 ml-2">{housing.nombresSallesDeBains} {translation?.t('bathrooms')}</p>
                    </div>
                </div>
                <br/>
                <hr/>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <h1 className="text-2xl font-bold mb-4 mt-16">Description</h1>
                        <div className="max-h-32 max-w-4xl overflow-y-auto mt-2 sm:mt-5 no-scrollbar">
                            <p className="text-sm text-gray-600">{housing.description}</p>
                        </div>
                        <h1 className="text-2xl font-bold mb-10 mt-16">{translation?.t('amenities')}</h1>
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 gap-x-16 gap-y-8 ml-2">
                                {Object.entries(housing.amenagements).map(([key, value], index) => (
                                    <div key={index} className="flex items-center min-w-fit">
                                        {renderIcon(value)}
                                        <p className="text-sm text-gray-600 ml-2 text-nowrap">{translation?.t(key)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold mb-10 mt-16">{translation?.t('housingRules')}</h1>
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 gap-x-16 gap-y-8 ml-2 mb-5">
                                {Object.entries(housing.reglesLogement).map(([key, value], index) => (
                                    <div key={index} className="flex items-center min-w-fit">
                                        {renderIcon(value)}
                                        <p className="text-sm text-gray-600 ml-2 text-nowrap ">{translation?.t(key)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-10 shadow-2xl rounded-xl">
                            <p className="text-sm font-semibold mb-2"> {translation?.t('price')} : {housing.prixParNuit}€ </p>
                            <hr/>
                            <div>
                                <div>
                                    <h5 className={"mb-2 text-sm font-medium text-gray-950 mt-10"}>{translation?.t('check')}</h5>
                                    <DatePickerRangerCustomForm
                                        datesIndispo={datesIndispo}
                                        placeholder={translation?.t('btn_date')}
                                        days={translation?.t('days', {returnObjects: true})}
                                        months={translation?.t('months', {returnObjects: true})}
                                        handleInputChange={handleInputChange}
                                    />
                                    <div className={"flex-col"}>
                                        <p className={"text-red-600"}>{minDayMessage}</p>
                                        <p className={"text-red-600"}>{containsDateIndispoMessage}</p>
                                    </div>
                                    <div>
                                        <h5 className={"mb-2 text-sm font-medium text-gray-950 mt-10"}>{translation?.t('guest')}</h5>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(parseInt(e.target.value))}
                                            className="w-full border px-3 py-2 rounded"
                                        >
                                            {[...Array(housing.capaciteMaxPersonne)].map((_, num) => (
                                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className={`w-full py-3 rounded-lg mt-10 ${!startDate || !endDate || !guests || minDayMessage !== ""
                                        || containsDateIndispoMessage !== "" ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white'}`}
                                        disabled={!startDate || !endDate || !guests || minDayMessage !== "" || containsDateIndispoMessage !== ""}
                                        onClick={() => setIsModalPayment(true)}
                                    >
                                        {translation?.t('book_now')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen &&
                <ModalPhotos images={housing.images} initialImage={initialImage} onClose={handleCloseModal}/>}
            {isModalPayment &&
                <ModalPayment
                    onClose={handleCloseModal}
                    housing={housing}
                    startDate={startDate}
                    endDate={endDate}
                    nbPersonnes={guests}
                />}
        </>
    );
};

export default DetailsResult;
