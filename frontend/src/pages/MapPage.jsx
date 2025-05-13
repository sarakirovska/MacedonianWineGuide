import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import WineryService from "../service/WineryService";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import "../style/MapPage.css";


import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage = () => {
    const [wineries, setWineries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        WineryService.getAllWineries()
            .then(response => setWineries(response.data))
            .catch(error => console.error("Error fetching wineries", error));
    }, []);

    return (
        <div className="map-page">
            <MapContainer
                center={[41.6086, 21.7453]}
                zoom={8}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {wineries.map((winery) => (
                    <Marker
                        key={winery.id}
                        position={[winery.latitude, winery.longitude]}
                    >
                        <Popup>
                            <div className="popup-content">
                                <h4>{winery.name}</h4>
                                <p>{winery.location}</p>
                                <button
                                    onClick={() => navigate(`/winery/${winery.id}`)}
                                    className="details-button"
                                >
                                    View Details
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapPage;
