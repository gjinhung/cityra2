import React, { useContext, useState } from "react";

const LogSignInContext = React.createContext()

export function useLogSignIn() {
    return useContext(LogSignInContext)
}

export function LogInSignInProvider({ children }) {

    const [logSignIn, setLogSignIn] = useState(false);

    return (
        <LogSignInContext.Provider value={{ logSignIn, setLogSignIn }}>
            {children}
        </LogSignInContext.Provider>
    )
}