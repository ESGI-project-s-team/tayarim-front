import React, {useState, useEffect, useCallback} from 'react';

const PriceRange = ({
                        maxPrice,
                        minPrice,
                        currentMaxPrice,
                        currentMinPrice,
                        onMaxPriceChange,
                        onMinPriceChange
                    }: {
    maxPrice: number,
    minPrice: number,
    currentMaxPrice: number,
    currentMinPrice: number,
    onMaxPriceChange: (value: number) => void,
    onMinPriceChange: (value: number) => void
}) => {

    const getVals = useCallback(() => {
        const parent: any = document.querySelector('.range-slider');
        if (!parent) return; // Ensure parent is present
        const slides = parent.getElementsByTagName('input');
        let slide1 = parseFloat(slides[0].value);
        let slide2 = parseFloat(slides[1].value);
        if (slide1 > slide2) {
            const tmp = slide2;
            slide2 = slide1;
            slide1 = tmp;
        }

        const percentage1 = ((slide1 - minPrice) / (maxPrice - minPrice)) * 100;
        const percentage2 = ((slide2 - minPrice) / (maxPrice - minPrice)) * 100;
        parent.style.background = `linear-gradient(to right, #fff ${percentage1}%, blue ${percentage1}%, blue ${percentage2}%, #fff ${percentage2}%)`;
    }, [minPrice, maxPrice]);

    useEffect(() => {
        // Initialize sliders on mount
        const sliders: any = document.querySelectorAll('.range-slider input[type="range"]');
        sliders.forEach((slider: { oninput: () => void; }) => {
            slider.oninput = getVals;
            slider.oninput(); // Trigger initial display
        });
    }, [getVals]);

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value >= currentMinPrice) {
            onMaxPriceChange(value);
            getVals();
        }
    };

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value <= currentMaxPrice) {
            onMinPriceChange(value);
            getVals();
        }
    };

    return (
        <div className="w-[80%] ml-4">
            <div className="flex flex-col">
                <div className="flex mb-2">
                    <span>
                        {currentMinPrice} - {currentMaxPrice}
                    </span>
                </div>
                <section className="range-slider relative w-full">
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={currentMaxPrice}
                        step="5"
                        onChange={handleMaxPriceChange}
                        className="absolute pointer-events-auto"
                    />
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={currentMinPrice}
                        step="5"
                        onChange={handleMinPriceChange}
                        className="absolute pointer-events-auto"
                    />
                </section>
            </div>
        </div>
    );
};

export default PriceRange;
