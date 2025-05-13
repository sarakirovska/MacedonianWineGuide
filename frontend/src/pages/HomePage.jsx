import React, { useState, useEffect } from "react";
import WineryService from "../service/WineryService";
import { useNavigate } from 'react-router-dom';
import "../style/Home.css";

const HomePage = () => {
    const [randomWineries, setRandomWineries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        WineryService.getAllWineries()
            .then(response => {
                const randomWineries = response.data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setRandomWineries(randomWineries);
            })
            .catch(error => console.error("Error fetching wineries", error));
    }, []);

    const handleWineryClick = (wineryId) => {

        navigate(`/winery/${wineryId}`);
    };

    return (
        <div className="home-page">
            <section className="hero">
                <h1>Welcome to Macedonian Wine Guide</h1>
                <p>Explore their wines and enjoy an unforgettable journey through our wine culture.</p>
            </section>

            <section className="random-wineries">
                <h2>Discover Some of Our Featured Wineries</h2>
                <div className="wineries-list">
                    {randomWineries.map((winery) => (
                        <div key={winery.id} onClick={() => handleWineryClick(winery.id)}>
                            <img src={winery.images[0]} alt={winery.name} />
                            <h3>{winery.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
