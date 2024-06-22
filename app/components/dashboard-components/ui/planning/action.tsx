"use server";
import {getAllHousing, getIndispo} from "@/utils/apiHousing";


export async function getAllHousingInFun() {
    try {
        return await getAllHousing();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getIndispoInFun() {
    try {
        return await getIndispo();
    } catch (error: any) {
        throw new Error(error);
    }
}
