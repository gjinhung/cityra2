import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getTours, newTour } from "../../store/tour";
import { allUsers } from "../../store/users";
import './PostTourModal.css'

export default function PostTourModal() {
    const dispatch = useDispatch();
    const [language, setLanguage] = useState("");
    const [monday, setMon] = useState(false)
    const [tuesday, setTue] = useState(false)
    const [wednesday, setWed] = useState(false)
    const [thursday, setThur] = useState(false)
    const [friday, setFri] = useState(false)
    const [saturday, setSat] = useState(false)
    const [sunday, setSun] = useState(false)
    const [city, setCity] = useState(false)
    const [history, setHistory] = useState(false)
    const [food, setFood] = useState(false)
    const [adventure, setAdventure] = useState(false)
    const [other, setOther] = useState(false)
    const [price, setPrice] = useState('')
    const [about, setAbout] = useState('')
    const [errors, setErrors] = useState({});
    const languages = useSelector((state) => state.languages)
    const normalizedLanguages = Object.values(languages)
    const cities = useSelector((state) => state.cities)
    const normalizedCities = Object.values(cities)
    // const types = useSelector((state) => state.specialties)
    // const normalizedTypes = Object.values(types)
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tour_data = {
            'language': language,
            "price": price,
            "about": about,
            "city": city,
            'monday': monday,
            "tuesday": tuesday,
            "wednesday": wednesday,
            "thursday": thursday,
            "friday": friday,
            "saturday": saturday,
            'sunday': sunday,
            'history': history,
            'food': food,
            'adventure': adventure,
            'other': other
        }
        const data = await dispatch(newTour(tour_data));
        if (data) {
            setErrors(data.errors);
        } else {
            dispatch(allUsers())
            dispatch(getTours())
            closeModal()
        }
    };

    function handleChange(e) {
        const result = e.target.value.replace(/\D/g, '');
        setPrice(result);
    };

    return (
        <div >
            <div className="title-tour-container">
                <h1 className="title-tour">Create a Tour</h1>
            </div>
            <form className="createTour-container" onSubmit={handleSubmit}>
                <label className="language">Select a Language</label>
                <select
                    id='language'
                    name='language'
                    defaultValue={language}
                    onChange={(e) => setLanguage(e.target.value)}>
                    <option></option>
                    {normalizedLanguages.map((language, idx) => {
                        return (
                            <option key={idx} value={language.language}> {language.language}</option>
                        )
                    })}
                </select>
                {errors && errors['language'] ? <div style={{ color: "red" }}>{errors['language']}</div> : <div className="empty-space"> </div>}

                <label className="price">Input Your Price</label>
                <input
                    type="text"
                    placeholder="Price per Hour"
                    value={price}
                    onChange={(e) => handleChange(e)}
                />
                {errors && errors['price'] ? <div style={{ color: "red" }}>{errors['price']}</div> : <div className="empty-space"> </div>}

                <label className="description">Description of the Tour</label>
                <div className='text-container'>
                    <textarea
                        style={{ resize: "none" }}
                        name="text"
                        rows={2}
                        cols={40}
                        placeholder="Leave a description about your tour..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    >
                    </textarea>
                </div>
                {errors && errors['about'] ? <div style={{ color: "red" }}>{errors['about']}</div> : <div className="empty-space"> </div>}

                <label className="city">Select Your City</label>
                <select
                    id='city'
                    name='city'
                    defaultValue={city}
                    onChange={(e) => setCity(e.target.value)}>
                    <option></option>
                    {normalizedCities.map((city, idx) => {
                        return (
                            <option key={idx} value={city.city}> {city.city}</option>
                        )
                    })}
                </select>
                {errors && errors['city'] ? <div style={{ color: "red" }}>{errors['city']}</div> : <div className="empty-space"> </div>}
                <div className="type-selection">
                    <label className="type">Choose Type of Tour You Want to Host:</label>
                    {errors && errors['type'] ? <div style={{ color: "red" }}>{errors['type']}</div> : <div className="empty-space"> </div>}
                    <div className="row">
                        <div className="column">
                            < input
                                type="checkbox"
                                className="checkbox"
                                name={`history`}
                                checked={history}
                                onChange={() => {
                                    setHistory(!history)
                                    setFood(false)
                                    setAdventure(false)
                                    setOther(false)
                                }} /> History
                        </div>
                        <div className="column">
                            < input
                                type="checkbox"
                                className="checkbox"
                                name={`food`}
                                checked={food}
                                onChange={() => {
                                    setHistory(false)
                                    setFood(!food)
                                    setAdventure(false)
                                    setOther(false)
                                }} /> Food
                        </div>
                        <div className="column">
                            < input
                                type="checkbox"
                                className="checkbox"
                                name={`adventure`}
                                checked={adventure}
                                onChange={() => {
                                    setHistory(false)
                                    setFood(false)
                                    setAdventure(!adventure)
                                    setOther(false)
                                }} /> Adventure
                        </div>
                        <div className="column">
                            < input
                                type="checkbox"
                                className="checkbox"
                                name={`other`}
                                checked={other}
                                onChange={(e) => {
                                    setHistory(false)
                                    setFood(false)
                                    setAdventure(false)
                                    setOther(!other)
                                }} /> Others
                        </div>
                    </div>
                </div>
                < br />

                <div className="day-selection">
                    <label className="date">Choose Dates to Host Your Tour:</label>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`monday`}
                            checked={monday}
                            onChange={() => {
                                setMon(!monday)
                            }} /> Mondays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`tuesday`}
                            checked={tuesday}
                            onChange={(e) => setTue(!tuesday)} /> Tuesdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`wednesday`}
                            checked={wednesday}
                            onChange={(e) => setWed(!wednesday)} /> Wednesdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`thursday`}
                            checked={thursday}
                            onChange={(e) => setThur(!thursday)} /> Thursdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`friday`}
                            checked={friday}
                            onChange={(e) => setFri(!friday)} /> Fridays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`saturday`}
                            checked={saturday}
                            onChange={(e) => setSat(!saturday)} /> Saturdays
                    </div>
                    <div>
                        < input
                            type="checkbox"
                            className="checkbox"
                            name={`sunday`}
                            checked={sunday}
                            onChange={(e) => setSun(!sunday)} /> Sundays
                    </div>
                    <br />
                </div>

                <div className="post-tour-buttons-container">
                    <button className={'tours-buttons'} type="submit">Post Tour</button>
                    <button className={'tours-buttons'} onClick={() => closeModal()}>Cancel</button>
                </div>
            </form >
        </div>
    );
}

