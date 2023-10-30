from flask import Blueprint, jsonify, session, request
from app.models import User, db, Review
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import datetime

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        user = User.query.get(current_user.id)
        user_dict = user.to_dict()
        reviews_list = []
        reviews_given = user.reviews
        for rev in reviews_given:
            reviews_list.append(rev.to_dict())
        
        bookings = user.tourist_tours
        bookings_list_id = []
        for booking in bookings:
            bookings_list_id.append(booking.id)

        guide_ratings = []
        guide_reviews = []
        reviews = Review.query.filter_by(guide_id=current_user.id).all()
        
        for review in reviews:
            guide_ratings.append(review.rating)
            guide_reviews.append(review.to_dict())
    
        
        rev_sum = sum(guide_ratings)
        if not len(guide_ratings):
            rating = 0
        else:
            rating = round((rev_sum/len(reviews)),2)
        
        user_dict['rating'] = rating
        user_dict['reviews_of_guide'] = guide_reviews
        user_dict['reviews_given'] = reviews_list
        user_dict['booking_ids'] = bookings_list_id
    
        return user_dict
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        user_dict = user.to_dict()
        reviews_list = []
        reviews_given = user.reviews
        for rev in reviews_given:
            reviews_list.append(rev.to_dict())
        
        bookings = user.tourist_tours
        bookings_list_id = []
        for booking in bookings:
            bookings_list_id.append(booking.id)

        guide_ratings = []
        guide_reviews = []
        reviews = Review.query.filter_by(guide_id=current_user.id).all()
        
        for review in reviews:
            guide_ratings.append(review.rating)
            guide_reviews.append(review.to_dict())
    
        
        rev_sum = sum(guide_ratings)
        if not len(guide_ratings):
            rating = 0
        else:
            rating = round((rev_sum/len(reviews)),2)
        
        user_dict['rating'] = rating
        user_dict['reviews_of_guide'] = guide_reviews
        user_dict['reviews_given'] = reviews_list
        user_dict['booking_ids'] = bookings_list_id
    
        return user_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout', )
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    
    # trufy = ['true', "true", 'True', "True"]

    # if data['student'] in trufy:
    #     data['student'] = True
    # else:
    #     data['student'] = False

    if form.validate_on_submit():

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_pic=form.data['profile_pic'],
            student=data['student'],
            graduation_date=form.data['graduation_date'],
            joined_on=datetime.datetime.utcnow(),
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow()
            )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401