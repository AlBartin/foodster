from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from .. import models, schemas, oauth2
from sqlalchemy import func

router = APIRouter(
    prefix='/favorites',
    tags=['Favorites']
)
 
@router.get('/')
def get_favorites(id: int, db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user)):
    results = db.query(models.Favorite).filter(models.Favorite.owner_id == id).all()
    print(results)
    return results


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.Favorite)
def create_favorite(favorite: schemas.FavoriteCreate, db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user)):
    new_favorite = models.Favorite(owner_id=current_user.id, **favorite.dict())
    db.add(new_favorite)
    db.commit()
    db.refresh(new_favorite)

    return new_favorite

# @router.get('/{id}', response_model=schemas.PostOut)
# async def get_post(id: int, db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user)):
#     post = db.query(models.Post, func.count(models.Vote.post_id).label("votes")).join(models.Vote, models.Vote.post_id == models.Post.id, isouter=True).group_by(models.Post.id).filter(models.Post.id == id).first()
#     if not post:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} was not found")
#     return post

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_favorite(id: int, db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user)):
    # find the index in the array that has required ID

    favorite_query = db.query(models.Favorite).filter(models.Favorite.id == id)

    favorite = favorite_query.first()

    if favorite == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"favorite with id: {id} does not exist")

    if favorite.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "Not authorized to perform requested action")
    
    favorite_query.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.patch("/{id}", response_model=schemas.Favorite)
async def update_favorite(id: int, updated_favorite: schemas.FavoriteCreate, db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user)):

    favorite_query = db.query(models.Favorite).filter(models.Favorite.id == id)
    
    favorite = favorite_query.first()
    
    if favorite == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"favorite with id: {id} does not exist")
    
    if favorite.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "Not authorized to perform requested action")

    favorite_query.update(updated_favorite.dict(exclude_unset=True), synchronize_session=False)

    db.commit()

    return favorite_query.first()