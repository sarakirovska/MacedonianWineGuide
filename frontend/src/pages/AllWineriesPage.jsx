import React, { useState, useEffect } from "react";
import WineryService from "../service/WineryService";
import { Link } from "react-router-dom";
import "../style/AllWineries.css";

const AllWineriesPage = () => {
    const [wineries, setWineries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredWineries, setFilteredWineries] = useState([]);

    useEffect(() => {
        WineryService.getAllWineries()
            .then(response => {
                setWineries(response.data);
                setFilteredWineries(response.data);
            })
            .catch(error => console.error("Error fetching wineries", error));
    }, []);


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setFilteredWineries(wineries);
        } else {

            WineryService.searchWineriesByName(value)
                .then(responseName => {

                    WineryService.searchWineriesByLocation(value)
                        .then(responseLocation => {

                            const combinedResults = [
                                ...responseName.data,
                                ...responseLocation.data
                            ];
                            const uniqueResults = Array.from(
                                new Map(combinedResults.map((item) => [item.id, item])).values()
                            );
                            setFilteredWineries(uniqueResults);
                        })
                        .catch(error => console.error("Error searching by location", error));
                })
                .catch(error => console.error("Error searching by name", error));
        }
    };

    return (
        <div className="all-wineries">
            <h2>Discover the Finest Wineries in Macedonia</h2>
            <p className="subtitle">
                Explore the rich flavors and breathtaking landscapes of Macedonian wineries.
                Scroll down to find your next wine-tasting adventure among the best local vineyards.
            </p>


            <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
            />

            <div className="wineries-list1">
                {filteredWineries.map((winery) => (
                    <Link to={`/winery/${winery.id}`} key={winery.id} className="winery-card">
                        {winery.images.length > 0 && (
                            <div className="winery-image">
                                <img src={winery.images[0]} alt={`${winery.name} image`} />
                            </div>
                        )}
                        <div className="winery-info">
                            <h3>{winery.name}</h3>
                            <p>{winery.location}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllWineriesPage;
