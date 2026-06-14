import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./providerProfile.css";

function ProviderProfile() {

    const { id } = useParams();

    const [provider, setProvider] = useState(null);

    useEffect(() => {
        loadProvider();
    }, []);

    async function loadProvider() {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    `http://localhost:8080/provider/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setProvider(response.data);

        } catch (error) {

            console.error(error);
        }
    }

    if (!provider) {

        return (
            <div className="loading">
                Loading Provider...
            </div>
        );
    }


    async function bookHelper() {

    try {

        await axios.post(
            "http://localhost:8080/booking",
            {
                userEmail:
                    "user@gmail.com",

                providerId:
                    provider.id
            }
        );

        alert(
            "Booking Created Successfully"
        );

    } catch(error) {

        console.error(error);
    }
}

    return (

        <div className="provider-page">

            <div className="provider-banner">

                <img
                    src={
                        provider.imageUrl ||
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=500"
                    }
                    alt={provider.name}
                    className="provider-profile-image"
                />

                <h1>
                    {provider.name}
                </h1>

                <span className="provider-skill">
                    {provider.skill}
                </span>

            </div>

            <div className="provider-details">

                <div className="detail-card">

                    <h3>Location</h3>

                    <p>
                        {provider.location}
                    </p>

                </div>

                <div className="detail-card">

                    <h3>Experience</h3>

                    <p>
                        {provider.experience}
                        {" "}
                        Years
                    </p>

                </div>

                <div className="detail-card">

                    <h3>Rating</h3>

                    <p>
                        ⭐ {provider.rating}
                    </p>

                </div>

                <div className="detail-card">

                    <h3>Email</h3>

                    <p>
                        {provider.email}
                    </p>

                </div>

                <div className="detail-card">

                    <h3>Phone</h3>

                    <p>
                        {provider.phone}
                    </p>

                </div>

            </div>

            <div className="booking-section">

                <button className="book-btn"
                 onClick={bookHelper}
                >
                    Book This Helper
                </button>

            </div>

        </div>
    );
}

export default ProviderProfile;