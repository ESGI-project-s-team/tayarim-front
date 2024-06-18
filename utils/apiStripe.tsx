"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const capturePaiementUrl = `${BACKEND_API}/api/payment/capture-payment`
const intentPaiementUrl = `${BACKEND_API}/api/payment/create-payment-intent`

export async function capturePayment(paymentIntentId: string) {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(capturePaiementUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({paymentIntentId}),
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function capturePaymentIntent(amount: number) {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(intentPaiementUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({amount}),
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

