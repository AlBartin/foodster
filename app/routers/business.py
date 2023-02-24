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
business_api_url = 'https://api.yelp.com/v3/businesses'
headers = {'Authorization': f'Bearer {API_KEY}'}

@router.get('/', response_model=schemas.BusinessList)
def get_businesses(term:str, location: str, radius: int):
    response = requests.get(search_api_url, params={'term': term, 'location': location, 'limit': 10, 'radius': radius}, headers=headers)
    data_dict = response.json()
    return data_dict

@router.get('/{id}')
def get_business(id:str):
    response = requests.get(business_api_url, params={'business_id_or_alias': id}, headers=headers)
    print(response.text)
    data_dict = response.json()
    return data_dict