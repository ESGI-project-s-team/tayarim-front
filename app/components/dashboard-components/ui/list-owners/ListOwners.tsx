import React, {useEffect} from 'react';
import {getAllOwnersInFun} from "@/app/components/dashboard-components/ui/list-owners/action";


const ListOwners: React.FC = () => {
    const [owners, setOwners] = React.useState([]);
    useEffect(() => {
        getAllOwnersInFun()
            .then((response) => {
                setOwners(response);
            });
    }, []);
    return (
        <div className="h-screen lg:ml-80 lg:mr-7 mr-2 ml-14 z-0 ">
            <div className="relative top-32 w-full flex justify-end mb-2">
                <button
                    className="flex items-center gap-2 rounded bg-[#3c50e0] px-4 py-2 font-medium text-sm text-white hover:bg-opacity-80">
                    <svg className="fill-current" width="13" height="13" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                            fill=""></path>
                    </svg>
                    Add Owner
                </button>
            </div>

            <div
                className=" relative rounded-sm border stroke-2 bg-white shadow  top-32 ">
                <div className="px-4 py-6 md:px-6 xl:px-7"><h4
                    className="text-xl font-semibold text-black">Owners</h4></div>
                <div
                    className="grid  border-t stroke-1 px-4 py-4  lg:grid-cols-9 grid-cols-10 md:px-6 2xl:px-7">
                    <div className="col-span-2  items-center hidden lg:flex "><p className="font-medium">Owner Name</p>
                    </div>
                    <div className="col-span-2  items-center flex"><p className="font-medium">E-mail</p>
                    </div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2 flex items-center"><p className="font-medium">Phone</p></div>
                    <div className="col-span-1 lg:hidden items-center flex"></div>
                    <div className="col-span-2 flex items-center"><p className="font-medium">House</p></div>
                </div>
                {owners.map((owner: any, index: number) => (
                    <div
                        className="grid  border-t stroke-2 px-4 py-4 grid-cols-10 lg:grid-cols-9 md:px-6 2xl:px-7 "
                        key={index}>
                        <div className="col-span-2 hidden lg:flex items-center">
                            <div className="flex gap-4 flex-row items-center">
                                <p className="text-sm text-black">{owner.prenom} {owner.nom}</p></div>
                        </div>
                        <div className="col-span-2  items-center flex"><p
                            className="text-sm text-black w-20 overflow-scroll sm:w-fit ">{owner.email}</p></div>
                        <div className="col-span-1 lg:hidden items-center flex"></div>
                        <div className="col-span-2 flex items-center"><p
                            className="text-sm text-black">{owner.numTel}</p>
                        </div>
                        <div className="col-span-1 lg:hidden items-center flex"></div>
                        {owner.logements.length > 0 ?
                            <div
                                className="col-span-2  items-center flex-col text-[#3c50e0] hover:underline cursor-pointer">
                                {owner.logements.map((logement: any, index: number) => (
                                    <p key={index}>{logement.adresse}</p>
                                ))}
                            </div>
                            :
                            <div className="col-span-2  items-center ml-3 flex cursor-pointer ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-6 h-6 text-[#3c50e0]">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </div>
                        }
                        <div className="col-span-1 lg:hidden items-center flex"></div>
                        <div
                            className="col-span-1  items-center flex text-sm text-[#3c50e0] hover:underline cursor-pointer">
                            Edit
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-4 h-4 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListOwners;
