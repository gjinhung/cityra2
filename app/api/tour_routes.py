from flask import Blueprint, jsonify, request
from ..models import db, TourGuide, City, Date, Specialty, Language
from flask_login import current_user, login_required
from ..forms.tour_guide_form import TourGuideForm
import datetime
from .auth_routes import validation_errors_to_error_messages

tours_routes = Blueprint('tours', __name__)

@tours_routes.route('/')
def get_all_tours():
    tours = TourGuide.query.all()
    tours_data = []
    for tour in tours:
        
        tour_dict = tour.to_dict()
        # get bookings of tours
        bookings = tour.bookings
        bookings_data = []
        for booking in bookings:
            bookings_data.append(booking.id)
        tour_dict['bookings_id'] = bookings_data
        
        # get dates
        dates = tour.dates
        dates_data = []
        for date in dates:
            dates_data.append(date.id)
        tour_dict['dates'] = dates_data

        # get specialties
        specialties = tour.specialties
        spcls_data = []
        for specialty in specialties:
            spcls_data.append(specialty.id)
        tour_dict['specialties_id'] = spcls_data

        tours_data.append(tour_dict)
        
    return {'tours': {tours['id']: tours for tours in tours_data}}

@tours_routes.route('/<int:id>')
def get_one_tour(id):
    tour = TourGuide.query.get_or_404(id)

    if not tour:
        return jsonify({"errors": "Tour not found"}), 404
    
    tour_dict = tour.to_dict()
    # get bookings of tours
    bookings = tour.bookings
    bookings_data = []
    for booking in bookings:
        bookings_data.append(booking.id)
    tour_dict['bookings_id'] = bookings_data
    
    # get dates
    dates = tour.dates
    dates_data = []
    for date in dates:
        dates_data.append(date.id)
    tour_dict['dates'] = dates_data
    # get specialties
    specialties = tour.specialties
    spcls_data = []
    for specialty in specialties:
        spcls_data.append(specialty.id)
    tour_dict['specialties_id'] = spcls_data

    # return tour_dict
    
    return {'tours': {tour_dict['id']: tour_dict}}


@tours_routes.route('/new', methods=['POST'])
@login_required
def add_tour():
    form = TourGuideForm()
    form['csrf_token'].data = request.cookies['csrf_token']
  
    errors = {}
    if form.city.data:
        city_name = (form.city.data).title()
        city_data = City.query.filter_by(city=city_name).first()

        if not city_data:
            errors['city'] = 'City not found'
    else:
        errors['city'] = 'City Required'

    if form.language.data:
        language = (form.language.data).title()
        language_data = Language.query.filter_by(language=language).first()

        if not language_data:
            errors['language'] = "Language not found"
    else:
        errors['language'] = 'Language Required'


    if not form.price.data:
        errors['price'] = 'Price Required'

    if not form.about.data:
        errors['about'] = "Description of Tour Required"
    elif len(form.about.data) <= 20:
        errors['about'] = "Description needs at least 20 characters"

    if form.history.data == False:
        if form.food.data == False:
            if form.adventure.data == False:
               if form.other.data == False:
                   errors['type'] = 'Type of Tour Required'

    if len(errors):
        return {"errors": errors}, 403

    if form.validate_on_submit():
        
        def get_date(date_name):
            title_date = date_name.title()
            date = Date.query.filter_by(date=title_date).first()
            return date
        
        def get_spec(specialty):
            title_spec = specialty.title()
            spec = Specialty.query.filter_by(specialty=title_spec).first()
            return spec

        dates_list = []
        spec_list = []
        dates_id = []
        spec_id = []
        for data in form.data:
            specialty_list = ['Food', 'History', 'Adventure', 'Other']
            date_list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            if data.title() in date_list:
                if form.data[data] == True:
                    date_class = get_date(data)
                    dates_list.append(date_class)
                    dates_id.append(date_class.id)
            if data.title() in specialty_list:
                if form.data[data] == True:
                    spec_class = get_spec(data)
                    spec_list.append(spec_class)
                    spec_id.append(spec_class.id)
                    
        tour = TourGuide(
            guide_id=current_user.id,
            city_id=city_data.id,
            language_id=language_data.id,
            price=form.price.data,
            about=form.about.data,
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow()
        )
        
        for date in dates_list:  
            tour.dates.append(date)

        for spec in spec_list:
            tour.specialties.append(spec)

        db.session.add(tour)
        db.session.commit()
        tour_dict = tour.to_dict()

        tour_dict['bookings_id'] = []
        tour_dict['dates'] = dates_id
        tour_dict['specialties_id'] = spec_id

        return tour_dict
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}
    

