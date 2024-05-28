"use server";
import {getAllOwners} from "@/utils/apiOwner";


export async function getAllOwnerInFun() {
    try {
        return await getAllOwners();
    } catch (error: any) {
        return {errors: error};
    }
}
