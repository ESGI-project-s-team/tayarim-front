"use client";
import React, {useEffect, useState} from "react";
import {MdOutlinePhotoLibrary} from "react-icons/md";
import "../../globals.css";
import ModalPhotos from "@/app/components/details-result/ModalPhotos";
import {IoLocationOutline} from "react-icons/io5";
import {HiOutlineUserGroup} from "react-icons/hi";
import {LiaBedSolid} from "react-icons/lia";
import {PiBathtub} from "react-icons/pi";
import {useIsErrorContext, useNavbarContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import {MdOutlinePets, MdApartment, MdVilla, MdElevator} from "react-icons/md";
import {LuPartyPopper} from "react-icons/lu";
import {PiWarehouseFill, PiStudent, PiSwimmingPool, PiOvenDuotone} from "react-icons/pi";
import {FaSmoking, FaHouse, FaHouseUser, FaPeopleRoof} from "react-icons/fa6";
import {FaParking, FaWifi, FaChild, FaBaby} from "react-icons/fa";
import {TbAirConditioning} from "react-icons/tb";
import {BiSolidWasher, BiHandicap} from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerRangerCustomForm from "@/app/components/ui/DatePickerRangerCustomForm";
import {CardElement, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {
    capturePaymentIntentInFun,
    updatePaymentIntentReservationInFun
} from "@/app/components/details-result/actions";
import DateFormatterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import {getAmount} from "@/utils/constants";
import {StripeCardElementChangeEvent} from "@stripe/stripe-js";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import SpinnerUI from "@/app/components/ui/SpinnerUI";

const ModalPayment = ({onClose, housing, startDate, endDate}: {
    onClose: () => void,
    housing: any,
    startDate: string,
    endDate: string
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {setError} = useIsErrorContext();
    const [errorCard, setErrorCard] = useState<any>(undefined);
    const {setSuccess} = useSuccessContext();
    const {translation} = useTranslationContext();
    const [clientSecret, setClientSecret] = useState('');
    const {theLanguage} = useNavbarContext();
    const [amount, setAmount] = useState(0);
    const [isCardComplete, setIsCardComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: ''
    });

    const isFormComplete = Object.values(formData).every((field) => field.trim() !== '');

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleCardChange = (event: StripeCardElementChangeEvent) => {
        setIsCardComplete(event.complete);
    };
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        setIsLoading(true);
        event.preventDefault();
        const createPaymentIntent = async () => {
            await capturePaymentIntentInFun(amount).then(
                async (response) => {
                    if (response.errors) {
                        setErrorCard(response.errors);
                    } else {
                        setError(null);
                        setErrorCard(null);
                        setClientSecret(response.clientSecret);
                        if (stripe && elements) {
                            const cardElement = elements.getElement(CardElement);
                            const {error, paymentIntent} = await stripe.confirmCardPayment(response.clientSecret, {
                                payment_method: {
                                    card: cardElement as any,
                                    billing_details: {
                                        name: `${formData.name} ${formData.surname}`,
                                    },
                                },
                            });
                            if (error) {
                                setErrorCard(error.message);
                            } else if (paymentIntent.status === 'requires_capture') {
                                await updatePaymentIntentReservationInFun({
                                    id: 1,
                                    paymentIntent: paymentIntent.id
                                }).then(
                                    (response) => {
                                        if (response.errors) {
                                            setErrorCard(response.errors);
                                        } else {
                                            setSuccess(true);
                                            setErrorCard(null)
                                            setError(null);
                                            onClose();
                                        }
                                    }
                                )
                            }
                        }
                    }
                }
            )
        };
        createPaymentIntent().then(
            () => setIsLoading(false)
        );
    };
    useEffect(() => {
        setAmount(getAmount(housing.prixParNuit, startDate, endDate));
    }, [endDate, housing.prixParNuit, startDate]);
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl">
                    &times;
                </button>
                <div className="w-1/2 p-4 flex flex-col justify-center pr-10">
                    <form onSubmit={handleSubmit}>
                        <div className={"flex gap-5"}>
                            <div className="mb-4">
                                <label className="block mb-1 text-sm">{translation?.t('form_firstname')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="p-2 rounded-lg w-full border-gray-300 border-1 "
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 text-sm">{translation?.t('form_lastname')}</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    className="p-2 rounded-lg w-full border-gray-300 border-1 "
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-sm">{translation?.t('email_placeholder')}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-2  rounded-lg w-full border-gray-300 border-1 "
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm">{translation?.t('phone')}</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="p-2  rounded-lg w-full border-gray-300 border-1 "
                            />
                        </div>
                        <div className="mb-4">
                            <CardElement className="p-3 border rounded-lg "
                                         onChange={handleCardChange}/>
                        </div>
                        {
                            isLoading ?
                                <div className={"flex justify-center"}>
                                    <SpinnerUI/>
                                </div>
                                :
                                <>
                                    <button
                                        type="submit"
                                        className={`w-full py-3 rounded-lg ${isFormComplete && isCardComplete ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                                        disabled={!isFormComplete && isCardComplete}
                                    >
                                        {translation?.t('confirm_and_pay')}
                                    </button>
                                    {errorCard ?
                                        <p className={"text-red-600"}>{errorCard}</p>
                                        :
                                        null
                                    }
                                </>
                        }

                    </form>
                </div>
                <div className="w-1/2 p-4 border-l border-gray-300 pl-10 ">
                    <div className="my-4">
                        <img src={housing.images[0]} alt={housing.titre}
                             className="rounded-lg w-full h-48 object-cover"/>
                    </div>
                    <p className="text-lg font-semibold">{housing.titre}</p>
                    <p className="text-xs mt-2 text-gray-500">{housing.adresseComplete}</p>
                    <p className={"text-xs mt-2 text-gray-500"}><DateFormatterEnFr date={startDate}
                                                                                   theLanguage={theLanguage}/> - <DateFormatterEnFr
                        date={endDate} theLanguage={theLanguage}/></p>
                    <hr className={"mt-4"}/>
                    <p className="text-sm font-bold mt-2">{`${translation?.t('montant')}: ${
                        amount
                    } €`}</p>
                </div>
            </div>
        </div>
    );
};

const DetailsResult = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPayment, setIsModalPayment] = useState(false);
    const [initialImage, setInitialImage] = useState(null);
    const {translation} = useTranslationContext();
    const handleOpenModal = (image = null) => {
        setInitialImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setInitialImage(null);
        setIsModalPayment(false);
    };

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(1);

    const iconMap = {
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
    const handleInputChange = (field: string, value: React.SetStateAction<any>) => {
        if (value !== null) {
            if (field === 'dateArrivee') {
                setStartDate(value);
            } else if (field === 'dateDepart') {
                setEndDate(value);
            }
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
                    {housing.images.slice(1).map((src, index) => (
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
                />}
        </>
    );
};

export default DetailsResult;
