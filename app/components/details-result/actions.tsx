import {capturePaymentIntent, capturePayment} from "@/utils/apiStripe";

export async function capturePaymentIntentInFun(amount: any) {
    try {
        return await capturePaymentIntent(amount);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function capturePaymentInFun(paymentIntentId: any) {
    try {
        return await capturePayment(paymentIntentId);
    } catch (error: any) {
        return {errors: error};
    }
}