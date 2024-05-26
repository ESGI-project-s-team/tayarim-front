const icon_menu: string[] = []
const icon_management: string[] = [
    "/dashboard/owner-management",
    "/dashboard/housing-management",
]
const icon_others: string[] = []

export function getHrefMenu(index: number): string | undefined {
    return icon_menu[index];
}

export function getHrefManagement(index: number): string {
    return icon_management[index];
}

export function getHrefOthers(index: number): string | undefined {
    return icon_others[index];
}
