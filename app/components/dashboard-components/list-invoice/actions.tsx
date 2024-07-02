"use server";
import {getAllInvoice} from "@/utils/apiInvoice";


export async function getAllInvoiceInFun() {
    try {
        return await getAllInvoice();
    } catch (error: any) {
        throw new Error(error);
    }
}
