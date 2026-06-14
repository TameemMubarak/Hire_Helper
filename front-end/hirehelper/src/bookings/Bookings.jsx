import { useEffect, useState }
from "react";

import axios from "axios";

function Bookings() {

    const [bookings,
        setBookings] =
        useState([]);

    useEffect(() => {

        loadBookings();

    }, []);

    async function loadBookings() {

        const response =
            await axios.get(
                "http://localhost:8080/booking/user@gmail.com"
            );

        setBookings(
            response.data
        );
    }

    return (

        <div>

            <h1>
                My Bookings
            </h1>

            {
                bookings.map(
                    booking => (

                        <div
                            key={booking.id}
                        >

                            Booking #
                            {booking.id}

                            <br/>

                            Status:
                            {booking.status}

                        </div>

                    )
                )
            }

        </div>
    );
}

export default Bookings;