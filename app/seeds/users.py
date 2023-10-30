from app.models import db, User, City, Date, Review, Booking, TourGuide, Language, Specialty, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        id = 1,
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        first_name='Demo',
        last_name="Stration",
        profile_pic="https://publichealth.uga.edu/wp-content/uploads/2020/01/Thomas-Cameron_Student_Profile.jpg",
        joined_on=datetime.datetime.now(),
        student=True,
        graduation_date=datetime.date(2024, 5, 24),
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    demo2 = User(
        id=2,
        username='Demo2', 
        email='demo2@aa.io', 
        password='password',
        first_name='Demo',
        last_name="Lition",
        profile_pic="https://png.pngtree.com/background/20230426/original/pngtree-young-professional-asian-college-man-with-glasses-picture-image_2489385.jpg",
        joined_on=datetime.datetime.now(),
        student=True,
        graduation_date=datetime.date(2024, 5, 24),
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    demo3 = User(
        id=3,
        username='Demo3', 
        email='demo3@aa.io', 
        password='password',
        first_name='Demo',
        last_name="Lition",
        profile_pic="https://3.bp.blogspot.com/-uXdYwoAZnDM/W1dzL3uLkoI/AAAAAAAADY0/RVbd3BlqORsT_aUNHVHDEIxxxNIaspLrwCLcBGAs/s1600/IMG_6141.JPG",
        joined_on=datetime.datetime.now(),
        student=False,
        graduation_date=None,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    new_york = City(
        id = 1,
        city="New York",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    los_angeles = City(
        id = 2,
        city="Los Angeles",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    seattle = City(
        id = 3,
        city="Seattle",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    booking1 = Booking(
        id = 1,
        tour_guide_id=1, 
        date=datetime.date(2024, 1, 1),
        start_time=datetime.time(9),
        duration=2,
        tourist=demo3,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    booking2 = Booking(
        id = 2,
        tourist_id=3, 
        date=datetime.date(2024, 2, 1),
        start_time=datetime.time(9),
        duration=3,
        tour_guide_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    booking3 = Booking(
        id = 3,
        tourist_id=1, 
        tour_guide_id=2, 
        date=datetime.date(2024, 1, 15),
        start_time=datetime.time(13),
        duration=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    food = Specialty(
        id = 1,
        specialty="Food",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    history = Specialty(
        id = 2,
        specialty="History",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    adventure = Specialty(
        id = 3,
        specialty="Adventure",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    other = Specialty(
        id = 4,
        specialty="Other",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
        
    monday = Date(
        id=1,
        date="Monday",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    tuesday = Date(
        id=2,
        date="Tuesday",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    wednesday = Date(
        id=3,
        date="Wednesday",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    thursday = Date(
        id=4,
        date="Thursday",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    friday = Date(
        id=5,
        date="Friday",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    saturday = Date(
        id=6,
        date="Saturday",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    sunday = Date(
        id=0,
        date="Sunday",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()) 
    
    english = Language(
        id=1,
        language="English",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    spanish = Language(
        id=2,
        language="Spanish",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    chinese = Language(
        id=3,
        language="Chinese",
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    tour1 = TourGuide(
        id=1,
        guide_id=1, 
        city_id=1,
        language=english,
        price=40,
        about='Born and raised in NYC. I"ve spent a lot of money and time, traveling around, taking pictures and eating all over New York. Come with me on a journey to explore New York',
        dates=[monday, tuesday, saturday],
        specialties=[food],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    tour2 = TourGuide(
        id=2,
        guide=demo2,
        city_id=2,
        language=spanish,
        price=20,
        about='Born and raised in LA. I"ve spent a lot of money and time, traveling around, taking pictures and eating all over LA. Come with me on a journey to explore Los Angeles.',
        dates=[wednesday, friday, saturday, sunday],
        specialties=[other],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    tour3 = TourGuide(
        id=3,
        guide_id=2, 
        city_id=3,
        language=chinese,
        price=50,
        about='Born and raised in Seattle. I"ve spent a lot of money and time, traveling around, taking pictures and eating all over Seattle. Come with me on a journey to explore Seattle',
        dates=[friday, saturday, sunday],
        specialties=[adventure],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    tour3.dates.append(monday)

    review1 = Review(
        id=1,
        reviewer_id=3,
        guide_id=1,
        # communication_rating=5,
        # knowledgability_rating=4,
        # professionalism_rating=5,
        # average_rating=round(((5+4+5)/3), 2),
        rating=5,
        review_body='Demo was a very friendly person with lots of knowledge of the city',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    review2 = Review(
        id=2,
        reviewer_id=3,
        guide_id=2,
        # communication_rating=5,
        # knowledgability_rating=4,
        # professionalism_rating=5,
        rating=4,
        # average_rating=round(((5+4+5)/3), 2),
        review_body='Demo2 was a very friendly person with lots of knowledge of the city',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())
    
    review3 = Review(
        id=3,
        reviewer_id=1, 
        guide_id=2,
        # communication_rating=5,
        # knowledgability_rating=4,
        # professionalism_rating=5,
        # average_rating=round(((5+4+5)/3), 2),
        rating=4,
        review_body='Demo3 was a very friendly person with lots of knowledge of the city',
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now())

    db.session.add_all([
                   seattle, new_york, los_angeles, 
                   demo, demo2, demo3, 
                   monday, tuesday, wednesday, thursday, friday, saturday, sunday,
                   adventure, history, food, other,
                   english, spanish, chinese,
                   booking1, booking2, booking3,
                   tour1, tour2, tour3,
                   review1, review2, review3
                   ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()