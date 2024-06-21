"use server";
import {capturePayment} from "@/utils/apiStripe";

export async function capturePaymentInFun(paymentIntentId: string) {
    try {
        return await capturePayment(paymentIntentId);
    } catch (error: any) {
        return {errors: error};
    }
}





