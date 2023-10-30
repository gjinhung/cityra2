from flask_wtf import FlaskForm
from wtforms import FloatField, SubmitField, DateField, TimeField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    date = DateField('date', validators=[DataRequired()])
    start_time = TimeField('start_time', validators=[DataRequired()])
    duration = FloatField('duration', validators=[DataRequired()])
    submit = SubmitField('Submit')