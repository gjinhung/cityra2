import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews, newReview } from "../../store/reviews";
import { allUsers } from "../../store/users";
import StarsRating from "./StarRating";
import OpenModalButton from "../OpenModalButton"
import EditReviewModal from "../EditReviewModal";
import DeleteReviewModal from '../DeleteReviewModal'
import PostBooking from "./Booking";

import './GuidePage.css'

export default function GuidePage({ loaded }) {
    const { id } = useParams()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const user = users[id]
    const guide = users[id]
    const languages = useSelector((state) => state.languages)
    const reviews = useSelector((state) => state.reviews)
    const current_user = useSelector((state) => state.session.user)
    const [showPost, setShowPost] = useState(false)
    const [errors, setErrors] = useState({});
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("");
    const [formDisabled, setFormDisabled] = useState(true);
    const [canPost, setCanPost] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    useEffect(() => {
        setCanPost(true)
        setCanEdit(false)
        if (current_user) {
            setLoggedIn(true)
            let reviews_of_guide = users[id].reviews_of_guide
            reviews_of_guide.forEach((review) => {
                if (review.reviewer_id === current_user.id) {
                    setCanPost(false)
                    setCanEdit(true)
                }
            })
        }

        if (!guide.tours_given.length) {
            setCanPost(false)
        }
    }, [canEdit, setCanEdit, current_user, id, reviews, users, guide.tours_given.length]);

    useEffect(() => {
        const errors = {};
        if (stars && stars < 1) {
            errors.stars = "Please input a star rating";
        }
        if (comment && comment.length < 10) {
            errors.comment = "Comment needs a minimum of 10 characters";
        }
        setErrors(errors);
    }, [stars, comment]);


    useEffect(() => {
        if (!stars || !comment || stars < 1 || comment.length < 10) {
            setFormDisabled(true);
        } else {
            setFormDisabled(false);
        }
    }, [dispatch, stars, comment]);


    const reviewSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        let submittedReview = {
            'rating': stars,
            'review_body': comment,
            'guide_id': +id
        }

        await dispatch(newReview(submittedReview, +id,)).then(() => {
            dispatch(getReviews()).then(() =>
                dispatch(allUsers())).then(() => {
                    setShowPost(false)
                    setCanPost(false)
                }).catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        })



    }

    function reviewToggle() {
        setComment('')
        setStars(0)
        setShowPost(!showPost)
        setCanPost(!canPost)

    }


    if (!loaded) {
        return (
            <div className="loading-style">
                <div className='loading-font'>
                    Loading...
                </div>
            </div>
        )
    } else {

        let language_set = new Set()
        let num_tours_given = users[id].tours_given.length
        let review_lists = [] //get the reviewers with this guide_id
        let guide_tours = []

        let normalized_tours = Object.values(user.tours_given)
        normalized_tours.forEach((tour) => {
            language_set.add(tour.language_id)
            guide_tours.push(tour.id)
        })

        let normalized_reviews = Object.values(reviews)
        normalized_reviews.forEach((review) => {
            if (review.guide_id === +id) {
                review_lists.push(review)
            }
        })

        function resetDate(str_date) {
            let months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
            const date = new Date(str_date)
            let year = date.getFullYear()
            let month = months[date.getMonth()]
            let day = date.getDate()
            return (`${month} ${day}, ${year}`)
        }

        const onChange = (stars) => {
            setStars(stars);
        }

        const onValueChanged = (input) => {
            setCanPost(input);
        }

        const language_arr = Array.from(language_set)

        return (
            <div className="guide-page">
                <div className="left-side">
                    <div className="user-info">
                        <h4>HOSTED BY</h4>
                        <div className="guide_details-container">

                            <img src={user.profile_pic}
                                className='userImg'
                                alt={user.id}
                                key={user.id}
                            />
                            <div className="guide-info-container">
                                <h3> {user.first_name} {user.last_name}</h3>
                                <div className="guide-rating">{user.rating} <i className="fa-solid fa-star"></i></div>
                                <div>
                                    {`(${num_tours_given} ${num_tours_given === 1 ? 'tour' : "tours"} given)`}
                                </div>
                                <div> <i className="fa-solid fa-language"></i> Languages I speak:</div>
                                {language_arr.map((language_id, idx) => {
                                    return (<li key={idx}>{languages[language_id].language}</li>)
                                })}
                            </div>
                        </div >
                        <hr />
                        <h3>Reviews</h3>
                        {current_user && current_user.id !== +id && canPost &&
                            (<>
                                <button
                                    onClick={reviewToggle}
                                    className="tours-buttons">Post a Review</button>
                                <br />
                            </>)
                        }

                        {showPost &&
                            (<>
                                <br />
                                <form onSubmit={reviewSubmit}>
                                    <div className='text-container'>
                                        <textarea
                                            style={{ resize: "none" }}
                                            name="text"
                                            rows={2}
                                            cols={40}
                                            placeholder="Leave your review here..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                    {errors.comment && errors.comment ? <div style={{ color: "red" }}>{errors.comment}</div> : <div className="empty-space"> </div>}
                                    <div className="rating-input">
                                        <div className="type">Rate Your Experience: </div>
                                        <StarsRating disabled={false} stars={stars} onChange={onChange} />
                                        {errors.rating && <div style={{ color: "red" }}>{errors.rating}</div>}
                                    </div>

                                    <button
                                        className={'tours-buttons'}
                                        type="submit"
                                        disabled={formDisabled}
                                    >
                                        Submit Your Review
                                    </button>
                                    <button
                                        className={'tours-buttons'}
                                        onClick={reviewToggle}>
                                        Cancel
                                    </button>

                                </form>
                                <br />
                            </>)
                        }
                        <br />
                        {review_lists.map((review, idx) => {
                            return (
                                <div
                                    className="reviewer-container"
                                    key={idx}>

                                    <div className="profile_pic">
                                        <img src={users[review.reviewer_id].profile_pic}
                                            className='reviewImg'
                                            alt={user.id}
                                            key={user.id}
                                        />
                                    </div>
                                    <div className="rating-container">
                                        <div
                                            className='review'>
                                            <div>Rating: {review.rating}<i className="fa-solid fa-star"></i></div>
                                            <div className="namedatecontainer">
                                                <div className="reviewer-name">{users[review.reviewer_id].first_name}</div>

                                                <div className="review-date"> {resetDate(review.updated_at)}</div>
                                            </div>
                                            <div className="review_body">{review.review_body}</div>

                                        </div>
                                        <div className="edit-review-container">
                                            {loggedIn && current_user && review.reviewer_id === current_user.id && (
                                                <>
                                                    <div className="reviewButtons">
                                                        <OpenModalButton
                                                            className="linkbuttons"
                                                            buttonText="Edit"
                                                            modalComponent={
                                                                <EditReviewModal guide_id={id} review={review} />
                                                            }
                                                            id={"review-edit-button"}
                                                        />
                                                        <OpenModalButton
                                                            buttonText="Delete"
                                                            className='linkbuttons'
                                                            modalComponent={
                                                                <DeleteReviewModal review={review} onChangeValue={onValueChanged} />
                                                            }
                                                            id={"review-delete-button"}
                                                        />
                                                    </div>
                                                    < br />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div >
                            )
                        })}
                    </div>
                </div>
                <div className="right-side">
                    <>
                        <PostBooking />
                    </>
                </div>

            </div >
        )
    }
}