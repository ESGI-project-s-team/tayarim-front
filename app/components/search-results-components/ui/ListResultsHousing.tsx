import React, {useState} from 'react';
import {useTranslationContext} from "@/app/[lng]/hooks";
import {PiBathtub} from "react-icons/pi";
import {HiOutlineUserGroup} from "react-icons/hi";
import {LiaBedSolid} from "react-icons/lia";
import {MdOutlineHomeWork} from "react-icons/md";
import SideNavBarSerch from "@/app/components/search-results-components/ui/side-nav-search/SideNavBarSerch";
import {MdSearchOff} from "react-icons/md";

const ListResultsHousing: React.FC = () => {
    const {translation} = useTranslationContext();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const housing = [
        {
            "image": "https://web-api.maveriks.com/image/company/7b24d8d8-9347-4a83-8dbc-b260549a4f5e/unit/002883f1-7b9e-4de6-b05f-4a3cdaec4b6e/ba17bde0-eee0-11ee-a1c6-67fad5491db5.jpg?w=1920",
            "id": 1,
            "titre": "Jolies petit endroit",
            "idProprietaire": 1,
            "isLouable": false,
            "nombresDeChambres": 1,
            "nombresDeLits": 1,
            "nombresSallesDeBains": 1,
            "capaciteMaxPersonne": 1,
            "nombresNuitsMin": 6,
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
                "\n" +
                "Why do we use it?\n" +
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            "note": 2.5,
            "prixParNuit": 100,
            "defaultCheckIn": "07:00",
            "defaultCheckOut": "08:00",
            "adresseComplete": "85 rue de la république, Etampes, 91150, France",
            "adresse": "85 rue de la république",
            "ville": "Etampes",
            "codePostal": "91150",
            "pays": "France",
            "etage": "1",
            "numeroDePorte": "1",
            "typeLogement": "Appartement"
        },
        {
            "image": "https://web-api.maveriks.com/image/company/7b24d8d8-9347-4a83-8dbc-b260549a4f5e/unit/0034cd6c-f355-4bbd-b673-5e3d44c44607/fcd3d270-eee0-11ee-88b9-c9790903585d.jpg?w=1920",
            "id": 4,
            "titre": "fze",
            "idProprietaire": 1,
            "isLouable": false,
            "nombresDeChambres": null,
            "nombresDeLits": null,
            "nombresSallesDeBains": null,
            "capaciteMaxPersonne": null,
            "nombresNuitsMin": null,
            "description": "fzezfe",
            "prixParNuit": 160,
            "defaultCheckIn": "07:00",
            "defaultCheckOut": "08:00",
            "adresseComplete": "85 rue de la république, Etampes, 91150, France",
            "adresse": "85 rue de la république",
            "ville": "Etampes",
            "codePostal": "91150",
            "pays": "France",
            "etage": "1",
            "numeroDePorte": "1",
            "typeLogement": "Maison"
        },
        {
            "image": "https://web-api.maveriks.com/image/company/7b24d8d8-9347-4a83-8dbc-b260549a4f5e/unit/01bc3da0-3941-4edf-8182-b6022490eb02/c4835930-eee9-11ee-b61a-1df12bf1ffdb.jpg?w=1920",
            "id": 6,
            "titre": "zara",
            "idProprietaire": 2,
            "isLouable": false,
            "nombresDeChambres": null,
            "nombresDeLits": null,
            "nombresSallesDeBains": null,
            "capaciteMaxPersonne": null,
            "nombresNuitsMin": null,
            "description": "fzfze",
            "prixParNuit": 200,
            "defaultCheckIn": "07:00",
            "defaultCheckOut": "08:00",
            "adresseComplete": "85 rue de la république, Etampes, 91150, France",
            "adresse": "85 rue de la république",
            "ville": "Etampes",
            "codePostal": "91150",
            "pays": "France",
            "etage": "1",
            "numeroDePorte": "1",
            "typeLogement": "Maison"
        }
    ];

    const filteredHousing = selectedTypes.length > 0
        ? housing.filter(item => selectedTypes.includes(item.typeLogement))
        : housing;

    return (
        <div className="lg:mr-7 mr-2 z-0 overflow-scroll mt-10 no-scrollbar">
            <SideNavBarSerch onFilterChange={setSelectedTypes} housing={housing}/>
            <div className="relative w-full flex">
                <div className="flex flex-col gap-2 w-full ">
                    {
                        filteredHousing.length === 0 &&
                        <div className="flex justify-center items-center h-96">
                            <MdSearchOff size={40}/>
                            <p className="text-xl font-bold ml-5">{translation?.t('no_result')}</p>
                        </div>
                    }
                    {filteredHousing.map(item => (
                        <div key={item.id}
                             className="flex flex-col sm:flex-row border border-gray-300
                             rounded-lg p-4 mb-5 h-auto sm:h-64 relative cursor-pointer
                             transition-shadow
                             bg-white">
                            <img
                                src={item.image}
                                alt={item.titre}
                                className="w-full sm:w-64 h-48 sm:h-full object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"/>
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-bold mb-2">{item.titre}</h2>
                                    <p className="hidden sm:block text-lg font-bold">{item.prixParNuit ? `${item.prixParNuit} €/${translation?.t('night')}` : 'N/A'}</p>
                                </div>
                                <div className="h-10 max-w-2xl overflow-y-auto mt-2 sm:mt-5 no-scrollbar">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                                <div className="flex flex-wrap mt-10">
                                    <MdOutlineHomeWork size="20"/>
                                    <p className="text-sm text-gray-600 ml-2 underline">{translation?.t(item.typeLogement)},</p>
                                    <p className="text-sm text-gray-600 ml-2">{item.ville},</p>
                                    <p className="text-sm text-gray-600 ml-2">{item.codePostal},</p>
                                    <p className="text-sm text-gray-600 ml-2">{item.pays}</p>
                                </div>
                                <div className="flex flex-wrap mt-10 sm:justify-around justify-between">
                                    <div className="flex items-center">
                                        <HiOutlineUserGroup size="20"/>
                                        <p className="text-sm text-gray-600 ml-2">{item.capaciteMaxPersonne} {translation?.t('guest_max')}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <LiaBedSolid size="20"/>
                                        <p className="text-sm text-gray-600 ml-2">{item.nombresDeChambres} {translation?.t('beds')}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <PiBathtub size="20"/>
                                        <p className="text-sm text-gray-600 ml-2">{item.nombresSallesDeBains} {translation?.t('bathrooms')}</p>
                                    </div>
                                </div>
                                <p className="block sm:hidden text-lg font-bold mt-10">{item.prixParNuit ? `${item.prixParNuit} €/nuit` : 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListResultsHousing;
