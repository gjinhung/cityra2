from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table

tour_specialties = db.Table(
    "tour_specialties",
    db.Model.metadata,
    db.Column("specialty_id", db.Integer, db.ForeignKey(add_prefix_for_prod("specialties.id")), primary_key=True),
    db.Column("specialty_tour_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tour_guides.id")), primary_key=True))

tour_dates = db.Table(
    "tour_dates",
    db.Model.metadata,
    db.Column("date_id", db.Integer, db.ForeignKey(add_prefix_for_prod("dates.id")), primary_key=True),
    db.Column("tour_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tour_guides.id")), primary_key=True))

if environment == 'production':
    tour_specialties.schema = SCHEMA
    tour_dates.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    joined_on = db.Column(db.DateTime(), nullable=False)
    student = db.Column(db.Boolean(), nullable=False)
    graduation_date = db.Column(db.DateTime(), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tours_given = db.relationship("TourGuide", back_populates='guide')
    reviews = db.relationship("Review", back_populates='reviewer')
    tourist_tours = db. relationship("Booking", back_populates='tourist')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'last_name': self.last_name,
            'first_name': self.first_name,
            'joined_on': self.joined_on,
            'student': self.student,
            'graduation_date': self.graduation_date,
            "profile_pic": self.profile_pic,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,autoincrement=True, primary_key=True)
    tourist_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    tour_guide_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("tour_guides.id")))
    date = db.Column(db.Date(), nullable=False)
    start_time = db.Column(db.Time(), nullable=False)
    duration = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tourist = db. relationship("User", back_populates='tourist_tours')
    tour_guide = db.relationship("TourGuide", back_populates='bookings')

    def to_dict(self):
        time_format = '%H:%M:%S'
        date_format = '%Y-%m-%d'
        raw_time = self.start_time
        raw_date = self.date
        string_time = raw_time.strftime(time_format)
        string_date = raw_date.strftime(date_format)
        self.date = string_date
        self.start_time = string_time
        
        return {
            'id': self.id,
            'tour_guide_id': self.tour_guide_id,
            'tourist_id': self.tourist_id,
            'date': self.date,
            'start_time': self.start_time,
            'duration': self.duration,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
    
class City(db.Model):
    __tablename__ = 'cities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tours_given = db.relationship("TourGuide", back_populates="cities")

    def to_dict(self):
        return {
            'id': self.id,
            'city': self.city
        }
    
class Date(db.Model):
    __tablename__ = 'dates'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tours = db.relationship("TourGuide", secondary=tour_dates, back_populates="dates")

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date
        }
    
class Language(db.Model):
    __tablename__ = 'languages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tours_given = db.relationship("TourGuide", back_populates="language")

    def to_dict(self):
        return {
            'id': self.id,
            'language': self.language
        }
    
class Review(db.Model):
    __tablename__= 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer,primary_key=True)
    reviewer_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    guide_id = db.Column(db.Integer, nullable=False)
    # average_rating = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    # communication_rating = db.Column(db.Integer, nullable=False)
    # knowledgability_rating = db.Column(db.Integer, nullable=False)
    # professionalism_rating = db.Column(db.Integer, nullable=False)
    review_body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    reviewer = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'reviewer_id': self.reviewer_id,
            'guide_id': self.guide_id,
            # 'average_rating': self.average_rating,
            # 'communication_rating': self.communication_rating,
            # 'knowledgeability_rating': self.knowledgability_rating,
            # 'professionalism_rating': self.professionalism_rating,
            'rating': self.rating,
            'review_body': self.review_body,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

class Specialty(db.Model):
    __tablename__ = 'specialties'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,autoincrement=True, primary_key=True)
    specialty = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    tours = db.relationship("TourGuide", secondary=tour_specialties, back_populates='specialties')

    def to_dict(self):
        return {
            'id': self.id,
            'specialty': self.specialty
        }

class TourGuide(db.Model):
    __tablename__ = 'tour_guides'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    guide_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    city_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('cities.id')), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('languages.id')), nullable=False)
    price = db.Column(db.Float, nullable=False)
    about = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    guide = db.relationship("User", back_populates='tours_given')
    cities = db.relationship("City", back_populates="tours_given")
    language = db.relationship("Language", back_populates="tours_given")
    bookings = db.relationship("Booking", back_populates='tour_guide')

    specialties = db.relationship("Specialty", secondary=tour_specialties, back_populates='tours')
    dates = db.relationship("Date", secondary=tour_dates, back_populates='tours')

    def to_dict(self):
        return {
            'id': self.id,
            'guide_id': self.guide_id,
            'city_id': self.city_id,
            'language_id': self.language_id,
            'price': self.price,
            'about': self.about,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
