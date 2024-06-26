const icon_menu: string[] = [
    "/dashboard/analytics",
    "/dashboard/planning",
]
const icon_management: string[] = [
    "/dashboard/owner-management",
    "/dashboard/housing-management",
]
const icon_others: string[] = [
    "/dashboard/reservation",
    "",
    "/dashboard/depense",
]

export function getHrefMenu(index: number): string | undefined {
    return icon_menu[index];
}

export function getHrefManagement(index: number): string {
    return icon_management[index];
}

export function getHrefOthers(index: number): string | undefined {
    return icon_others[index];
}
