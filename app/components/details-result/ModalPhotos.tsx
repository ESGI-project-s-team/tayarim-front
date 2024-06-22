"use client";
import React, {useState} from "react";
import {IoIosClose} from "react-icons/io";

const ModalPhotos = ({images, initialImage, onClose}: {
    images: string[];
    initialImage: string | null;
    onClose: () => void;

}) => {
    const [enlargedPhoto, setEnlargedPhoto] = useState(initialImage);

    const handlePhotoClick = (src: string) => {
        setEnlargedPhoto(src);
    };

    const handleCloseEnlargedPhoto = () => {
        setEnlargedPhoto(null);
        if (initialImage)
            onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="w-full h-full bg-white px-4 pb-4 relative overflow-y-auto ">
                <div className="sticky top-0   flex justify-between items-center   z-0  mt-5 bg-white align-middle">
                    <h2 className="text-lg font-bold">Photos</h2>
                    <IoIosClose onClick={onClose} size={35} className="cursor-pointer"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((image: any, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            className="w-full h-80 object-cover rounded-lg cursor-pointer"
                            onClick={() => handlePhotoClick(image.url)}
                        />
                    ))}
                </div>
            </div>
            {enlargedPhoto && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4
                    bg"
                    onClick={handleCloseEnlargedPhoto}
                >
                    <div
                        className="w-full h-full  px-8 py-4
                        rounded-lg overflow-auto flex items-center justify-center relative bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IoIosClose
                            onClick={handleCloseEnlargedPhoto}
                            size={35}
                            className="cursor-pointer absolute top-6 right-6 bg-white rounded-full "
                        />
                        <img src={enlargedPhoto} alt="Enlarged"
                             className="max-w-full max-h-full object-contain rounded-lg"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalPhotos;
