"use server";
import {BACKEND_API} from "@/utils/constants";
import {cookies} from "next/headers";


const getAllHousingUrl = `${BACKEND_API}/logements`
const createHousingUrl = `${BACKEND_API}/logements`
const deleteHousingUrl = `${BACKEND_API}/logements`
const updateHousingUrl = `${BACKEND_API}/logements`
const getByIdHousingUrl = `${BACKEND_API}/logements`
const getDatesIndispoByIdHousingUrl = `${BACKEND_API}/logements/dates`
const searchHousingUrl = `${BACKEND_API}/logements/search`
const getHousingTypesUrl = `${BACKEND_API}/logements/types`
const getHousingRulesUrl = `${BACKEND_API}/reglesLogement`
const getHousingAmenitiesUrl = `${BACKEND_API}/amenagements`
const createIndispoUrl = `${BACKEND_API}/indisponibilites`
const getIndispoUrl = `${BACKEND_API}/indisponibilites`
const deleteIndispoUrl = `${BACKEND_API}/indisponibilites`


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

export async function createHousingApi(formData: any): Promise<any> {
    try {
        const token = cookies().get("token")?.value;

        const response = await fetch(createHousingUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
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

export async function updateHousing(formData: any): Promise<any> {
    const token = cookies().get("token")?.value;
    try {
        let url = updateHousingUrl + "/" + formData.get("id");
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
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

export async function getByIdHousing(id: string): Promise<any> {
    try {
        const response = await fetch(`${getByIdHousingUrl}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export async function searchHousing(body: any): Promise<any> {
    try {
        for (let key in body) {
            if (body[key] === "" || body[key] === '' || body[key] === null || body[key] === undefined) {
                delete body[key];
            }
        }
        const response = await fetch(searchHousingUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

export async function getDatesIndispoByIdHousing(id: number): Promise<any> {
    let idString = id.toString();
    try {
        const response = await fetch(`${getDatesIndispoByIdHousingUrl}/${idString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export async function createIndispo(body: any): Promise<any> {
    try {
        const token = cookies().get("token")?.value;
        const response = await fetch(createIndispoUrl, {
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

export async function getIndispo(): Promise<any> {
    let token = cookies().get("token")?.value;
    try {
        const response = await fetch(getIndispoUrl, {
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

export async function deleteIndispo(id: number): Promise<any> {
    try {
        let url = deleteIndispoUrl + "/" + id.toString();
        const token = cookies().get("token")?.value;
        const response = await fetch(url, {
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

