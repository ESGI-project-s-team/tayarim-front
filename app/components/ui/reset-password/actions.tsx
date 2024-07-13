import {sendEmailPasswordReset, verifyRecoverToken, recoverPassword} from "@/utils/apiAuth";


export async function sendEmailPasswordResetFun(credentials: any) {
    try {
        return await sendEmailPasswordReset(credentials);
    } catch (error) {
        return {errors: ["error_occurred"]};
    }
}

export async function verifyRecoverTokenFun(credentials: any) {
    try {
        return await verifyRecoverToken(credentials);
    } catch (error) {
        return {errors: ["error_occurred"]};
    }
}

export async function recoverPasswordFun(credentials: any) {
    try {
        return await recoverPassword(credentials);
    } catch (error) {
        return {errors: ["error_occurred"]};
    }
}