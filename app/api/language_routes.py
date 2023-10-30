from flask import Blueprint, jsonify, request
from ..models import db , Language

language_routes = Blueprint('languages', __name__)

@language_routes.route('/')
def get_all_languages():
    language_data=[]
    languages = Language.query.all()

    if request.args.get('language'):
        language = request.args.get('language').title()
        if not Language.query.filter_by(language=language).count():
            return jsonify({"errors": "Language is currently unavailable"}), 404
        else: languages = Language.query.filter_by(language=language)
    for language in languages:
        language_dict = language.to_dict()
        tours = language.tours_given
        tour_list = []
        for tour in tours:
            t_dic = tour.id
            tour_list.append(t_dic)

        language_dict['tours_id'] = tour_list
        language_data.append(language_dict)
        
    return {language['id']: language for language in language_data}



@language_routes.route('/<int:id>')
def get_one_language(id):
    language = Language.query.get(id)

    if not language:
        return jsonify({"errors": "Language not found"}), 404

    language_dict = language.to_dict()
    tours = language.tours_given
    tour_list = []
    for tour in tours:
        t_dic = tour.id
        tour_list.append(t_dic)
        language_dict['tours_id'] = tour_list

    return {language_dict['id']: language_dict}