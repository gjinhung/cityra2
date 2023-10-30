from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FloatField, BooleanField
from wtforms.validators import DataRequired, NumberRange, Length

class TourGuideForm(FlaskForm):
    language = StringField('language', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    about = StringField('about', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    monday = BooleanField('monday')
    tuesday = BooleanField('tuesday')
    wednesday = BooleanField('wednesday')
    thursday = BooleanField('thursday')
    friday = BooleanField('friday')
    saturday = BooleanField('saturday')
    sunday = BooleanField('sunday')
    history = BooleanField('history')
    food = BooleanField('food')
    adventure = BooleanField('adventure')
    other = BooleanField('other')
    submit = SubmitField('Submit')