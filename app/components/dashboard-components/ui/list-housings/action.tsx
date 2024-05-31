"use server";
import {getAllOwners, getByIdOwner} from "@/utils/apiOwner";


export async function getAllOwnersInFun() {
    try {
        return await getAllOwners();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getOwnerById(id : string) {
    try {
        return await getByIdOwner(id);
    } catch (error: any) {
        throw new Error(error);
    }
}
