"use server";
import {getAllOwners} from "@/utils/apiOwner";


export async function getAllOwnersInFun() {
    try {
        return await getAllOwners();
    } catch (error: any) {
        throw new Error(error);
    }
}
