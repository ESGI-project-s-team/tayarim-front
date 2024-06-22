import {createIndispo, deleteIndispo} from "@/utils/apiHousing";

export async function createIndispoInFun(body: any) {
    try {
        return await createIndispo(body);
    } catch (error: any) {
        return {errors: error};
    }
}

export async function deleteIndispoInFun(id: number) {
    try {
        return await deleteIndispo(id);
    } catch (error: any) {
        return {errors: error};
    }
}