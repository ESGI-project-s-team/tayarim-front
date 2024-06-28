"use server";
import {updateOwner, updateCandidate} from "@/utils/apiOwner";


export async function updateOwnerInFun(credentials: any) {
    try {
        return await updateOwner(credentials);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function updateCandidateInFun(credentials: any) {
    try {
        return await updateCandidate(credentials);
    } catch (error: any) {
        return {errors: error};
    }
}