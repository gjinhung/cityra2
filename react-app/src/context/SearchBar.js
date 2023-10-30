import React, { useContext, useState } from "react";

const SearchContext = React.createContext()

export function useSearch() {
    return useContext(SearchContext)
}

export function SearchProvider({ children }) {
    let search = {}
    search.date = ''
    search.city = ''
    search.language = ''
    search.type = ''
    const [searchTerms, setSearch] = useState(search);

    const [submitSearch, setSubmit] = useState({ search })

    return (
        <SearchContext.Provider value={{ searchTerms, setSearch, submitSearch, setSubmit }}>
            {children}
        </SearchContext.Provider>
    )
}