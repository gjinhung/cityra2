import React from "react";
import { NavLink } from "react-router-dom";

export default function SuccessfullBooking() {
    return (
        <>
            Booking Complete
            <NavLink exact to="/dashboard" className="personalpage-button">
                See All Bookings
            </NavLink>
        </>
    )
}