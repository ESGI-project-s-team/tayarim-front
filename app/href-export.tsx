const icon_menu: string[] = [
    "/dashboard",
    "/dashboard/planning",
]
const icon_management: string[] = [
    "/dashboard/owner-management",
    "/dashboard/housing-management",
    "/dashboard/reservation",
]
const icon_others: string[] = [
    "/dashboard/invoice",
    "/dashboard/expense",
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
