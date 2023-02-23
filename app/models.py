from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable = False, server_default=text('now()'))

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, nullable=False)
    business_id = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    location_city = Column(String, nullable=False)
    location_state = Column(String, nullable=False)
    price = Column(String, nullable=True)
    rating = Column(Integer, nullable=True)
    comment = Column(String, nullable=True)
    collection = Column(String, nullable = True)
    created_at = Column(TIMESTAMP(timezone=True), nullable = False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    
    owner = relationship('User')

# class Vote(Base):
#     __tablename__ = "votes"
#     user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
#     post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)