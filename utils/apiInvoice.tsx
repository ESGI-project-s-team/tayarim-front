"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const createInvoiceUrl = `${BACKEND_API}/factures`
const getAllInvoiceUrl = `${BACKEND_API}/factures`
const sendInvoiceUrl = `${BACKEND_API}/factures/send`
const deleteInvoiceUrl = `${BACKEND_API}/factures`
const downloadInvoiceUrl = `${BACKEND_API}/factures/link`

export async function createInvoice(body: any) {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(createInvoiceUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
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

export async function getAllInvoice() {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getAllInvoiceUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const data = await response.json();
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return await response.json();
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function sendInvoice(id: number) {
    const token = cookies().get("token")?.value;
    const url = `${sendInvoiceUrl}/${id.toString()}`
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            const data = await response.json();
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

export async function deleteInvoice(id: number) {
    const token = cookies().get("token")?.value;
    const url = `${deleteInvoiceUrl}/${id.toString()}`
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            const data = await response.json();
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

export async function downloadInvoice(id: any) {
    const token = cookies().get("token")?.value;
    const url = `${downloadInvoiceUrl}/${id.toString()}`
    try {
        const response = await fetch(url, {
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
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}
