import React, {useState} from "react";
import CardServices from "@/app/components/ui/CardServices";
import "../globals.css";
import {useTranslationContext} from "@/app/[lng]/hooks";
import {Tab} from "@headlessui/react";


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


const OurServices: React.FC = () => {
    const {translation} = useTranslationContext();
    let [categories] = useState<Record<any, React.FC>>({
        Traveler: (translation: any) => (
            <div>
                <div>
                    <h2 className="text-3xl font-bold">{translation?.t('traveler')}</h2>
                    <p className="text-gray-500 mt-4">We provide the best services for our traveler</p>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-5  ">
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                </div>
            </div>
        ),
        Owner: (translation: any) => (
            <div>
                <div>
                    <h2 className="text-3xl font-bold">{translation?.t('owner')}</h2>
                    <p className="text-gray-500 mt-4">We provide the best services for our traveler</p>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-5">
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                    <CardServices title="Room Reservation"
                                  description="We provide the best services for our customers"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"/>
                                  </svg>
                                  }/>
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="py-20">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">{translation?.t('nav_services')}</h2>
                    <p className="text-gray-500 mt-4">We provide the best services for our customers</p>
                </div>
                <div className="lg:flex-col text-center justify-center flex-wrap px-10">
                    <div className="lg:w-1/2 mx-auto my-auto mt-10">
                        <Tab.Group>
                            <Tab.List
                                className="flex justify-center space-x-1 rounded-xl bg-blue-900/20 p-1 max-w-xl mx-auto ">
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({selected}: { selected: boolean } ) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                'ring-white/60 ring-offset-2 focus:outline-none text-black ',
                                                selected
                                                    ? 'bg-white shadow'
                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        {category === 'Traveler' ? translation?.t('traveler') : translation?.t('owner')}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-10">
                                {Object.values(categories).map((posts, idx) => (
                                    <Tab.Panel
                                        key={idx}
                                        className={classNames(
                                            'rounded-xl bg-white p-3',
                                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        {posts(
                                            translation
                                        )}
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OurServices;