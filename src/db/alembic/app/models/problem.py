
from venv import create
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

engine = create_engine('sqlite:///db.sqlite3')
Base = declarative_base()

class Problem(Base):
    __tablename__ = 'problems'
    id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(String)
    difficulty = Column(Integer)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime, nullable=True)

    # def __repr__(self):
    #     return "<User('name={}', fullname={}, nickname={})>".format(
    #                 self.name, self.fullname, self.nickname)
