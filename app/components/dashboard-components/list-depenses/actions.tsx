"use server";
import {getAllDepenses} from "@/utils/apiExpense";


export async function getAllDepensesInFun() {
    try {
        return await getAllDepenses();
    } catch (error: any) {
        throw new Error(error);
    }
}

