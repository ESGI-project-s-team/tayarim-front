"use server";
import {getAllStatistique} from "@/utils/apiStatistique";


export async function getAllStatistiqueInFun(year: number) {
    try {
        return await getAllStatistique(year);
    } catch (error: any) {
        throw new Error(error);
    }
}

