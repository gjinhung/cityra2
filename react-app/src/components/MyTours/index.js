import React from "react";
import { useSelector } from "react-redux";
import adventure from '../../images/adventure.png'
import history from '../../images/history.png'
import food from '../../images/food.png'
import other from '../../images/other.png'
import './MyTours.css'
import OpenModalButton from "../OpenModalButton";
import EditTourModal from "../EditTourModal";
import DeleteTourModal from "../DeleteTourModal";
import { useHistory } from "react-router-dom";

export default function MyTours({ loaded }) {
    let hist = useHistory()
    const current_user = useSelector((state) => state.session.user)

    const user_tours_arr = useSelector((state) => state.users[current_user.id].tours_given_ids)
    const tours = useSelector((state) => state.tours)
    const cities = useSelector((state) => state.cities)
    const type = useSelector((state) => state.specialties)
    const languages = useSelector((state) => state.languages)

    function typeImg(img) {
        if (img.id === 3) {
            return adventure
        } else if (img.id === 1) {
            return food
        } else if (img.id === 2) {
            return history
        } else {
            return other
        }
    }

    if (!loaded) {
        return (
            <div className="loading-style">
                <div className='loading-font'>
                    Loading...
                </div>
            </div>
        )
    } if (current_user.student) {
        return (
            <div className="scroll-container">
                {user_tours_arr.map((tour_id, idx) => {
                    return (
                        <div key={idx}>
                            <div className="image toursicon" >
                                <img
                                    src={typeImg(type[tours[tour_id].specialties_id[0]])}
                                    className='guide_img'
                                    alt={tour_id}
                                    key={idx} />
                                <div className="content">
                                    <div>
                                        {type[tours[tour_id].specialties_id[0]].specialty}
                                    </div>
                                    <div>
                                        {cities[tours[tour_id].city_id].city}
                                    </div>
                                    <div>
                                        ${tours[tour_id].price}/hr
                                    </div>
                                    <div>
                                        Language: {languages[tours[tour_id].language_id].language}
                                    </div>
                                    <br />
                                    <div className="button-container">
                                        <button
                                            className="tours-buttons"
                                            onClick={() => hist.push(`/guide/${tours[tour_id].guide_id}`)}>
                                            View
                                        </button>
                                        <OpenModalButton
                                            buttonText="Edit"
                                            modalComponent={
                                                <EditTourModal tour={tours[tour_id]} />
                                            }
                                            className='tours-buttons'
                                        />
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={
                                                <DeleteTourModal tour_id={tour_id} />
                                            }
                                            className='tours-buttons'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
                })
                }
            </div>
        )
    } else {
        return null
    }
}
