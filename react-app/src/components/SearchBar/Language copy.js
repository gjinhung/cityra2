import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSearch } from "../../context/SearchBar";

export default function LanguageSelection() {
    // let menuRef = useRef()
    // const [show, setShow] = useState(false)
    const [selectedLang, setSelectLang] = useState('Language')
    const options = []
    const languages = useSelector((state) => state.languages)
    const { searchTerms, setSearch } = useSearch()

    const normalized_languages = Object.values(languages)
    normalized_languages.forEach((language) => {
        options.push(language.language)
    })
    options.sort()
    // const opt_arr = Array.from(options)

    // function handleDropDown() {
    //     setShow(!show)
    // }

    function handleSelected(e) {
        let obj = searchTerms
        obj.language = e
        setSelectLang(e)
        setSearch(obj)
        // setShow(false)
    }

    return (
        <div className="search-selection">
            <label className="search-title">LANGUAGE</label>
            <div className="date-selection-container">
                <select
                    id='language'
                    name='language'
                    className="date-input"
                    defaultValue={selectedLang}
                    onChange={(e) => handleSelected(e.target.value)}>
                    <option></option>
                    {normalized_languages.map((language, idx) => {
                        return (
                            <option key={idx} value={language.language}> {language.language}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    );

}