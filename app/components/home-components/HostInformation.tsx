import React from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";
import "../../globals.css";


const HostInformation: React.FC = () => {
    const {translation} = useTranslationContext();
    return (
        <div className="flex-col justify-center lg:mx-20 mt-10">
            <div className="text-center">
                <h2 className="text-4xl font-bold">{translation?.t('host-title')}</h2>
                <p className="text-gray-500 mt-4">{translation?.t('host-description')}</p>
            </div>
            <div className="bg-white  rounded-3xl shadow-lg  mt-10">
                <div className="py-10 ">
                    <div className=" lg:flex text-center justify-evenly lg:px-10 ">
                        <div
                            className=" bg-custom-search shadow-lg rounded-3xl mx-5 p-6 h-min flex justify-evenly lg:min-w-96
                             border-4 border-white ring-[#e3e3e3] ring-2">
                            <div>
                                <div className="relative ">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/host.webp"
                                        alt="host"
                                        className="rounded-full min-w-32 h-32"
                                    />
                                    <div className="absolute bottom-0 right-0 rounded-full p-2 "
                                         style={{backgroundColor: "#ff385c"}}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 32 32"
                                            aria-label="Hôte vérifié"
                                            role="img"
                                            focusable="false"
                                            className="w-6 text-white"
                                            style={{fill: "white"}}
                                        >
                                            <path
                                                d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm7 9.08-9.5 9.5-4.5-4.5L6.88 17l6.62 6.62L25.12 12 23 9.88z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-center mt-4">Yaron</h3>
                                <div className="flex  justify-center text-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true"
                                         role="presentation" focusable="false" className="w-4"
                                    >
                                        <path
                                            d="m8.5 7.6 3.1-1.75 1.47-.82a.83.83 0 0 0 .43-.73V1.33a.83.83 0 0 0-.83-.83H3.33a.83.83 0 0 0-.83.83V4.3c0 .3.16.59.43.73l3 1.68 1.57.88c.35.2.65.2 1 0zm-.5.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"></path>
                                    </svg>
                                    <p className="text-gray-500 text-center ml-1">{translation?.t('superhost')}</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">20</h2>
                                <p className="text-gray-500  text-sm">{translation?.t('evaluation')}</p>
                                <hr className="border-gray-300 mt-2"/>
                                <h2 className="text-3xl font-bold mt-2">4.95</h2>
                                <p className="text-gray-500  text-sm">{translation?.t('overall-ratings')}</p>
                                <hr className="border-gray-300 mt-2"/>
                                <h2 className="text-3xl font-bold mt-2">2</h2>
                                <p className="text-gray-500  text-sm">{translation?.t('experience')}</p>
                            </div>
                        </div>
                        <div
                            className=" bg-custom-search shadow-lg rounded-3xl  p-6 h-min flex mt-5 lg:mt-0
                            lg:min-w-96 lg:max-w-xl flex-col border-4 border-white ring-[#e3e3e3] ring-2 mx-5 lg:mx-0">
                            <div className="overflow-auto h-52">
                                <div>
                                    <p className="mb-4 font-bold">{translation?.t('text-1')}</p>
                                    <p>{translation?.t('text-2')}</p>
                                    <br/>
                                    <p>{translation?.t('text-3')}</p>
                                    <br/>
                                    <p>{translation?.t('text-4')}</p>
                                    <br/>
                                    <p>{translation?.t('text-5')}</p>
                                    <br/>
                                    <p className="font-bold">Yaron - Tayarim</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HostInformation;