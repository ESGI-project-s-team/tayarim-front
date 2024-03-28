import React from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";
import "../globals.css";


const HostInformation: React.FC = () => {
    const {translation} = useTranslationContext();
    return (
        <div className=" flex-col justify-center max-w-7xl  mx-auto">
            <div className="py-5 bg-white  rounded-3xl shadow-lg ">
                <div className="text-center mt-7">
                    <h2 className="text-4xl font-bold">Host at your service</h2>
                    <p className="text-gray-500 mt-4">We provide the best services for our customers</p>
                </div>
                <div className="pt-14 ">
                    <div className=" lg:flex text-center justify-evenly lg:px-10 ">
                        <div
                            className=" bg-custom-search shadow-lg rounded-3xl mx-5 p-6 h-min flex justify-evenly lg:min-w-96">
                            <div>
                                <div className="relative ">
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
                                    <p className="text-gray-500 text-center ml-1">Superhôte</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">20</h2>
                                <p className="text-gray-500  text-sm">évaluations</p>
                                <hr className="border-gray-300 mt-2"/>
                                <h2 className="text-3xl font-bold mt-2">4.95</h2>
                                <p className="text-gray-500  text-sm">en notes globale</p>
                                <hr className="border-gray-300 mt-2"/>
                                <h2 className="text-3xl font-bold mt-2">2</h2>
                                <p className="text-gray-500  text-sm">années d'expérience</p>
                            </div>
                        </div>
                        <div
                            className=" bg-custom-search shadow-lg rounded-3xl mx-5 p-6 h-min flex mt-5 lg:mt-0  lg:min-w-96 lg:w-2/3 flex-col ">
                            <div className="overflow-auto h-52">
                                <div>
                                    <p className="mb-4 font-bold">Hey there !</p>
                                    <p>At Tayarim, we love nothing more than making sure my guests have the best
                                        possible experience while they're staying at my places.</p>
                                    <br/>
                                    <p>I've been hosting on Airbnb for a few months, and I've had
                                        the pleasure of welcoming guests from all over the world into my home. I
                                        take pride in providing a clean and comfortable space for my guests to relax
                                        and unwind.</p>
                                    <br/>
                                    <p>
                                        I believe that good communication is key to having a successful and enjoyable
                                        stay, so I always make sure to stay in touch with my guests throughout their
                                        stay and after they've left. So don't hesitate to reach out if you have any
                                        question or concern, I'm happy to help you in any way I can.
                                    </p>
                                    <br/>
                                    <p>So if you're looking for a beautiful home and a friendly and welcoming host who
                                        will go above and beyond to make sure you have a great time, you've come to the
                                        right place!</p>
                                    <br/>
                                    <p className="font-bold">Yaron from Tayarim</p>
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