import React from 'react';
import {useTranslationContext} from "@/app/[lng]/hooks";

const ListResultsHousing: React.FC = () => {
    const housing = [
        {
            id: 1,
            title: "Housing 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: 100,
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            title: "Housing 2",
            description: "bla bla Description 2",
            price: 200,
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            title: "Housing 3",
            description: "Description 3",
            price: 300,
            image: "https://via.placeholder.com/150"
        }
    ];

    const {translation} = useTranslationContext();

    return (
        <div className="lg:mr-7 mr-2 z-0 overflow-scroll mt-10">
            <div className="relative w-full flex">
                <div className="flex flex-col gap-2 w-full">
                    {housing.map(item => (
                        <div key={item.id}
                             className="flex flex-col sm:flex-row border border-gray-300 rounded-lg p-4 mb-5 bg-white">
                            <img src={item.image} alt={item.title}
                                 className="w-full md:w-48 h-48 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"/>
                            <div className="flex flex-col  w-full">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                                    <button
                                        className="hidden sm:block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 self-start">
                                        Voir les details
                                    </button>
                                </div>
                                <div className="max-h-20 overflow-y-auto mb-4 sm:mb-0 sm:mt-5">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                                <button
                                    className="block sm:hidden bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 self-start  ">
                                    Voir les details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListResultsHousing;
