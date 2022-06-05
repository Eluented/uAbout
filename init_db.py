from uabout.config.db_config import db, Users

# Clear it all out

db.drop_all()

# Set it back up

db.create_all()


########################################## Seeding Dummy Data ########################################
def example_data():

    Robyn = Users(first_name = "Robyn",
                 last_name = "Shortland",
                 username = "robbyn",
                 email = "robyn@outlook.com",
                 password = "seededpassword",
                 phone_number = "07127901245")

    Andrew = Users(first_name = "Andrew",
                 last_name = "Kennedy",
                 username = "robinhood",
                 email = "andrewken@outlook.com",
                 password = "seededpassword",
                 phone_number = "07151426323")
    
    Libby = Users(first_name = "Liberty",
                 last_name = "Sprackling",
                 username = "robby",
                 email = "libby@outlook.com",
                 password = "seededpassword",
                 phone_number = "071221388723")
    
    Onur = Users(first_name = "Onur",
                 last_name = "Belek",
                 username = "robster",
                 email = "onur@outlook.com",
                 password = "seededpassword",
                 phone_number = "075013298232")
    
    David = Users(first_name = "David",
                 last_name = "Quigley",
                 username = "robbin",
                 email = "david@outlook.com",
                 password = "seededpassword",
                 phone_number = "071292130923")

    db.session.add_all([Robyn, Andrew, Libby, Onur, David])
    db.session.commit()