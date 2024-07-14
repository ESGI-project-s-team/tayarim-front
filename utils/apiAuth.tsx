"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const loginUrl = `${BACKEND_API}/auth/login`
const checkTokenUrl = `${BACKEND_API}/auth`
const checkRefreshTokenUrl = `${BACKEND_API}/auth/refresh`
const logoutUrl = `${BACKEND_API}/auth/logout`
const sendEmailPasswordResetUrl = `${BACKEND_API}/auth/sendRecover`
const verifyRecoverTokenUrl = `${BACKEND_API}/auth/verifyRecover`
const recoverPasswordUrl = `${BACKEND_API}/auth/recover`

export async function login(credentials: any) {
    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {error: data.errors};
            }
        }
        const userID = data.id;
        const token = data.accessToken;
        const refreshToken = data.refreshToken;
        cookies().set("token", token);
        cookies().set("refreshToken", refreshToken);
        return {...data, userID};
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function logout(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(logoutUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const data = await response.json();
            if (data.errors) {
                return {error: data.errors};
            }
        }
        cookies().delete("token");
        cookies().delete("refreshToken");
        return true;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }

}

async function refreshToken(token: string) {
    try {
        const response = await fetch(checkRefreshTokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({refreshToken: token}),
        });
        const data = await response.json();
        if (!response.ok) {
            return false
        }
        return data;
    } catch (error: any) {
        return false;
    }
}

export async function isAdminByToken() {
    let token = cookies().get("token")?.value;
    if (token === undefined || token === null) {
        return false;
    }
    return await isAdminByTokenInFun(token).then(
        async (responseToken) => {
            if (responseToken.error) {
                token = cookies().get("refreshToken")?.value;
                if (token === undefined || token === null) {
                    return false;
                }
                return await refreshToken(token).then(
                    async (responseRefreshToken) => {
                        if (!responseRefreshToken) {
                            return false;
                        }
                        if (responseRefreshToken.accessToken) {
                            cookies().set("token", responseRefreshToken.accessToken);
                            return responseRefreshToken;
                        }
                    }
                );
            }
            return responseToken;
        });
}

async function isAdminByTokenInFun(token: string) {
    try {
        const response = await fetch(checkTokenUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {error: data.errors};
            }
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function sendEmailPasswordReset(credentials: any) {
    try {
        const response = await fetch(sendEmailPasswordResetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const data = await response.json();
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]}
        }
        return true;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function verifyRecoverToken(credentials: any) {
    try {
        const response = await fetch(verifyRecoverTokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const data = await response.json();
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]}
        }
        return true;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function recoverPassword(credentials: any) {
    try {
        const response = await fetch(recoverPasswordUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const data = await response.json();
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]}
        }
        return true;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}


