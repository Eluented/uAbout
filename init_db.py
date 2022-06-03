from uabout.database.db_config import db, Users

# Clear it all out

db.drop_all()

# Set it back up

db.create_all()

# Seed data

u = Users(first_name="Jeff", 
         username="sadadasd", 
         email="jeff@outlook.com", 
         password="bruh123", 
         phone_number ="051232130123")

db.session.add(u)
db.session.commit()