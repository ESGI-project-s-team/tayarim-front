import {createInvoice} from "@/utils/apiInvoice";

export async function createInvoiceInFun(body: any) {
    try {
        return await createInvoice(body);
    } catch (error: any) {
        return {errors: error};
    }
}