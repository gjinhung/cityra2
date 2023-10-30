import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EditBookingModal from "../EditBookingModal";
import DeleteBookingModal from "../DeleteBookingModal";
import OpenModalButton from "../OpenModalButton";
import './MyBookings.css'


export default function MyBookings() {
    const bookings = useSelector((state) => state.bookings)
    const booking_ids = useSelector((state) => state.session.user.booking_ids)
    const cities = useSelector((state) => state.cities)
    const normalizedBookingIds = Object.values(booking_ids)
    const users = useSelector((state) => state.users)
    const history = useHistory()

    let pastBookings_ids = []
    let upcomingBooking_ids = []

    normalizedBookingIds.forEach((booking_id) => {
        if (bookings[booking_id].complete) {
            pastBookings_ids.push(booking_id)
        } else {
            upcomingBooking_ids.push(booking_id)
        }
    })

    function convertDate(data) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const date = new Date(data);
        const day = days[date.getDay()];
        const num = date.getDate()
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}, ${month} ${num}, ${year}`;

    }

    function convertTime(time) {
        const hours = time.substring(0, 2);
        const minutes = time.substring(3, 5)
        // const milliseconds = time.substring(6, 8)

        const twelveHours = hours % 12;

        let amPm = (hours >= 12) ? "PM" : "AM"

        let formattedTime = twelveHours + ":" + minutes + ' ' + amPm

        return formattedTime
    }

    let showUpcoming

    if (!upcomingBooking_ids.length) {
        showUpcoming = (
            <h3>
                No Upcoming Tours
            </h3>
        )
    } else {
        showUpcoming = (
            upcomingBooking_ids.length && upcomingBooking_ids.map((booking_id, idx) => {
                return (
                    <div className='wrapper' key={idx}>
                        <div className="texts">
                            <div className="timeDate-container">
                                <h4 className="timeDate" >
                                    {convertDate(bookings[booking_id].date)} at {convertTime(bookings[booking_id].start_time)}
                                </h4>
                            </div>
                        </div>
                        <div className="image">
                            <img
                                src={users[bookings[booking_id].tour_guide_id].profile_pic}
                                className='guide_img'
                                alt={booking_id}
                                key={idx}
                                onClick={() => history.push(`/guide/${bookings[booking_id].tour_guide_id}`)} />
                            <div className="content">

                                <div>Guide Name: {users[bookings[booking_id].tour_guide_id].first_name}</div>
                                < br />
                                <div>{cities[bookings[booking_id].tour.city_id].city}</div>
                                <br />
                                <div className="button-container">
                                    <button
                                        className="tours-buttons"
                                        onClick={() => history.push(`/guide/${bookings[booking_id].tour_guide_id}`)}>
                                        View
                                    </button>

                                    <OpenModalButton
                                        buttonText="Update"
                                        modalComponent={
                                            <EditBookingModal booking={bookings[booking_id]} />
                                        }
                                        className={'tours-buttons'}
                                    />
                                    <OpenModalButton
                                        buttonText="Cancel Tour"
                                        modalComponent={
                                            <DeleteBookingModal booking_id={booking_id} />
                                        }
                                        className={'tours-buttons'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    let showPrev

    if (!pastBookings_ids.length) {
        showPrev = (
            <h3>
                No Previous Tours
            </h3>
        )
    } else {
        showPrev = (
            pastBookings_ids.length && pastBookings_ids.map((booking_id, idx) => {
                return (
                    <div className='wrapper' key={idx}>
                        <div className="texts">
                            <div className="timeDate-container">
                                <h4 className="timeDate" >
                                    {convertDate(bookings[booking_id].date)} at {convertTime(bookings[booking_id].start_time)}
                                </h4>
                            </div>
                        </div>
                        <div className="image">
                            <img
                                src={users[bookings[booking_id].tour_guide_id].profile_pic}
                                className='guide_img'
                                alt={booking_id}
                                key={idx}
                            />
                            <div className="content"
                                onClick={() => history.push(`/guide/${bookings[booking_id].tour_guide_id}`)}>
                                <div>Guide Name: {users[bookings[booking_id].tour_guide_id].first_name}</div>
                                < br />
                                <div>{cities[bookings[booking_id].tour.city_id].city}</div>
                            </div>
                        </div>
                    </div>

                )
            })
        )
    }


    return (
        <>
            <h2>Upcoming Tours</h2>
            <div className="scroll-container">
                {showUpcoming}
            </div>
            <h2>Previous Tours</h2>
            <div className="scroll-container">
                {showPrev}
            </div>

        </>
    )
}