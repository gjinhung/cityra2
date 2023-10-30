import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { getTours } from "./store/tour";
import { getBookings } from "./store/booking";
import { getDates } from "./store/date";
import { getCities } from "./store/city";
import { getLanguages } from "./store/language";
import { allUsers } from "./store/users";
import { getSpecialties } from "./store/specialty";
import { getReviews } from "./store/reviews";
import MainPage from "./components/MainPage";
import LogInSignUp from "./components/LogInSignUp";
import GuidePage from "./components/GuidePage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() =>
      dispatch(allUsers())).then(() =>
        dispatch(getTours())).then(() =>
          dispatch(getBookings())).then(() =>
            dispatch(getDates())).then(() =>
              dispatch(getCities())).then(() =>
                dispatch(getSpecialties())).then(() =>
                  dispatch(getReviews())).then(() =>
                    dispatch(getLanguages())).then(() => setIsLoaded(true))
  }, [dispatch]);
  if (!isLoaded) {
    return (
      <div className="loading-style">
        <div className='loading-font'>
          Loading....
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path='/slider'>
              <LogInSignUp loaded={isLoaded} />
            </Route>
            <Route path='/guide/:id'>
              <GuidePage loaded={isLoaded} />
            </Route>
            <ProtectedRoute path='/dashboard' exact={true}>
              < Dashboard loaded={isLoaded} />
            </ProtectedRoute>
            <Route path=''>
              <MainPage loaded={isLoaded} />
            </Route>
            {/* <SelfRoutes /> */}
          </Switch>
        )}
      </>

    );
  }
}

export default App;
