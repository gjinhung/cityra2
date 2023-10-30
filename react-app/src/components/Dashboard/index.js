import React from "react";
// import { useState, uRef } from "react";
import OpenModalButton from "../OpenModalButton";
import PostTourModal from "../PostTourModal";
import MyBookings from "../MyBookings";
import MyTours from "../MyTours";
import { useSelector } from "react-redux";

export default function Dashboard({ loaded }) {
    // const ulRef = useRef();
    const current_user = useSelector((state) => state.session.user)
    // const [showMenu, setShowMenu] = useState(false);
    // const closeMenu = (e) => {
    //     if (!ulRef.current || !ulRef.current.contains(e.target)) {
    //         setShowMenu(false);
    //     }
    // };
    if (!loaded) {
        return (
            <div className="loading-style">
                <div className='loading-font'>
                    Loading...
                </div>
            </div>
        )
    } else {
        return (
            <>
                {current_user.student &&
                    <div className="view-post-container">
                        <OpenModalButton
                            buttonText="Post a New Tour"
                            // onItemClick={closeMenu}
                            modalComponent={<PostTourModal />}
                            className={'tours-buttons'}
                        />
                    </div>}
                <br />
                <MyTours loaded={loaded} />
                < br />
                <MyBookings loaded={loaded} />
            </>
        )
    }
}