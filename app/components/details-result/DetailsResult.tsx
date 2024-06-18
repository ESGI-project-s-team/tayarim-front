"use client";
import React, {useState} from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerRangeCustom from "@/app/components/ui/DatePickerRangeCustom";
import DatePickerRangerCustomForm from "@/app/components/ui/DatePickerRangerCustomForm";

const DetailsResult = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialImage, setInitialImage] = useState(null);
    const {translation} = useTranslationContext();
    const handleOpenModal = (image: any = null) => {
        setInitialImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setInitialImage(null);
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(1);

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
    const housing = {
        id: 1,
        titre: "Jolies petit endroit",
        description: "Lorem Ipsum is simply dummy text of the printing and" +
            "typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the" +
            "1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen" +
            "book. It has survived not only five centuries, but also the leap into electronic typesetting," +
            "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset" +
            "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like" +
            "Aldus PageMaker including versions of Lorem Ipsum.",
        prixParNuit: 100,
        adresseComplete: "85 rue de la république, Etampes, 91150, France",
        ville: "Etampes",
        codePostal: "91150",
        pays: "France",
        typeLogement: "Appartement",
        nombresDeChambres: 1,
        nombresDeLits: 1,
        nombresSallesDeBains: 1,
        capaciteMaxPersonne: 1,
        images: [
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExNDMwMzYwMTI1NDgxMTkzNg%3D%3D/original/986f7910-d865-4d61-839a-f28237c6a9a5.jpeg?im_w=1200",
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExNDMwMzYwMTI1NDgxMTkzNg%3D%3D/original/eadc511f-18e7-4419-8a8d-0e9eec52edc1.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/8a3a720a-c852-4141-a57b-b2028522756d.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExNDMwMzYwMTI1NDgxMTkzNg%3D%3D/original/01533603-194a-4109-beec-a288cfd67627.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/ea0bc1a5-19fe-426b-af35-786347e4f1bb.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/e05cf3ce-3d5b-4783-8b56-8824f157ef0d.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/c2dc8f05-7bb0-4937-bdc7-47cf49399060.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/de7132f2-23c6-478a-8369-5817be4b76d1.jpeg?im_w=720",
        ],
        reglesLogement: {
            "Events allowed": "LuPartyPopper",
            "Children allowed": "FaChild",
            "Pets allowed": "MdOutlinePets",
            "Infants allowed": "FaBaby",
            "Smoking allowed": "FaSmoking"
        },
        amenagements: {
            "Air Conditioning": "TbAirConditioning",
            "Handicap Accessible": "BiHandicap",
            "Oven": "PiOvenDuotone",
            "Elevator": "MdElevator",
            "Swimming Pool": "PiSwimmingPool",
            "Internet": "FaWifi",
            "Washer": "BiSolidWasher",
            "Free Parking": "FaParking"
        }
    };
    const renderIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent className="size-5"/> : null;
    };
    const handleInputChange = (field: any, value: any) => {
        if (field === 'dateArrivee') {
            setStartDate(value);
        } else if (field === 'dateDepart') {
            setEndDate(value);
        }
    };
    return (
        <>
            <div className="max-w-7xl mx-auto p-4 mt-28 bg-white rounded mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 relative">
                    <div className="sm:col-span-2 sm:row-span-2">
                        <img
                            src={housing.images[0] ?? 'https://via.placeholder.com/720'}
                            alt="Main Image"
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            onClick={() => handleOpenModal(housing.images[0])}
                        />
                    </div>
                    {housing.images.slice(1).map((src: string, index) => (
                        index < 4 && (
                            <div key={index} className="hidden sm:block">
                                <img
                                    src={src ?? 'https://via.placeholder.com/720'}
                                    alt={`Image ${index + 2}`}
                                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                                    onClick={() => handleOpenModal(src)}
                                />
                            </div>
                        )
                    ))}
                    <div className="absolute right-5 bottom-5">
                        <input
                            className="bg-white px-7 py-2 pl-8 rounded-lg font-bold text-sm cursor-pointer border border-black"
                            type="button"
                            value="Voir toutes les photos"
                            onClick={() => handleOpenModal()}
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
                        <div className="bg-white p-10 shadow-lg rounded-xl">
                            <p className="text-sm font-semibold mb-2"> {housing.prixParNuit} {translation?.t('price')}</p>
                            <hr/>
                            <div>
                                <div>
                                    <h5 className={"mb-2 text-sm font-medium text-gray-950 mt-10"}>{translation?.t('check')}</h5>
                                    <DatePickerRangerCustomForm
                                        placeholder={translation?.t('btn_date')}
                                        days={translation?.t('days', {returnObjects: true})}
                                        months={translation?.t('months', {returnObjects: true})}
                                        handleInputChange={handleInputChange}
                                    />
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
                                        className={`w-full py-3 rounded-lg mt-10 ${!startDate || !endDate || !guests ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white'}`}
                                        disabled={!startDate || !endDate || !guests}
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
        </>
    );
};

export default DetailsResult;
