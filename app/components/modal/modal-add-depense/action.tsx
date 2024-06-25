import {createDepenses} from "@/utils/apiExpense";

export async function createReservationInFun(body: any) {
    try {
        return await createDepenses(body);
    } catch (error: any) {
        return {errors: error};
    }
}