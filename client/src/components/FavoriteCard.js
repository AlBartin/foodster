import { useState } from 'react'
import Rating from './Rating'
import Star from './Star'

function FavoriteCard({ favorite }) {
  
  const [ratingChange, setRatingChange] = useState(favorite.rating)
  const [ratingShow, setRatingShow] = useState(false)
  const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const gradeIndex = favorite.rating
  const index = favorite.rating
  const activeStar = {
    fill: 'yellow'
};

  const handleRatingChange = e => setRatingChange({...ratingChange, [e.target.name]: e.target.value })

  const handleRatingShow = () => setRatingShow(true)
//     const handleEditRating = async () => {
//         {
//             rating: ratingChange.rating
//         }
//         try {
//             const response = api.patch(`/favorites/${favorite.id}`, 
//             {rating:  
//                 {headers: {'Authorization': `Bearer ${currentUser.access_token}`}}
                
//             )
//         }        
//     }

//     }
  console.log(favorite)
    
    return (
    <div>

        <h3>{favorite.name}</h3>
        <img src={favorite.image_url} alt={favorite.name}/>
        <h4>{favorite.price}</h4>
        <h4>{favorite.location_city},{favorite.location_state}</h4>
        {favorite.rating || ratingShow ? 
        <div>
            <h4>Rating: {<Rating favorite={favorite} />}</h4><br/>
            <div className='stars'>
            { GRADES.map((grade, index) => (
            <Star rating={favorite.rating}
            style={ gradeIndex != null && gradeIndex >= index ? activeStar : {}}/>))}
            </div>
            <h4>Comment: {favorite.comment}</h4>
            <button onClick={handleRatingChange}>Edit Rating</button>
            </div>
            :
            <button onClick={handleRatingShow}>Add Rating</button>
        }

    </div>
  )
}

export default FavoriteCard