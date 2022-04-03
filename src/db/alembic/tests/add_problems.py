from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
engine = create_engine('sqlite:///db.sqlite3')

Session = sessionmaker(engine)

import sys
sys.path.append("D:\\Users\\furea2\\NodejsProjects\\login_sample\\src\\db\\alembic\\app\\models")
from problem import Problem

userList=[
    Problem(title='zero_le_one', body='theorem zero_le_one : 0 < 1 := sorry', difficulty=1),
    Problem(title='zero_le_two', body='theorem zero_le_two : 0 < 2 := sorry', difficulty=1),
    Problem(title='one_le_two', body='theorem one_le_two : 1 < 2 := sorry', difficulty=1),
]

if __name__=='__main__':
    with Session() as session:
        session.add_all(userList)
        session.commit()
