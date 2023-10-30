import React, { useRef, useState } from "react";
import LanguageSelection from './Language copy'
import CitySelection from './City copy'
import SpecialtySelection from "./Specialty copy";
import { useSearch } from "../../context/SearchBar";
import { cityByName } from "../../store/city";
import { langByName } from "../../store/language";
import { dateByName } from "../../store/date";
import { useDispatch, useSelector } from "react-redux";
import { typeByName } from "../../store/specialty";
import './SearchBar.css'
import DateSelection from "./Date";
import { NavLink } from "react-router-dom";
import NYC from '../../images/NYC.png'
import mountains from '../../images/Mountain.png'

export default function SearchBar({ loaded }) {
    const searchRef = useRef(null)
    const users = useSelector((state) => state.users)
    const students = []
    const normalizedUsers = Object.values(users)
    normalizedUsers.forEach((user) => {
        if (user.student) {
            students.push(user.id)
        }
    })
    const tours = useSelector((state) => (state.tours))
    const { searchTerms } = useSearch()
    const dispatch = useDispatch()
    let guideSet = new Set()
    let guide_array = []
    const [guide_ids, setGuide_Ids] = useState(students)

    async function handleSearch() {
        const { language, city, type, date } = searchTerms


        const tours_id = Object.keys(tours)
        //fill each category with all tours
        const tour_ids = []
        tours_id.forEach((id) => {
            tour_ids.push(+id)
        })
        let city_tours = tour_ids
        let type_tours = tour_ids
        let language_tours = tour_ids
        let date_tours = tour_ids
        // if there is a city fetch tours of that city
        if (city) {
            const city_id = await dispatch(cityByName(city)).catch((response) => {
                const data = response.json()
                return data
            });
            city_tours = (Object.values(city_id)[0].tours_id)
        }
        //if there is a language fetch tours with that language
        if (language) {
            const language_id = await dispatch(langByName(language)).catch((response) => {
                const data = response.json()
                return data
            });
            language_tours = (Object.values(language_id)[0].tours_id)
        }
        // if there is a specialty fetch tours with that specialty
        if (type) {
            const type_id = await dispatch(typeByName(type)).catch((response) => {
                const data = response.json()
                return data
            });
            type_tours = (Object.values(type_id)[0].tours_id)
        }
        // if a date was select get tours of that date
        if (date) {
            const date_id = await dispatch(dateByName(date)).catch((response) => {
                const data = response.json()
                return data
            });

            date_tours = (Object.values(date_id)[0].tours_id)
        }
        const firstFilter = await city_tours.filter(value => language_tours.includes(value));
        const secondFilter = await firstFilter.filter(value => type_tours.includes(value))
        const thirdFilter = await secondFilter.filter(value => date_tours.includes(value))

        await thirdFilter.forEach((tour_id) => (
            guideSet.add(tours[tour_id].guide_id)
        ))

        guide_array = await Array.from(guideSet)
        setGuide_Ids(guide_array)

        searchRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    if (!loaded) {
        return (
            <div className="loading-style">
                <div className='loading-font'>
                    Loading......
                </div>
            </div>
        )
    } else {
        // console.log(users)
        return (
            <div className="wrap">
                <img src={mountains} className="background"></img>
                <img src={NYC} className="foreground"></img>
                <div className="header">
                    <div className="searchBarContainerCont">
                        <div className="searchBarContainer" >
                            <div className="searchBar" >
                                <DateSelection />
                                <LanguageSelection />
                                <CitySelection />
                                <SpecialtySelection />
                                <div className="searchButton-container">
                                    <button
                                        type='submit'
                                        onClick={handleSearch}
                                        className={"search-button"}>
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>

                <div
                    ref={searchRef}
                    className="section">
                    {!guide_ids.length ?
                        <div className="nosearch-container">
                            <div className="nosearch">
                                Sorry but no tours are available for your search criteria. Try another search parameter.
                            </div>
                        </div> :
                        <div className="image_container">
                            {guide_ids.map((guide_id, idx) => (
                                <div className='tour-images-container'
                                    key={idx}>

                                    <img src={users[guide_id].profile_pic}
                                        className='tourImg'
                                        alt={users[guide_id].id}
                                        key={idx}
                                    />
                                    <NavLink exact to={`/guide/${guide_id}`}>
                                        <div className="content">
                                            <div className="tour-guide-info">{users[guide_id].first_name} {users[guide_id].last_name}</div>
                                            < br />
                                            <div className="tour-guide-info">{users[guide_id].rating}<i className="fa-solid fa-star"></i></div>
                                            <p className="tour-guide-info-num">({users[guide_id].reviews_of_guide.length} {users[guide_id].reviews_of_guide.length === 1 ? 'rating' : 'ratings'})</p>
                                            < br />
                                            <p className="tour-guide-info-num2">{users[guide_id].tours_given.length} {users[guide_id].tours_given.length == 1 ? "tour" : "tours"} available</p>
                                        </div>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    }
                </div>

            </div>
        )
    }
}