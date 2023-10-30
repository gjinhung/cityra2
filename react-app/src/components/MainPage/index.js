import React from "react";
import { useSelector } from "react-redux";
import { useLogSignIn } from "../../context/NavToggle"
import SearchBar from '../SearchBar'
import LogInSignUp from "../LogInSignUp";
import './MainPage.css'

function MainPage({ loaded }) {
    const { logSignIn } = useLogSignIn()
    const sessionUser = useSelector((state) => state.session.user);

    let show
    if (!sessionUser) { //if not log in
        show = ( //show login/signup and search
            <>
                <div className={`SearchBar-${logSignIn}`}>
                    <SearchBar loaded={loaded} />
                </div>
                <div className={`LogInSignUp-${logSignIn}`}>
                    <LogInSignUp />
                </div>
            </>
        )
    } else {
        show = ( //just show regular search
            <>
                <div>
                    <SearchBar loaded={loaded} />
                </div>
            </>
        )
    }
    // if (!loaded) {
    //     return <h2>Loading</h2>
    // }

    // else {
    return (
        <>
            {show}
        </>
    )
}
// }

export default MainPage;