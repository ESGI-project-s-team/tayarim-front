"use server";
import {getAllReservations} from "@/utils/apiReservation";


export async function getAllReservationsInFun() {
    try {
        return await getAllReservations();
    } catch (error: any) {
        throw new Error(error);
    }
}
