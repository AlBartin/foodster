from fastapi import Response, status, HTTPException, Depends, APIRouter
import requests
from .. import schemas
from typing import List


router = APIRouter(
    prefix='/businesses',
    tags=['Businesses']
)

API_KEY = 'TmifJu0Or4uaZdxcPqQkzYF8LDCdSlnwyKM3O3M9_fn06mLVucjKdwGk0QdN8uSe5PW5nBX_i8Bzl_SHO6G6kyAienNOMbjaZgIAucO3USfaJALC3Av9u1809ATHY3Yx'
search_api_url = 'https://api.yelp.com/v3/businesses/search'
#params = {'term': 'coffee', 'limit': 10, 'radius': 10000, 'location': 'Riverside'}
headers = {'Authorization': f'Bearer {API_KEY}'}

@router.get('/', response_model=schemas.BusinessList)
def get_businesses(term:str, location: str, radius: int):
    response = requests.get(search_api_url, params={'term': term, 'location': location, 'limit': 10, 'radius': radius}, headers=headers)
    data_dict = response.json()
    return data_dict