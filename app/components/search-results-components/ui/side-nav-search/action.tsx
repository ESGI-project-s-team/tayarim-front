import {getHousingTypes} from "@/utils/apiHousing";

export async function getHousingTypesInFun() {
    try {
        return await getHousingTypes();
    } catch (error: any) {
        return {errors: error};
    }
}