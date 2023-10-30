import React from 'react';
import './DeleteReview.css'
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useModal } from "../../context/Modal";
import { deleteReview, getReviews } from '../../store/reviews';
import { allUsers } from '../../store/users';
import { authenticate } from '../../store/session';


function DeleteReviewModal({ review }) {
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    console.log(review.id)
    const data = await dispatch(deleteReview(review.id))
    if (data) {
      setErrors(data.errors)
    } else {
      closeModal()
      dispatch(getReviews())
      dispatch(allUsers())
      dispatch(authenticate())
    }




  }


  return (
    <div className="deleteTourContainer">
      <div className="deleteHeader">Confirm Delete</div>
      <div className="deleteText">Are you sure you want to delete this review?</div>
      <div className="post-tour-buttons-container">
        <button
          onClick={handleSubmit}
          className='yes-delete'
        >
          Yes
        </button>
        <button
          onClick={((e) => {
            closeModal();
          })}
          className='tours-buttons'
        >
          No
        </button>
      </div>
      {/* {errors && < label style={{ color: "red" }}>{errors}</label>} */}
    </div>
  )
}

export default DeleteReviewModal;