import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WineryService from "../service/WineryService";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import "../style/WineryDetails.css";

const WineryDetailsPage = () => {
    const { id } = useParams();
    const [winery, setWinery] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        WineryService.getWineryById(id)
            .then(response => setWinery(response.data))
            .catch(error => console.error("Error fetching winery details", error));
    }, [id]);

    if (!winery) return <div>Loading...</div>;


    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === winery.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? winery.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="winery-details">

            <div className="winery-header">
                <div className="winery-image">
                    <img
                        src="https://t3.ftcdn.net/jpg/01/35/87/92/360_F_135879274_4CgDcLaAwtfhIgLiSmqarh2H8krigOia.jpg"
                        alt="Winery"
                    />
                </div>
                <h2 className="winery-title">{winery.name}</h2>
            </div>


            <div className="winery-content">

                <div className="winery-gallery">
                    <div className="carousel-wrapper">
                        <button className="carousel-btn prev-btn" onClick={goToPreviousImage}>
                            &#10094;
                        </button>
                        <div className="carousel">
                            <div className="carousel-item">
                                <img
                                    src={winery.images[currentImageIndex]}
                                    alt={`${winery.name} image ${currentImageIndex + 1}`}
                                />
                            </div>
                        </div>
                        <button className="carousel-btn next-btn" onClick={goToNextImage}>
                            &#10095;
                        </button>
                    </div>
                </div>


                <div className="winery-details-info">
                    <p className="winery-description">{winery.description}</p>
                    <div className="winery-info">
                        <div className="info-item">
                            <FaMapMarkerAlt className="icon" />
                            <span>{winery.location}</span>
                        </div>
                        <div className="info-item">
                            <FaPhoneAlt className="icon" />
                            <span>{winery.phoneNumber}</span>
                        </div>
                        <div className="info-item">
                            <FaClock className="icon" />
                            <span>{winery.workingHours}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WineryDetailsPage;
