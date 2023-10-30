import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current || !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    console.log('logoutclicked')
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const closeMenu = () => setShowMenu(false);
  const ulClassName = "profile-drop" + (showMenu ? "" : " hidden");

  return (
    <>
      {!user ? (
        <NavLink exact to="/slider" className="logSignUp-button-container">
          <button className="logSignUp-button">
            LogIn / SignUp
          </button>
        </NavLink>
      ) : (
        <button onClick={openMenu} className="profile-button">
          <img src={user.profile_pic} className="mini-profile"></img>
        </button>
      )}

      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>

            <li>Welcome, {user.username}</li>
            <li>{user.first_name} {user.last_name}</li>
            <li>{user.email}</li>
            <li>
              <NavLink onClick={closeMenu} exact to="/dashboard" className="view-dash-button">Dashboard</NavLink></li>
            <li onClick={handleLogout} className="logout-red-button">Log Out</li>


          </>
        )
          // : (
          //   <>
          //     <div className="view-logout-container">
          //       <OpenModalButton
          //         buttonText="Log In"
          //         onItemClick={closeMenu}
          //         modalComponent={<LoginFormModal />}
          //         id={'log-in-button'}
          //       />

          //       <OpenModalButton
          //         buttonText="Sign Up"
          //         onItemClick={closeMenu}
          //         modalComponent={<SignupFormModal />}
          //         id={'sign-up-button'}
          //       />
          //     </div>
          //   </>
          // )
        }
      </ul>
    </>
  );
}

export default ProfileButton;
