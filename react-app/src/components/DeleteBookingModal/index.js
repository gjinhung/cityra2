import React from 'react';
import './DeleteBookingModal.css'
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useModal } from "../../context/Modal";
import { allUsers } from '../../store/users';
import { deleteBooking, getBookings } from '../../store/booking';




function DeleteBookingModal({ booking_id }) {
  const [errors, setErrors] = useState('');
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const data = await dispatch(deleteBooking(booking_id))
    if (data) {
      setErrors(data)
    } else {
      dispatch(getBookings()).then(() =>
        dispatch(allUsers())).then(() =>
          closeModal())
    }
  }


  return (
    <div className="deleteTourContainer">
      <div className="deleteHeader">Confirm Cancel</div>
      <div className="deleteText">Are you sure you want to cancel this tour?</div>
      <div className="post-tour-buttons-container">
        <button
          onClick={handleSubmit}
          className='yes-delete'
        >
          Yes (Cancel Tour)
        </button>
        <button
          onClick={((e) => {
            closeModal();
          })}
          className='tours-buttons'
        >
          No (Keep Tour)
        </button>
      </div>
      {/* {errors && < label style={{ color: "red" }}>{errors}</label>} */}
    </div >
  )
}

export default DeleteBookingModal;