import {findReservation, claimReservation} from "@/utils/apiReservation";

export async function findReservationFun(credential: any) {
    try {
        return await findReservation(credential);
    } catch (error) {
        return {errors: ["error_occurred"]};
    }
}

export async function claimReservationFun(credential: any) {
    try {
        return await claimReservation(credential);
    } catch (error) {
        return {errors: ["error_occurred"]};
    }
}
