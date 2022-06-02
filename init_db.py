from uabout.database.db_config import db, User

# Clear it all out

db.drop_all()

# Set it back up

db.create_all()

# Seed data

u = User(first_name="Jeff", last_name="Adonis", email="jeff@outlook.com", 
password="bruh123", phone ="051232130123")

db.session.add(u)
db.session.commit(u)