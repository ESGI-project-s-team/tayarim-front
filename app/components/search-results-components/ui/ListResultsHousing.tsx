import React, {useState, useEffect, useCallback} from 'react';
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import {PiBathtub} from "react-icons/pi";
import {HiOutlineUserGroup} from "react-icons/hi";
import {LiaBedSolid} from "react-icons/lia";
import {MdOutlineHomeWork, MdSearchOff} from "react-icons/md";
import SideNavBarSearch from "@/app/components/search-results-components/ui/side-nav-search/SideNavBarSerch";
import {getAllHousing} from "@/utils/apiHousing";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";

const ListResultsHousing: React.FC = () => {
    const {translation} = useTranslationContext();
    const [housing, setHousing] = useState<any[]>([]);
    const {setError} = useIsErrorContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredHousing, setFilteredHousing] = useState<any[]>([]);

    const getAllHousingFun = useCallback(() => {
        setLoading(true);
        getAllHousing()
            .then(async (response) => {
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setError(null);
                    response = response.filter((house: { isLouable: boolean; }) => house.isLouable);
                    setHousing(response);
                }
                setLoading(false);
            });
    }, [setError]);

    useEffect(() => {
        getAllHousingFun();
    }, [getAllHousingFun]);

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRules, setSelectedRules] = useState<string[]>([]);
    const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(0);
    const [currentMinPrice, setCurrentMinPrice] = useState<number>(0);


    useEffect(() => {
        const filterHousing = () => {
            return housing.filter(item => {
                const inSelectedTypes = selectedTypes.length > 0 ? selectedTypes.includes(item.typeLogement) : true;
                const inSelectedRules = selectedRules.length > 0 ? selectedRules.every(rule => rule in item.reglesLogement) : true;
                const inPriceRange = item.prixParNuit >= currentMinPrice && item.prixParNuit <= currentMaxPrice;
                return inSelectedTypes && inPriceRange && inSelectedRules;
            });
        };
        setFilteredHousing(filterHousing);
    }, [housing, selectedTypes, currentMinPrice, currentMaxPrice, selectedRules]);
    useEffect(() => {
        if (housing.length > 0) {
            const minHousingPrice = Math.min(...housing.map(h => h.prixParNuit));
            const maxHousingPrice = Math.max(...housing.map(h => h.prixParNuit));
            setCurrentMinPrice(minHousingPrice);
            setCurrentMaxPrice(maxHousingPrice);
        }
    }, [housing]);
    const handleFilterChange = (types: string[], maxPrice: number, minPrice: number, rules: string[]) => {
        setSelectedTypes(types);
        setCurrentMaxPrice(maxPrice);
        setCurrentMinPrice(minPrice);
        setSelectedRules(rules)
    };

    return (
        <div className="lg:mr-7 mr-2 z-0 overflow-scroll mt-10 no-scrollbar">
            <SideNavBarSearch onFilterChange={handleFilterChange} minPrice={currentMinPrice}
                              currentMaxPrice={currentMaxPrice}
                              currentMinPrice={currentMinPrice}
                              maxPrice={currentMaxPrice}
            />
            <div className="relative w-full flex">
                <div className="flex flex-col gap-2 w-full ">
                    {loading ?
                        <SpinnerDashboard/>
                        :
                        <>
                            {filteredHousing.length === 0 && (
                                <div className="flex justify-center items-center h-96">
                                    <MdSearchOff size={40}/>
                                    <p className="text-xl font-bold ml-5">{translation?.t('no_result')}</p>
                                </div>
                            )}
                            {filteredHousing.map(item => (
                                <div key={item.id}
                                     className="flex flex-col sm:flex-row border border-gray-300 rounded-lg p-4 mb-5 h-auto sm:h-64 relative cursor-pointer transition-shadow bg-white">
                                    <img
                                        src={item.image ? item.image : "https://via.placeholder.com/150"}
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
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default ListResultsHousing;
