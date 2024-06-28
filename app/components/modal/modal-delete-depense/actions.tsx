"use server";
import {deleteDepenses} from "@/utils/apiExpense";


export async function deleteExpenseInFun(id: any) {
    try {
        return await deleteDepenses(id);
    } catch (error: any) {
        throw new Error(error);
    }
}
