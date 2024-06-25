import {updateDepenses} from "@/utils/apiExpense";

export async function updateDepensesInFun(body: any) {
    try {
        return await updateDepenses(body);
    } catch (error: any) {
        return {errors: error};
    }
}