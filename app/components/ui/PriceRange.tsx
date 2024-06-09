import {useState} from 'react';
import {useTranslationContext} from "@/app/[lng]/hooks";

const PriceRange = ({maxPrice, minPrice}: { maxPrice: number, minPrice: number }) => {
    const [maxPriceChange, setMaxPriceChange] = useState(maxPrice);
    const {translation} = useTranslationContext();

    const handleMaxPriceChange = (event: { target: { value: any; }; }) => {
        setMaxPriceChange(Number(event.target.value));
    };

    return (
        <div className="w-[80%] ml-4">
            <div className="flex flex-col gap-2">
                <div className="flex">
                    De <span className="text-sm text-white ml-2 mr-2">${minPrice} </span> à <span
                    className="text-sm text-white ml-2">${maxPriceChange}</span>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={maxPriceChange}
                        onChange={handleMaxPriceChange}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceRange;
