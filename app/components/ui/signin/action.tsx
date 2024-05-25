import {isAdminByToken, login} from "@/utils/apiAuth";


export async function signInFun(credentials: any) {
    try {
        return await login(credentials);
    } catch (error) {
        return false;
    }
}

export async function checkTokenInFun() {

    return await isAdminByToken();

}

export async function checkTokenInFunIsAdmin() {

    return await isAdminByToken();

}
