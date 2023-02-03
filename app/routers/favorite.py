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

@router.get('/', response_model=List[schemas.FavoriteOut])
#@router.get('/')
async def get_favorites(db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user), limit: int=10, skip: int= 0, search: Optional[str] = ""):
    #posts = db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()
    results = db.query(models.Favorite(owner_id=current_user.id)).all()
    
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

# @router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
# async def delete_post(id: int, db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user)):
#     # find the index in the array that has required ID

#     post_query = db.query(models.Post).filter(models.Post.id == id)

#     post = post_query.first()

#     if post == None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} does not exist")

#     if post.owner_id != current_user.id:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "Not authorized to perform requested action")
    
#     post_query.delete(synchronize_session=False)
#     db.commit()
    
#     return Response(status_code=status.HTTP_204_NO_CONTENT)

# @router.put("/{id}", response_model=schemas.Post)
# async def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db), current_user: int= Depends(oauth2.get_current_user)):

#     post_query = db.query(models.Post).filter(models.Post.id == id)
    
#     post = post_query.first()
    
#     if post == None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} does not exist")
    
#     if post.owner_id != current_user.id:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "Not authorized to perform requested action")

#     post_query.update(updated_post.dict(), synchronize_session=False)

#     db.commit()

#     return post_query.first()