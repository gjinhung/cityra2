from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..models import db
from app.models import User, Review

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    users_data = []
    for user in users:
        user_dict = user.to_dict()
        reviews = []
        reviews_list = []
        reviews_given = user.reviews
        for rev in reviews_given:
            # reviews.append(rev.average_rating)
            reviews.append(rev.rating)
            reviews_list.append(rev.to_dict())

        guide_ratings = []
        guide_reviews = []
        reviews = Review.query.filter_by(guide_id=user.id).all()

        for review in reviews:
            guide_ratings.append(review.rating)
            guide_reviews.append(review.to_dict())

        rev_sum = sum(guide_ratings)
        if not len(guide_ratings):
            rating = 0
        else:
            rating = round((rev_sum/len(reviews)),2)
    

        user_dict['rating'] = rating

        tours_given = []
        tours_given_ids = []

        u_tours_given = user.tours_given
        for tg in u_tours_given:
            tg_dict = tg.to_dict()
            tours_given.append(tg_dict)
            tours_given_ids.append(tg_dict['id'])

        
        user_dict['reviews_of_guide'] = guide_reviews
        user_dict['tours_given_ids'] = tours_given_ids
        user_dict['reviews_given'] = reviews_list
        user_dict['tours_given'] = tours_given
        users_data.append(user_dict)

    
    return {'users': {user['id']: user for user in users_data}}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user_dict = user.to_dict()
    reviews = []
    reviews_list = []
    reviews_given = user.reviews
    for rev in reviews_given:
        # reviews.append(rev.average_rating)
        reviews.append(rev.rating)
        reviews_list.append(rev.to_dict())
    guide_ratings = []
    guide_reviews = []
    reviews = Review.query.filter_by(guide_id=user.id).all()
    for review in reviews:
        guide_ratings.append(review.rating)
        guide_reviews.append(review.to_dict())
    rev_sum = sum(guide_ratings)
    if not len(guide_ratings):
        rating = 0
    else:
        rating = round((rev_sum/len(reviews)),2)

    user_dict['rating'] = rating

    tours_given = []
    tours_given_ids = []
    u_tours_given = user.tours_given
    for tg in u_tours_given:
        tg_dict = tg.to_dict()
        tours_given.append(tg_dict)
        tours_given_ids.append(tg_dict['id'])
    
    user_dict['reviews_of_guide'] = guide_reviews
    user_dict['tours_given_ids'] = tours_given_ids
    user_dict['reviews_given'] = reviews_list
    user_dict['tours_given'] = tours_given

    return user_dict



@user_routes.route('/current')
@login_required
def current():

    user = User.query.get(current_user.id)
    user_dict = user.to_dict()
    reviews = []
    reviews_list = []
    reviews_given = user.reviews
    for rev in reviews_given:
        # reviews.append(rev.average_rating)
        reviews.append(rev.rating)
        reviews_list.append(rev.to_dict())
    guide_ratings = []
    guide_reviews = []
    reviews = Review.query.filter_by(guide_id=user.id).all()
    for review in reviews:
        guide_ratings.append(review.rating)
        guide_reviews.append(review.to_dict())
    rev_sum = sum(guide_ratings)
    if not len(guide_ratings):
        rating = 0
    else:
        rating = round((rev_sum/len(reviews)),2)

    user_dict['rating'] = rating
    tours_given = []
    tours_given_ids = []
    u_tours_given = user.tours_given
    for tg in u_tours_given:
        tg_dict = tg.to_dict()
        tours_given.append(tg_dict)
        tours_given_ids.append(tg_dict['id'])
    
    user_dict['reviews_of_guide'] = guide_reviews
    user_dict['tours_given_ids'] = tours_given_ids
    user_dict['reviews_given'] = reviews_list
    user_dict['tours_given'] = tours_given
    return user_dict


@user_routes.route('/<int:id>/', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    db.session.delete(user)
    db.session.commit()

    response = {
        "message": "Tour successfully deleted."
    }

    return jsonify(response)