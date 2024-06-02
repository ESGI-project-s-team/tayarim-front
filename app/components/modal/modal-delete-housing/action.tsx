"use server";
import {deleteHousing} from "@/utils/apiHousing";


export async function deleteHousingInFun(id: any) {
    try {
        return await deleteHousing(id);
    } catch (error: any) {
        throw new Error(error);
    }
}
