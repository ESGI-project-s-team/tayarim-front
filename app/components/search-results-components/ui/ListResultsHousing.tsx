import React, {useState, useEffect, useCallback} from 'react';
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";
import {PiBathtub} from "react-icons/pi";
import {HiOutlineUserGroup} from "react-icons/hi";
import {LiaBedSolid} from "react-icons/lia";
import {MdOutlineHomeWork, MdSearchOff} from "react-icons/md";
import SideNavBarSearch from "@/app/components/search-results-components/ui/side-nav-search/SideNavBarSerch";
import {searchHousing} from "@/utils/apiHousing";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import SearchRoomReservation from "@/app/components/ui/SearchRoomReservation";

const ListResultsHousing: React.FC = () => {
    const {translation} = useTranslationContext();
    const [housing, setHousing] = useState<any[]>([]);
    const {setError} = useIsErrorContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredHousing, setFilteredHousing] = useState<any[]>([]);
    const [destination, setDestination] = useState<string | null>('');
    const [dateArrivee, setDateArrivee] = useState<string | null>(null);
    const [dateDepart, setDateDepart] = useState<string | null>(null);
    const [nbPersonnes, setNbPersonnes] = useState<number | null | string>(null);

    const initializeStateFromLocalStorage = useCallback(() => {
        setDestination(localStorage.getItem('location'));
        setDateArrivee(localStorage.getItem('checkin'));
        setDateDepart(localStorage.getItem('checkout'));
        setNbPersonnes(localStorage.getItem('guest') || null);
    }, []);

    const searchHousingFun = useCallback(async () => {
        setLoading(true);
        //convert format date to yyyy-mm-dd
        const body = {
            destination: localStorage.getItem('location'),
            dateArrivee: localStorage.getItem('checkin'),
            dateDepart: localStorage.getItem('checkout'),
            nbPersonnes: localStorage.getItem('guest') || null,
        };
        body.dateArrivee = body.dateArrivee ? new Date(body.dateArrivee).toISOString().split('T')[0] : null;
        body.dateDepart = body.dateDepart ? new Date(body.dateDepart).toISOString().split('T')[0] : null;

        await searchHousing(body)
            .then(async (response) => {
                if (response.errors) {
                    setError(null);
                } else {
                    setError(null);
                    const newResponse = response.filter((house: { isLouable: boolean; }) => house.isLouable);
                    setHousing(newResponse);
                    setFilteredHousing(newResponse)
                }
            })
            .finally(() => setLoading(false));
    }, [setError]);

    useEffect(() => {
        initializeStateFromLocalStorage();
        searchHousingFun();
    }, [initializeStateFromLocalStorage, searchHousingFun]);

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRules, setSelectedRules] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [currentBedrooms, setCurrentBedrooms] = useState<number>(0);
    const [currentBathrooms, setCurrentBathrooms] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(0);
    const [currentMinPrice, setCurrentMinPrice] = useState<number>(0);

    useEffect(() => {
        const filterHousing = () => {
            return housing.filter(item => {
                const inSelectedTypes = selectedTypes.length > 0 ? selectedTypes.includes(item.typeLogement) : true;
                const inSelectedRules = selectedRules.length > 0 ? selectedRules.every(rule => rule in item.reglesLogement) : true;
                const inSelectedAmenities = selectedAmenities.length > 0 ? selectedAmenities.every(amenity => amenity in item.amenagements) : true;
                const inPriceRange = item.prixParNuit >= currentMinPrice && item.prixParNuit <= currentMaxPrice;
                const inBedrooms = currentBedrooms === 0 ? true : item.nombresDeChambres >= currentBedrooms;
                const inBathrooms = currentBathrooms === 0 ? true : item.nombresSallesDeBains >= currentBathrooms;
                return inSelectedTypes && inPriceRange && inSelectedRules && inSelectedAmenities && inBedrooms && inBathrooms;
            });
        };
        setFilteredHousing(filterHousing);
    }, [housing, selectedTypes, currentMinPrice, currentMaxPrice, selectedRules, selectedAmenities, currentBedrooms, currentBathrooms]);

    useEffect(() => {
        if (housing.length > 0) {
            const minHousingPrice = Math.min(...housing.map(h => h.prixParNuit));
            const maxHousingPrice = Math.max(...housing.map(h => h.prixParNuit));
            setMinPrice(minHousingPrice);
            setMaxPrice(maxHousingPrice);
            setCurrentMinPrice(minHousingPrice);
            setCurrentMaxPrice(maxHousingPrice);
        }
    }, [housing]);

    const handleFilterChange = (types: string[], maxPrice: number, minPrice: number, rules: string[], amenities: string[],
                                bedrooms: number, bathrooms: number) => {
        setSelectedTypes(types);
        setCurrentMaxPrice(maxPrice);
        setCurrentMinPrice(minPrice);
        setSelectedRules(rules)
        setSelectedAmenities(amenities)
        setCurrentBedrooms(bedrooms)
        setCurrentBathrooms(bathrooms)
    };

    return (
        <div className="lg:mr-7 mr-2 z-0 overflow-scroll mt-10 no-scrollbar">
            <SearchRoomReservation
                search={true}
                searchHousingCurrent={searchHousingFun}
            />
            <SideNavBarSearch onFilterChange={handleFilterChange} minPrice={minPrice}
                              currentMaxPrice={currentMaxPrice}
                              currentMinPrice={currentMinPrice}
                              maxPrice={maxPrice}
            />
            <div className="relative w-full flex">
                <div className="flex flex-col gap-2 w-full mt-10">
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
                                <a key={item.id} href={`search-results/details/${item.id}`} target={"_blank"}>
                                    <div
                                        className="flex flex-col sm:flex-row border border-gray-300 rounded-lg p-4 mb-5 h-auto sm:h-64 relative cursor-pointer transition-shadow bg-white "
                                    >
                                        <img
                                            src={item.images[0]?.url ?? '/no-image.png'}
                                            alt={item.titre}
                                            className="sm:min-w-72 sm:max-w-72 h-48 sm:h-full object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"/>
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
                                </a>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default ListResultsHousing;
