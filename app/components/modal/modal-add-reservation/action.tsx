import {createReservation} from "@/utils/apiReservation";

export async function createReservationInFun(body: any) {
    try {
        return await createReservation(body);
    } catch (error: any) {
        return {errors: error};
    }
}