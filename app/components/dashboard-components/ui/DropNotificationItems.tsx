import React from 'react';
import {useNotificationContext} from "@/app/[lng]/hooks";


const DropProfileItems: React.FC = () => {
    const {items, setItems} = useNotificationContext();

    function handleMouseEnter(index: number) {
        const newItems = items.map((item: any, i: number) => {
            if (i === index) {
                return {...item, state: false};
            }
            return item;
        });
        setItems(newItems);
    }

    return (
        <div
            className="fixed sm:absolute right-8 mt-2 h-auto max-h-96 w-72 flex-col rounded-sm border stroke-1 bg-white shadow sm:w-80 block overflow-y-auto">
            <div className="px-4 py-3">
                <h5 className="text-sm font-medium text-[#8a99af]">Notification</h5></div>
            <ul className="flex h-auto flex-col">
                {items.map((item: any, index: number) => (
                    <li key={index} className={item.state ? "" : ""}>
                        <div className="relative">
                            {item.state && (
                                <span
                                    className="absolute top-5 left-1 z-10 h-2 w-2 rounded-full bg-red-600"></span>
                            )}
                            <a
                                className="flex flex-col gap-2.5 border-t stroke-1 px-4 py-3 text-[#64748b] hover:bg-[#f1f5f9]"
                                href="#"
                                onMouseEnter={() => handleMouseEnter(index)}>
                                <p className="text-sm">
                                    <span className="text-black">{item.title}</span>
                                    <span>{item.description}</span>
                                </p>
                                <p className="text-xs">{item.date}</p>
                            </a>
                        </div>
                    </li>
                ))}


                <li><a
                    className="flex flex-col gap-2.5 border-t stroke-1 px-4 py-3 hover:bg-[#f1f5f9] text-[#64748b]"
                    href="#">
                    <p className="text-sm">
                        <span className="text-black">Edit your information in a swipe</span>
                        <span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                    </p>
                    <p className="text-xs">12 May, 2025</p></a></li>
                <li><a
                    className="flex flex-col gap-2.5 border-t stroke-1 px-4 py-3 hover:bg-[#f1f5f9] text-[#64748b]"
                    href="#">
                    <p className="text-sm">
                        <span className="text-black">Edit your information in a swipe</span>
                        <span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                    </p>
                    <p className="text-xs">12 May, 2025</p></a></li>
                <li><a
                    className="flex flex-col gap-2.5 border-t stroke-1 px-4 py-3 hover:bg-[#f1f5f9] text-[#64748b]"
                    href="#">
                    <p className="text-sm">
                        <span className="text-black">Edit your information in a swipe</span>
                        <span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                    </p>
                    <p className="text-xs">12 May, 2025</p></a></li>
                <li><a
                    className="flex flex-col gap-2.5 border-t stroke-1 px-4 py-3 hover:bg-[#f1f5f9] text-[#64748b]"
                    href="#">
                    <p className="text-sm">
                        <span className="text-black">Edit your information in a swipe</span>
                        <span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                    </p>
                    <p className="text-xs">12 May, 2025</p></a></li>
            </ul>
        </div>
    );
};

export default DropProfileItems;
