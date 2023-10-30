import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSearch } from "../../context/SearchBar";

export default function LanguageSelection() {
    let menuRef = useRef()
    const [show, setShow] = useState(false)
    const [selectedLang, setSelectLang] = useState('Language')
    const options = []
    const languages = useSelector((state) => state.languages)
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

    const normalized_languages = Object.values(languages)
    normalized_languages.forEach((language) => {
        options.push(language.language)
    })
    options.sort()
    const opt_arr = Array.from(options)

    function handleDropDown() {
        setShow(!show)
    }

    function handleSelected(e) {
        let obj = searchTerms
        obj.language = e
        setSelectLang(e)
        setSearch(obj)
        setShow(false)
    }

    return (
        <>
            <div ref={menuRef}>
                <button
                    className="language-button"
                    onClick={(e) => handleDropDown(e)}
                >
                    {selectedLang}
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