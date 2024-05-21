import React from "react";
import {useIsErrorContext, useTranslationContext} from "@/app/[lng]/hooks";

interface ErrorsManagementProps {
    data: any;
}

const ErrorsManagement: React.FC<ErrorsManagementProps> = (data: any) => {
    const {translation} = useTranslationContext();
    const {setError} = useIsErrorContext();

    function handleClose() {
        setError(null)
    }

    return (
        <div className=" lg:ml-80 lg:mr-7 mr-2 ml-14  right-0 absolute z-50 top-32">
            <div className="relative  flex justify-end mb-2">
                <div className="bg-red-100 flex p-5 rounded text-red-600">
                    <div className="flex-col">
                        <strong className="font-bold">{translation?.t("error")}</strong>
                        <div>
                            {data.data?.map((error: any, index: any) => (
                                <div key={index} className="block sm:inline">
                                    {translation?.t(error)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <span className="relative cursor-pointer"
                          onClick={handleClose}>
                  <svg
                      className="fill-current h-6 w-6 text-red-600"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                    />
                  </svg>
                </span>
                </div>
            </div>
        </div>
    );
}
export default ErrorsManagement;


