import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSearch } from "../../context/SearchBar";

export default function SpecialtySelection() {
    let menuRef = useRef()
    const [show, setShow] = useState(false)
    const [selectedSpec, setSelectSpec] = useState('Type')
    const options = []
    const specialties = useSelector((state) => state.specialties)
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

    const normalized_specs = Object.values(specialties)
    normalized_specs.forEach((spec) => {
        options.push(spec.specialty)
    })
    options.sort()
    const opt_arr = Array.from(options)
    opt_arr.push("Any")

    function handleDropDown() {
        setShow(!show)
    }

    function handleSelected(e) {
        let obj = searchTerms
        if (e.toLowerCase() === "any") {
            obj.type = ''
        } else { obj.type = e }
        setSelectSpec(e)
        setSearch(obj)
        setShow(false)
    }

    return (
        <>
            <div ref={menuRef}>
                <button
                    className="specialty-button"
                    onClick={(e) => handleDropDown(e)}
                >
                    {selectedSpec}
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