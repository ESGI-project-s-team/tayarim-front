import {CardElement, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {
    capturePaymentIntentInFun, createReservationInFun,
} from "@/app/components/details-result/actions";
import DateFormatterEnFr from "@/app/components/dashboard-components/ui/DateFormaterEnFr";
import {getAmount} from "@/utils/constants";
import {StripeCardElementChangeEvent} from "@stripe/stripe-js";
import SpinnerUI from "@/app/components/ui/SpinnerUI";
import {useIsErrorContext, useNavbarContext, useSuccessContext, useTranslationContext} from "@/app/[lng]/hooks";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export const ModalPayment = ({onClose, housing, startDate, endDate, nbPersonnes}: {
    onClose: () => void,
    housing: any,
    startDate: string,
    endDate: string
    nbPersonnes: number
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
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        lang: theLanguage
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
                                        name: `${formData.name} ${formData.lastname}`,
                                    },
                                },
                            });
                            if (error) {
                                setErrorCard(error.message);
                            } else if (paymentIntent.status === 'requires_capture') {
                                let credential = {
                                    email: formData.email,
                                    numTel: formData.phone,
                                    nom: formData.lastname,
                                    prenom: formData.name,
                                    lang: formData.lang,
                                    nbPersonnes: nbPersonnes,
                                    montant: amount,
                                    dateArrivee: startDate,
                                    dateDepart: endDate,
                                    idLogement: housing.id,
                                    paymentIntent: paymentIntent.id
                                }
                                await createReservationInFun(
                                    credential
                                ).then(
                                    (response) => {
                                        if (response.errors) {
                                            setErrorCard(response.errors);
                                        } else {
                                            setSuccess(true);
                                            setErrorCard(null)
                                            setError(null);
                                            onClose();
                                            //back to home page
                                            router.push("/validation-reservation-client");
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
                                    name="lastname"
                                    value={formData.lastname}
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
                        <img src={housing?.images[0]?.url} alt={housing.titre}
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