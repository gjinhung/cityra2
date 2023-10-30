from flask import Blueprint, jsonify, request
from ..models import db , Booking, TourGuide
from flask_login import current_user, login_required
from ..forms.booking_form import BookingForm
import datetime
from .auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/')
def get_all_bookings():
    bookings = Booking.query.all()
    bookings_data = []
    for booking in bookings:
        booking_dict = booking.to_dict()
        # # to convert to string use strftime
        date_format = '%Y-%m-%d'
        if not isinstance(booking.date, str):
            date = (booking.date).strftime(date_format)
        else: date = booking.date
        # time_format = '%H:%M:%S'
        # start_time = (booking.start_time).strftime(time_format)
        # # to convert to datetime.date.fromisoformat(start_time)
        today = datetime.date.today()
        booking_date = datetime.date.fromisoformat(date)
        diff = (booking_date-today).days
        occured = False
        if diff <= 0:
            occured = True
        booking_dict['completed'] = occured
        # booking_dict['start_time'] = start_time
        # booking_dict['date'] = date

        booking_dict['tour'] = booking.tour_guide.to_dict()

        bookings_data.append(booking_dict)
    # return jsonify(bookings_data)
    return {"bookings": {booking['id']: booking for booking in bookings_data}}

@booking_routes.route('/<int:id>')
def get_one_booking(id):
    booking = Booking.query.get_or_404(id)

    if not booking:
        return jsonify({"errors": "Booking not found"}), 404
    
    booking_dict = booking.to_dict()

    booking_dict['tour'] = booking.tour_guide.to_dict()
    
    return {"bookings": {booking_dict['id']: booking_dict}}

@booking_routes.route('/tour/<int:tourId>/new', methods=['POST'])
@login_required
def add_booking(tourId):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    tour = TourGuide.query.get_or_404(tourId)  
    if not tour:
        return jsonify({"errors": "Tour not found"}), 404
    
    if form.validate_on_submit():
        booking = Booking(
            tourist_id=current_user.id,
            tour_guide_id=tour.guide_id,
            date=form.date.data,
            start_time=form.start_time.data,
            duration=form.duration.data,
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow()
        )

        db.session.add(booking)
        db.session.commit()

        booking_dict = booking.to_dict()
        booking_dict['tour'] = booking.tour_guide.to_dict()

        return booking_dict
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}

@booking_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    booking = Booking.query.get(id)
    if current_user.id != booking.tourist_id and current_user.id != booking.tour_guide_id:
        return jsonify({"errors": "Unauthorized to edit this booking"}), 403

    if form.validate_on_submit():
        attributes_to_update = ['date', 'start_time', 'duration']
        for attr in attributes_to_update:
            if hasattr(form, attr):
                setattr(booking, attr, getattr(form, attr).data)

        booking.updated_at = datetime.datetime.utcnow()
        db.session.commit()

        booking_dict = booking.to_dict()
        booking_dict['tour'] = booking.tour_guide.to_dict()

        return booking_dict
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}
    

@booking_routes.route('/<int:id>/', methods=['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)

    if not booking:
        return jsonify({"errors": "Booking not found"}), 404

    if current_user.id != booking.tourist_id and current_user.id != booking.tour_guide_id:
        return jsonify({"errors": "Unauthorized to delete this booking"}), 403

    try:
        db.session.delete(booking)
        db.session.commit()

        response = {
            "message": "Booking successfully deleted."
        }

        return jsonify(response)

    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": "An error occurred while deleting the Booking", "message": str(e)}), 500