@tours_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    form = TourGuideForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    tour = TourGuide.query.get(id)

    if not tour:
        return jsonify({'errors': "Tour not found"}), 403

    errors = {}

    if form.city.data:
        city_name = (form.city.data).title()
        city_data = City.query.filter_by(city=city_name).first()

        if not city_data:
            errors['city'] = 'City not found'
    else:
        errors['city'] = 'City Required'

    if form.language.data:
        language = (form.language.data).title()
        language_data = Language.query.filter_by(language=language).first()

        if not language_data:
            errors['language'] = "Language not found"
    else:
        errors['language'] = 'Language Required'


    if not form.price.data:
        errors['price'] = 'Price Required'

    if not form.about.data:
        errors['about'] = "Description of Tour Required"
    elif len(form.about.data) <= 20:
        errors['about'] = "Description needs at least 20 characters"
    
    if current_user.id != tour.guide_id:
        return jsonify({"errors": "Unauthorized to edit this review"}), 403
    
    if form.history.data == False:
        if form.food.data == False:
            if form.adventure.data == False:
               if form.other.data == False:
                   errors['type'] = 'Type of Tour Required'

    if len(errors):
        return jsonify(errors), 403

    if form.validate_on_submit():

        attributes_to_update = ['price', 'about']
        for attr in attributes_to_update:
            if hasattr(form, attr):
                setattr(tour, attr, getattr(form, attr).data)

        tour.updated_at = datetime.datetime.utcnow()

        tour.language_id = language_data.id

        city_name = (form.city.data).title()
        city_data = City.query.filter_by(city=city_name).first()

        if not city_data:
            return jsonify({"errors": "City not found"}), 404
        
        tour.city_id = city_data.id
# find dates and specialties
        def get_date(date_name):
            title_date = date_name.title()
            date = Date.query.filter_by(date=title_date).first()
            return date
        
        def get_spec(specialty):
            title_spec = specialty.title()
            spec = Specialty.query.filter_by(specialty=title_spec).first()
            return spec
        tour.dates = []
        tour.specialties = []
        dates_list = []
        spec_list = []
        dates_id = []
        spec_id = []
        for data in form.data:
            specialty_list = ['Food', 'History', 'Adventure', 'Other']
            date_list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            if data.title() in date_list:
                if form.data[data] == True:
                    date_class = get_date(data)
                    dates_list.append(date_class)
                    dates_id.append(date_class.id)
            if data.title() in specialty_list:
                if form.data[data] == True:
                    spec_class = get_spec(data)
                    spec_list.append(spec_class)
                    spec_id.append(spec_class.id)
        
        for date in dates_list:  
            tour.dates.append(date)
        
        for spec in spec_list:
            tour.specialties.append(spec)

        db.session.commit()
        
        tour_dict = tour.to_dict()

        tour_dict['bookings_id'] = []
        tour_dict['dates'] = dates_id
        tour_dict['specialties_id'] = spec_id

        return tour_dict
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}
    

@tours_routes.route('/<int:id>/', methods=['DELETE'])
def delete_tour(id):
    tour = TourGuide.query.get(id)
   
    if current_user.id != tour.guide_id:
        return jsonify({"errors": "Unauthorized to delete this Tour"}), 403
    
    if not tour:
        return jsonify({"errors": "Tour not found"}), 404

    try:
        db.session.delete(tour)
        db.session.commit()

        response = {
            "message": "Tour successfully deleted."
        }

        return jsonify(response)

    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": "An error occurred while deleting the Tour", "message": str(e)}), 500
