// import React, { useEffect, useState } from "react";
// import MainPage from "../MainPage";
// import LogInSignUp from "../LogInSignUp";
// import GuidePage from "../GuidePage";
// import { Route } from "react-router-dom";
// // import { getTours } from "../../store/tour";
// // import { getBookings } from "../../store/booking";
// // import { getDates } from "../../store/date"
// // import { getCities } from "../../store/city"
// // import { getLanguages } from "../../store/language";
// // import { allUsers } from '../../store/users'
// // import { getSpecialties } from "../../store/specialty";
// // import { getReviews } from "../../store/reviews";
// import { useDispatch } from "react-redux";
// import { Switch } from "react-router-dom/";
// import Dashboard from "../Dashboard";

// export default function SelfRoutes() {
//     const dispatch = useDispatch()
//     const [loaded, setLoaded] = useState(false)

//     useEffect(() => {
//         setLoaded(false)
//         // dispatch(allUsers()).then(() =>
//         //     dispatch(getTours())).then(() =>
//         //         dispatch(getBookings())).then(() =>
//         //             dispatch(getDates())).then(() =>
//         //                 dispatch(getCities())).then(() =>
//         //                     dispatch(getSpecialties())).then(() =>
//         //                         dispatch(getReviews())).then(() =>
//         //                             dispatch(getLanguages())).then(() => setLoaded(true));
//     }, [dispatch]);

//     if (!loaded) {
//         return (
//             <>Loading....</>
//         )
//     } else {
//         return (
//             <>
//                 <Switch>
//                     <Route path='/slider'>
//                         <LogInSignUp loaded={loaded} />
//                     </Route>
//                     <Route path='/guide/:id'>
//                         <GuidePage loaded={loaded} />
//                     </Route>
//                     <Route path='/dashboard'>
//                         <Dashboard loaded={loaded} />
//                     </Route>
//                     <Route path=''>
//                         <MainPage loaded={loaded} />
//                     </Route>
//                 </Switch>
//             </>
//         )
//     }
// }