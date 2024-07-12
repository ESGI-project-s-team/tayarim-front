"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const getAllReservationsUrl = `${BACKEND_API}/reservations`
const createReservationsUrl = `${BACKEND_API}/reservations`
const updateReservationsUrl = `${BACKEND_API}/reservations`
const deleteReservationsUrl = `${BACKEND_API}/reservations/cancel`
const updatePaymentIntentReservationsUrl = `${BACKEND_API}/reservations/paymentIntent`
const findReservationsUrl = `${BACKEND_API}/reservations/find`
const claimReservationsUrl = `${BACKEND_API}/reservations/message`


export async function getAllReservations(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getAllReservationsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: "error_occurred"};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function deleteReservation(credential: any): Promise<any> {
    const token = cookies().get("token")?.value;
    let idString = credential.id.toString();
    try {
        const response = await fetch(`${deleteReservationsUrl}/${idString}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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

export async function createReservation(credential: any): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(createReservationsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(credential),
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

export async function createReservationClient(credential: any): Promise<any> {
    try {
        const response = await fetch(createReservationsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
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

export async function updateReservation(credential: any): Promise<any> {
    const token = cookies().get("token")?.value;
    let url = `${updateReservationsUrl}/${credential.id}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(credential),
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

export async function updatePaymentIntentReservation(credential: any): Promise<any> {
    let url = `${updatePaymentIntentReservationsUrl}/${credential.id.toString()}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential.paymentIntent),
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

export async function findReservation(credential: any): Promise<any> {
    try {
        const response = await fetch(findReservationsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credential),
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

export async function claimReservation(credential: any): Promise<any> {
    let url = `${claimReservationsUrl}/${credential.id.toString()}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credential),
        });
        if (!response.ok) {
            const data = await response.json();
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return true;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}