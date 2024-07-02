"use server";
import {getAllInvoice, sendInvoice} from "@/utils/apiInvoice";


export async function getAllInvoiceInFun() {
    try {
        return await getAllInvoice();
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function sendInvoiceInFun(id: number) {
    try {
        return await sendInvoice(id);
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}
