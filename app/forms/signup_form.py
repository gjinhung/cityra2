from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, DateField, DateTimeField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

# is image extension valid?
def valid_image_url(form, field):
    file = field.data
    if ('.' in file and file.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS) or ('.' not in file):
        raise ValidationError("Invalid Image File Extension")


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    profile_pic = StringField("image_url", validators=[DataRequired(), valid_image_url])
    joined_on = DateTimeField('joined_on')
    student= BooleanField('student')
    graduation_date=DateField('graduation')
    submit = SubmitField('submit')
    