"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";

const loginUrl = `${BACKEND_API}/auth/login`
const checkTokenUrl = `${BACKEND_API}/auth`
const checkRefreshTokenUrl = `${BACKEND_API}/auth/refresh`
const logoutUrl = `${BACKEND_API}/auth/logout`

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
        return {error: error.message};
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
        return true;
    } catch (error: any) {
        return {error: error.message};
    }

}

export async function checkToken() {
    let token = cookies().get("token")?.value;
    if (token === undefined || token === '') {
        return false;
    }
    return await checkTokenInFun(token).then(
        async (responseToken) => {
            if (!responseToken) {
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
                            return true;
                        }
                    }
                );
            }
            return true;
        });
}


export async function checkTokenInFun(token: string) {
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
            return false
        }
        return data;
    } catch (error: any) {
        return false;
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
                        console.log(responseRefreshToken)
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
        console.log(checkTokenUrl)
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
        return {error: error.message};
    }
}

