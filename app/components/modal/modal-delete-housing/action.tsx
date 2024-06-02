"use server";
import {deleteHousing} from "@/utils/apiHousing";


export async function deleteHousingInFun(credentials: any) {
    try {
        return await deleteHousing(credentials);
    } catch (error: any) {
        throw new Error(error);
    }
}
