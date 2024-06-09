import React, {useEffect, useState} from 'react';
import {useIsErrorContext, useIsOpenSideBarContext, useTranslationContext} from "@/app/[lng]/hooks";
import {getHousingTypesInFun} from "@/app/components/modal/modal-add-housing/action";
import SpinnerDashboard from "@/app/components/ui/SpinnerDashboard";
import PriceRange from "@/app/components/ui/PriceRange";
import {MdOutlinePets, MdApartment, MdVilla} from "react-icons/md";
import {LuPartyPopper} from "react-icons/lu";
import {PiWarehouseFill, PiStudent} from "react-icons/pi";
import {FaChildren, FaSmoking, FaHouse, FaHouseUser, FaPeopleRoof} from "react-icons/fa6";


const SideNavBarSearch: React.FC<{
    onFilterChange: (selectedTypes: string[], maxPrice: number, minPrice: number) => void,
    currentMaxPrice: number,
    currentMinPrice: number,
    maxPrice: number,
    minPrice: number,
}> = ({onFilterChange, minPrice, maxPrice, currentMinPrice, currentMaxPrice}) => {
    const {isOpenSideBar, setIsOpenSideBar} = useIsOpenSideBarContext();
    const {translation} = useTranslationContext();
    const [loadingFiltre, setLoadingFiltre] = useState<boolean>(true);
    const {setError} = useIsErrorContext();
    const [housingTypes, setHousingTypes] = useState<any>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const iconMap: any = {
        MdOutlinePets: MdOutlinePets,
        MdApartment: MdApartment,
        MdVilla: MdVilla,
        LuPartyPopper: LuPartyPopper,
        PiWarehouseFill: PiWarehouseFill,
        PiStudent: PiStudent,
        FaChildren: FaChildren,
        FaSmoking: FaSmoking,
        FaHouse: FaHouse,
        FaHouseUser: FaHouseUser,
        FaPeopleRoof: FaPeopleRoof
        // Ajoutez ici d'autres icônes que vous pourriez utiliser
    };

    const renderIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent className="size-5"/> : null;
    };
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsOpenSideBar(!e.matches);
        };
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        setIsOpenSideBar(!mediaQuery.matches);

        const handleGetAllHousingType = async () => {
            try {
                const response = await getHousingTypesInFun();
                if (response.errors) {
                    setError(response.errors);
                } else {
                    setHousingTypes(response);
                    console.log(response);
                    setError(null);
                }
                setLoadingFiltre(false);
            } catch (error) {
                setLoadingFiltre(false);
                setError(error);
            }
        };
        handleGetAllHousingType().then();

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, [setError, setIsOpenSideBar]);

    const toggleType = (filter: any) => {
        const updatedTypes = selectedTypes.includes(filter)
            ? selectedTypes.filter(t => t !== filter)
            : [...selectedTypes, filter];
        setSelectedTypes(updatedTypes);
        onFilterChange(updatedTypes, currentMaxPrice, currentMinPrice);
    };

    const toggleOpen = () => {
        setIsOpenSideBar(!isOpenSideBar);
    };

    const handleMaxPriceChange = (max: number) => {
        onFilterChange(selectedTypes, max, currentMinPrice);
    };

    const handleMinPriceChange = (min: number) => {
        onFilterChange(selectedTypes, currentMaxPrice, min);
    };

    return (
        <div style={{scrollbarWidth: "none"}}
             className={`fixed w-72 inset-y-0 left-0 transition-all duration-300 ease-in-out bg-[#1c2434] z-10 h-screen ${isOpenSideBar ? '' : '-translate-x-60'}`}
        >
            <div className="fixed w-72 z-10 flex pt-10 pb-7 bg-[#1c2434] justify-around lg:justify-start ">
                <div>
                    <img className="h-8 w-auto justify-center lg:ml-10" src="/logo-contour.png" alt="logo"/>
                </div>
                <div className={`mt-1 cursor-pointer lg:hidden ${isOpenSideBar ? '' : 'transform rotate-180 ml-10'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6 text-[#dee4ee]" onClick={toggleOpen}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </div>
            </div>
            <div className="bg-[#1c2434] overflow-y-scroll no-scrollbar mt-24" style={{height: "auto"}}>
                <nav className="mt-9 px-6 text-[#dee4ee] ">
                    {loadingFiltre ?
                        <SpinnerDashboard color={"white"}/>
                        :
                        <>
                            <div className={"py-2 rounded-t-md"}>
                                <h3 className="ml-4 text-base font-semibold text-white">Filtrer par </h3>
                            </div>
                            <div className="rounded-b-md">
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8a99af] mt-5">{translation?.t('price')}</h3>
                                <div className="mb-14 flex flex-col gap-10">
                                    <PriceRange maxPrice={maxPrice} minPrice={minPrice}
                                                currentMaxPrice={currentMaxPrice}
                                                currentMinPrice={currentMinPrice}
                                                onMaxPriceChange={handleMaxPriceChange}
                                                onMinPriceChange={handleMinPriceChange}/>
                                </div>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8a99af] mt-5">{translation?.t('nombres_de_lits')}</h3>
                                <div className="w-[80%] ml-4">
                                    <input
                                        placeholder={translation?.t('nombres_de_lits_placeholder')}
                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-white outline-none transition focus:border-white focus:ring-0 focus:bg-[#2b334a] hover:bg-[#2b334a]
                                        mb-4"
                                        type="number"
                                        min="1"
                                    />
                                </div>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8a99af] mt-5">{translation?.t('bathrooms')}</h3>
                                <div className="w-[80%] ml-4">
                                    <input
                                        placeholder={translation?.t('nombres_de_salles_de_bains_placeholder')}
                                        className="text-sm w-full rounded border-[1.5px] border-[#dee4ee] bg-transparent px-5 py-3 text-white outline-none transition focus:border-white focus:ring-0 focus:bg-[#2b334a]
                                        mb-4"
                                        type="number"
                                        min="1"
                                    />
                                </div>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8a99af] mt-5">{translation?.t('housing_type')}</h3>
                                <ul className="mb-4 flex flex-col gap-1.5">
                                    {housingTypes.map((type: { nom: string, icone: any }, index: number) => (
                                        <li key={index}>
                                            <div
                                                className="relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-[#2b334a] text-sm">
                                                <input
                                                    type="checkbox"
                                                    className="rounded cursor-pointer"
                                                    onChange={() => toggleType(type.nom)}
                                                    checked={selectedTypes.includes(type.nom)}
                                                />
                                                <span className="size-5">
                                                    {renderIcon(type.icone)}
                                                </span>
                                                {translation?.t(type.nom)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-[#8a99af] mt-9">{translation?.t('amenities')}</h3>
                                <ul className="mb-6 flex flex-col gap-1.5">
                                    {housingTypes.map((type: { nom: string, icone: any }, index: number) => (
                                        <li key={index}>
                                            <div
                                                className="relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-[#2b334a] text-sm">
                                                <input
                                                    type="checkbox"
                                                    className="rounded cursor-pointer"
                                                    onChange={() => toggleType(type.nom)}
                                                    checked={selectedTypes.includes(type.nom)}
                                                />

                                                <span className="size-5">
                                                    {renderIcon(type.icone)}
                                                </span>
                                                {translation?.t(type.nom)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    }
                </nav>
            </div>
        </div>
    );
};

export default SideNavBarSearch;
