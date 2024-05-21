import React from "react";
import {useTranslationContext} from "@/app/[lng]/hooks";
import "../../globals.css";
import {Disclosure, Transition} from "@headlessui/react";
import {ChevronRightIcon} from "@heroicons/react/16/solid";


const FrequentlyAskedQuestions: React.FC = () => {
    const {translation} = useTranslationContext();
    return (
        <div className="flex-col justify-center lg:mx-20 mt-20 mx-2 ">
            <div className="text-center">
                <h2 className="text-4xl font-bold">{translation?.t('faq-title')}</h2>
                <p className="text-gray-500 mt-4">{translation?.t('faq-description')}</p>
            </div>
            <div className="bg-white rounded-3xl shadow-lg mt-10 ">
                <div className="w-full">

                    <div className="lg:flex grid grid-cols-1  lg:justify-evenly  py-10 rounded-3xl
                        text-2xl text-black">
                        <div>
                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <div className="flex-col  py-5">
                                            <Disclosure.Button
                                                className="flex w-full rounded-lg px-4 text-left  font-medium focus:outline-none items-center ">
                                                <ChevronRightIcon
                                                    className={`${
                                                        open ? 'rotate-90 transform' : ''
                                                    } h-auto w-7 text-black`}
                                                />
                                                <span>{translation?.t('question-1')}</span>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-200 ease-out"
                                                enterFrom="transform scale-90 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-150 ease-in"
                                                leaveFrom="transform scale-90 opacity-0"
                                                leaveTo="transform scale-100 opacity-0"
                                            >
                                                <div className="w-full flex ">
                                                    <Disclosure.Panel
                                                        className="text-sm text-gray-500 max-w-lg ml-10 pt-5 ">
                                                        {translation?.t('answer-1')}
                                                    </Disclosure.Panel>
                                                </div>

                                            </Transition>
                                        </div>


                                    </>
                                )}
                            </Disclosure>
                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <div className="flex-col  py-5">

                                            <Disclosure.Button
                                                className="flex w-full rounded-lg px-4 text-left  font-medium focus:outline-none items-center ">
                                                <ChevronRightIcon
                                                    className={`${
                                                        open ? 'rotate-90 transform' : ''
                                                    } h-auto w-7 text-black`}
                                                />
                                                <span>{translation?.t('question-2')}  </span>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-200 ease-out"
                                                enterFrom="transform scale-90 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-150 ease-in"
                                                leaveFrom="transform scale-90 opacity-0"
                                                leaveTo="transform scale-100 opacity-0"
                                            >
                                                <div className="w-full flex ">
                                                    <Disclosure.Panel
                                                        className="text-sm text-gray-500 max-w-lg ml-10 pt-5 ">
                                                        {translation?.t('answer-2')}
                                                    </Disclosure.Panel>
                                                </div>

                                            </Transition>
                                        </div>


                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div>
                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <div className="flex-col  py-5">

                                            <Disclosure.Button
                                                className="flex w-full rounded-lg px-4 text-left  font-medium focus:outline-none items-center ">
                                                <ChevronRightIcon
                                                    className={`${
                                                        open ? 'rotate-90 transform' : ''
                                                    } h-auto w-7 text-black`}
                                                />
                                                <span>{translation?.t('question-3')}</span>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-200 ease-out"
                                                enterFrom="transform scale-90 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-150 ease-in"
                                                leaveFrom="transform scale-90 opacity-0"
                                                leaveTo="transform scale-100 opacity-0"
                                            >
                                                <div className="w-full flex ">
                                                    <Disclosure.Panel
                                                        className="text-sm text-gray-500 max-w-lg ml-10 pt-5 ">
                                                        {translation?.t('answer-3')}
                                                    </Disclosure.Panel>
                                                </div>

                                            </Transition>
                                        </div>


                                    </>
                                )}
                            </Disclosure>
                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <div className="flex-col  py-5">

                                            <Disclosure.Button
                                                className="flex w-full rounded-lg px-4 text-left  font-medium focus:outline-none items-center ">
                                                <ChevronRightIcon
                                                    className={`${
                                                        open ? 'rotate-90 transform' : ''
                                                    } h-auto w-7 text-black`}
                                                />
                                                <span>{translation?.t('question-4')}</span>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-200 ease-out"
                                                enterFrom="transform scale-90 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-150 ease-in"
                                                leaveFrom="transform scale-90 opacity-0"
                                                leaveTo="transform scale-100 opacity-0"
                                            >
                                                <div className="w-full flex ">
                                                    <Disclosure.Panel
                                                        className="text-sm text-gray-500 max-w-lg ml-10 pt-5 ">
                                                        {translation?.t('answer-4')}
                                                    </Disclosure.Panel>
                                                </div>

                                            </Transition>
                                        </div>


                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FrequentlyAskedQuestions;