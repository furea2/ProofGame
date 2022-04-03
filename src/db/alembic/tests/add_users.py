from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
engine = create_engine('sqlite:///db.sqlite3')

Session = sessionmaker(engine)

import sys
sys.path.append("D:\\Users\\furea2\\NodejsProjects\\login_sample\\src\\db\\alembic\\app\\models")
from user import User

userList=[
    User(username='wendy'),
    User(username='mary'),
    User(username='fred')
]

if __name__=='__main__':
    with Session() as session:
        session.add_all(userList)
        session.commit()
