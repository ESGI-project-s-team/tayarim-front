"use client";
import React, {useState} from "react";
import {MdOutlinePhotoLibrary} from "react-icons/md";
import "../../../globals.css";
import NavBarSearch from "@/app/components/search-results-components/ui/NavBarSearch";
import ModalPhotos from "@/app/components/details-result/ModalPhotos";

const housing = {
    id: 1,
    titre: "Jolies petit endroit",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    prixParNuit: 100,
    adresseComplete: "85 rue de la république, Etampes, 91150, France",
    ville: "Etampes",
    codePostal: "91150",
    pays: "France",
    typeLogement: "Appartement",
    nombresDeChambres: 1,
    nombresDeLits: 1,
    nombresSallesDeBains: 1,
    capaciteMaxPersonne: 1,
    images: [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExNDMwMzYwMTI1NDgxMTkzNg%3D%3D/original/986f7910-d865-4d61-839a-f28237c6a9a5.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExNDMwMzYwMTI1NDgxMTkzNg%3D%3D/original/eadc511f-18e7-4419-8a8d-0e9eec52edc1.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/8a3a720a-c852-4141-a57b-b2028522756d.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExNDMwMzYwMTI1NDgxMTkzNg%3D%3D/original/01533603-194a-4109-beec-a288cfd67627.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/ea0bc1a5-19fe-426b-af35-786347e4f1bb.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/e05cf3ce-3d5b-4783-8b56-8824f157ef0d.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/c2dc8f05-7bb0-4937-bdc7-47cf49399060.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1114303601254811936/original/de7132f2-23c6-478a-8369-5817be4b76d1.jpeg?im_w=720",
    ]
};

const ListingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialImage, setInitialImage] = useState(null);

    const handleOpenModal = (image: any = null) => {
        setInitialImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setInitialImage(null);
    };

    return (
        <>
            <NavBarSearch/>
            <div className="max-w-7xl mx-auto p-4 mt-28">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 relative">
                    <div className="sm:col-span-2 sm:row-span-2">
                        <img
                            src={housing.images[0] ?? 'https://via.placeholder.com/720'}
                            alt="Main Image"
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            onClick={() => handleOpenModal(housing.images[0])}
                        />
                    </div>
                    {housing.images.slice(1).map((src: string, index) => (
                        index < 4 && (
                            <div key={index} className="hidden sm:block">
                                <img
                                    src={src ?? 'https://via.placeholder.com/720'}
                                    alt={`Image ${index + 2}`}
                                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                                    onClick={() => handleOpenModal(src)}
                                />
                            </div>
                        )
                    ))}
                    <div className="absolute right-5 bottom-5">
                        <input
                            className="bg-white px-7 py-2 pl-8 rounded-lg font-bold text-sm cursor-pointer border border-black"
                            type="button"
                            value="Voir toutes les photos"
                            onClick={() => handleOpenModal()}
                        />
                        <div className="absolute top-2.5 left-2">
                            <MdOutlinePhotoLibrary/>
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4 mt-20">{housing.titre}</h1>
            </div>
            {isModalOpen &&
                <ModalPhotos images={housing.images} initialImage={initialImage} onClose={handleCloseModal}/>}
        </>
    );
};

export default ListingPage;

