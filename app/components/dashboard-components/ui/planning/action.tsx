"use server";
import {getAllHousing} from "@/utils/apiHousing";


export async function getAllHousingInFun() {
    try {
        return await getAllHousing();
    } catch (error: any) {
        throw new Error(error);
    }
}
