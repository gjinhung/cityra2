import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSearch } from "../../context/SearchBar";

export default function CitySelection() {
    let menuRef = useRef()
    const [show, setShow] = useState(false)
    const [selectedCity, setSelectCity] = useState('City')
    const options = []
    const cities = useSelector((state) => state.cities)
    const { searchTerms, setSearch } = useSearch()

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target))
                setShow(false)
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [menuRef])

    const normalized_cities = Object.values(cities)
    normalized_cities.forEach((city) => {
        options.push(city.city)
    })
    options.sort()
    const opt_arr = Array.from(options)

    function handleDropDown() {
        setShow(!show)
    }

    function handleSelected(e) {
        let obj = searchTerms
        obj.city = e
        setSelectCity(e)
        setSearch(obj)
        setShow(false)
    }

    return (
        <>
            <div ref={menuRef}>
                <button
                    className="city-button"
                    onClick={(e) => handleDropDown(e)}
                >
                    {selectedCity}
                </button>
                {show &&
                    opt_arr.map((opt, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSelected(opt)}
                        >
                            {opt}
                        </div >
                    ))

                }
            </div >
        </>
    );

}