"use server";
import {updateReservation} from "@/utils/apiReservation";

export async function updateReservationInFun(body: any) {
    try {
        return await updateReservation(body);
    } catch (error: any) {
        return {errors: error};
    }
}





