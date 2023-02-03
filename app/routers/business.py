from fastapi import Response, status, HTTPException, Depends, APIRouter
import requests
from .. import schemas
from typing import List


router = APIRouter(
    prefix='/businesses',
    tags=['Businesses']
)

API_KEY =
search_api_url = 'https://api.yelp.com/v3/businesses/search'
#params = {'term': 'coffee', 'limit': 10, 'radius': 10000, 'location': 'Riverside'}
headers = {'Authorization': f'Bearer {API_KEY}'}

@router.get('/', response_model=schemas.BusinessList)
def get_businesses(term:str, location: str, radius: int):
    response = requests.get(search_api_url, params={'term': term, 'location': location, 'limit': 10, 'radius': radius}, headers=headers)
    data_dict = response.json()
    return data_dict