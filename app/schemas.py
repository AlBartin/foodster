from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from pydantic.types import conint

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str
    avatar: Optional[str]

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: str
    avatar: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: int
    # refresh_token: str



class TokenData(BaseModel):
    id: Optional[str] = None

class FavoritesBase(BaseModel):
    business_id: Optional[str]
    name: Optional[str] = None
    image_url: Optional[str] = '../client/public/no_image_found.jpeg'
    price: Optional[str]
    rating: Optional[int]
    comment: Optional[str]
    collection: Optional[str]
    location_city: Optional[str]
    location_state: Optional[str]


class FavoriteCreate(FavoritesBase):
    pass

class Favorite(FavoritesBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: UserOut
    #comments: str

    class Config:
        orm_mode = True

class FavoriteOut(BaseModel):
    Favorite: Favorite

    class Config:
        orm_mode = True

class Business(BaseModel):
    id: Optional[str]
    name: Optional[str]
    image_url: Optional[str]
    url: Optional[str]
    categories: Optional[list]
    rating: Optional[int]
    price: Optional[str]
    location: Optional[dict]
    distance: Optional[int]
    class Config:
        orm_mode = True

class BusinessList(BaseModel):
    businesses: List[Business]

    class Config:
        orm_mode = True