"use server";
import {createOwner} from "@/utils/apiOwner";


export async function createOwnerInFun(credentials: any) {
    try {
        return await createOwner(credentials);
    } catch (error: any) {
        throw new Error(error);
    }
}
