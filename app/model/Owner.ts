export interface ProprietaireDTO {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    numTel: string;
    commission: number;
    dateInscription: string;
    logements: any[];
    adresse: string;
    isValidated: boolean;
    lang: string;
}