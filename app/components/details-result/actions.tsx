import {capturePaymentIntent, capturePayment} from "@/utils/apiStripe";
import {updatePaymentIntentReservation, createReservation, createReservationClient} from "@/utils/apiReservation";
import {getByIdHousing, getDatesIndispoByIdHousing} from "@/utils/apiHousing";

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

export async function createReservationInFun(credential: any) {
    try {
        return await createReservationClient(credential);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function updatePaymentIntentReservationInFun(credential: any) {
    try {
        return await updatePaymentIntentReservation(credential);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function getDatesIndispoByIdHousingInFun(id: number) {
    try {
        return await getDatesIndispoByIdHousing(id);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function getHousingByIdInFun(id: string) {
    try {
        return await getByIdHousing(id);
    } catch (error: any) {
        return {errors: error};
    }
}
