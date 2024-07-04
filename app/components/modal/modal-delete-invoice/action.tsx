import {deleteInvoice} from "@/utils/apiInvoice";

export async function deleteInvoiceInFun(body: any) {
    try {
        return await deleteInvoice(body);
    } catch (error: any) {
        return {errors: error};
    }
}