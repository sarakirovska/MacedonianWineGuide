import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WineryDetailsPage from "./pages/WineryDetailsPage";
import MapPage from "./pages/MapPage";
import AllWineriesPage from "./pages/AllWineriesPage";


const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/map" element={<MapPage />} />
                <Route path="/wineries" element={<AllWineriesPage />} />
                <Route path="/winery/:id" element={<WineryDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
