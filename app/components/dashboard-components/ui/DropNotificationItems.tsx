import React from 'react';


const DropProfileItems: React.FC = () => {

    return (
        <div
            className="absolute right-8 mt-2 h-auto max-h-96 w-72 flex-col rounded-sm border stroke-1 bg-white shadow sm:w-80 block overflow-y-auto">
            <div className="px-4 py-3">
                <h5 className="text-sm font-medium text-[#8a99af]">Notification</h5></div>
            <ul className="flex h-auto flex-col">
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
