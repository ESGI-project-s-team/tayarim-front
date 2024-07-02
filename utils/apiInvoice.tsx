"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const createInvoiceUrl = `${BACKEND_API}/factures`

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

