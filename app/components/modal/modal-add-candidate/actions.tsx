import {createCandidate} from "@/utils/apiOwner";

export async function createCandidateInFun(body: any) {
    try {
        return await createCandidate(body);
    } catch (error: any) {
        return {errors: error};
    }
}
