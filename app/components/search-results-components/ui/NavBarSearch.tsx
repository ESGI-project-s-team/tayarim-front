import React from 'react';
import LanguageDropdown from "@/app/components/ui/LanguageDropdown";
import Link from "next/link";
import {useTranslationContext} from "@/app/[lng]/hooks";


const NavBarSearch: React.FC = () => {
        const {translation} = useTranslationContext();
        return (
            <div className="fixed bg-white w-screen top-0 drop-shadow-xl z-10">
                <div className="flex flex-row-reverse justify-center sm:justify-start px-10 py-5 gap-10">
                    <div className="mt-0.5">
                        <LanguageDropdown
                            isOpen={false}
                        />
                    </div>

                    <Link className="p-2 rounded " href="/">
                        <div className="hover:font-medium ">{translation?.t('nav_home')}</div>
                    </Link>
                </div>
            </div>
        )
            ;
    }
;

export default NavBarSearch;
