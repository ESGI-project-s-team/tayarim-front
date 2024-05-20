import React, {useState} from "react";
import CardServices from "@/app/components/home-components/CardServices";
import "../../globals.css";
import {useTranslationContext} from "@/app/[lng]/hooks";
import {Tab, Transition} from "@headlessui/react";


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


const OurServices: React.FC = () => {
    const {translation} = useTranslationContext();
    const [selectedIndex, setSelectedIndex] = useState(0);
    let [categories] = useState<Record<any, React.FC>>({
        Traveler: (translation: any) => (
            <div>
                <div>
                    <h2 className="text-3xl font-bold">{translation?.t('traveler')}</h2>
                    <p className="text-gray-500 mt-4">{translation?.t('traveler-description')}</p>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-5  ">

                    <CardServices title={translation?.t('clean-services')}
                                  description={translation?.t('clean-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/cleaning.svg"} alt="cleaning logo" width="80"/>}/>
                    <CardServices title={translation?.t('host-services')}
                                  description={translation?.t('host-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/host.svg"} alt="host logo" width="80"/>}/>
                    <CardServices title={translation?.t('properties-services')}
                                  description={translation?.t('properties-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/properties.svg"} alt="properties logo" width="80"/>}/>

                    <CardServices title={translation?.t('price-services')}
                                  description={translation?.t('price-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/price.svg"} alt="price logo" width="80"/>}/>
                </div>
            </div>
        ),
        Owner: (translation: any) => (
            <div>
                <div>
                    <h2 className="text-3xl font-bold">{translation?.t('owner')}</h2>
                    <p className="text-gray-500 mt-4">{translation?.t('owner-description')}</p>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-5">
                    <CardServices title={translation?.t('picture-services')}
                                  description={translation?.t('picture-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/picture.svg"} alt="picture logo" width="80"/>}/>
                    <CardServices title={translation?.t('dashboard-services')}
                                  description={translation?.t('dashboard-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/dashboard.svg"} alt="dashboard logo" width="80"/>}/>
                    <CardServices title={translation?.t('maintenance-services')}
                                  description={translation?.t('maintenance-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/maintenance.svg"} alt="maintenance logo" width="80"/>}/>
                    <CardServices title={translation?.t('clean-services')}
                                  description={translation?.t('clean-services-description')}
                        /* eslint-disable-next-line @next/next/no-img-element */
                                  icon={<img src={"/cleaning.svg"} alt="cleaning logo" width="80"/>}/>
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="py-10">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">{translation?.t('nav_services')}</h2>
                    <p className="text-gray-500 mt-4">{translation?.t('services_description')}</p>
                </div>
                <div
                    className="lg:flex-col text-center justify-center flex-wrap bg-white
                    shadow-lg py-5 pb-7 lg:mx-20 mx-2 rounded-3xl mt-10">
                    <div className="max-w-4xl mx-auto my-auto ">
                        <Tab.Group
                            selectedIndex={selectedIndex}
                            onChange={setSelectedIndex}
                        >
                            <Tab.List
                                className="flex justify-center space-x-1 rounded-xl bg-custom-search  p-1  sm:mx-auto max-w-xl mx-2 ">
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({selected}: { selected: boolean }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                'ring-white/60  focus:outline-none text-black ring-red-600',
                                                selected
                                                    ? 'bg-white shadow border-black border'
                                                    : 'text-black hover:bg-white/[0.3]'
                                            )
                                        }
                                    >
                                        {category === 'Traveler' ? translation?.t('traveler') : translation?.t('owner')}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-5 rounded-xl">
                                {Object.values(categories).map((posts, idx) => (
                                    <Tab.Panel
                                        key={idx}
                                        className={classNames(
                                            'rounded-3xl p-5 ',
                                            ' focus:outline-none '
                                        )}
                                    >
                                        <Transition
                                            appear
                                            show={selectedIndex === idx}
                                            enter="transition-all duration-500 ease-in-out"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="transition-all duration-500 ease-in-out"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                            as="div"
                                            className="transition-all duration-100"
                                        >
                                            {posts(
                                                translation
                                            )}
                                        </Transition>
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