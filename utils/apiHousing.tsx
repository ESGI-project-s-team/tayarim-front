"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const getAllHousingUrl = `${BACKEND_API}/logements`
const createHousingUrl = `${BACKEND_API}/logements`
const deleteHousingUrl = `${BACKEND_API}/logements`
const updateHousingUrl = `${BACKEND_API}/logements`
const getByIdHousingUrl = `${BACKEND_API}/logements`
const getHousingTypesUrl = `${BACKEND_API}/logements/types`
const getHousingRulesUrl = `${BACKEND_API}/reglesLogement`
const getHousingAmenitiesUrl = `${BACKEND_API}/amenagements`


export async function getAllHousing(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getAllHousingUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: "error_occurred"};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function createHousing(body: any): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(createHousingUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function deleteHousing(id: string): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(`${deleteHousingUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function updateHousing(body: any): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(`${updateHousingUrl}/${body.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function getHousingTypes(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getHousingTypesUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function getHousingRules(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getHousingRulesUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function getHousingAmenities(): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        const response = await fetch(getHousingAmenitiesUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}

export async function getByIdHousing(id: number): Promise<any> {
    const token = cookies().get("token")?.value;
    let idString = id.toString();
    try {
        const response = await fetch(`${getByIdHousingUrl}/${idString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.errors) {
                return {errors: data.errors};
            }
            return {errors: ["error_occurred"]};
        }
        return data;
    } catch (error: any) {
        return {errors: ["error_occurred"]};
    }
}