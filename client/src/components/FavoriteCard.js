import React from 'react'

function FavoriteCard({ favorite }) {
  
  
    return (
    <div>FavoriteCard
        <h3>{favorite.name}</h3>
        <img src={favorite.image_url} alt={favorite.name}/>
        <h4>{favorite.price}</h4>
        <h4>{favorite.location.city},{favorite.location.state}</h4>
    </div>
  )
}

export default FavoriteCard