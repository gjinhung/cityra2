from flask import Blueprint, jsonify, request
from ..models import db , Date

dates_routes = Blueprint('dates', __name__)


@dates_routes.route('/')
def get_all_dates():
    date_data=[]
    dates = Date.query.all()

    if request.args.get('date'):
        date = request.args.get('date').title()
        if not Date.query.filter_by(date=date).count():
            return jsonify({"errors": "Date does not exist"}), 404
        else: dates = Date.query.filter_by(date=date)
    for date in dates:
        date_dict = date.to_dict()
        tours = date.tours
        tour_list = []
        for tour in tours:
            t_dic = tour.id
            tour_list.append(t_dic)

        date_dict['tours_id'] = tour_list
        date_data.append(date_dict)
        
    return {date['id']: date for date in date_data}

@dates_routes.route('/<int:id>')
def get_one_date(id):
    date = Date.query.get(id)

    if not date:
        return jsonify({"errors": "Date not found"}), 404
    date_dict = date.to_dict()
    tours = date.tours
    tour_list = []
    for tour in tours:
        t_dic = tour.id
        tour_list.append(t_dic)
    date_dict['tours_id'] = tour_list
        
    return {date_dict['id']: date_dict}