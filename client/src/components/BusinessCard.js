import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import api from '../api/posts.js'

function BusinessCard({ business }) {

    const currentUser = useRecoilValue(currentUserState)
    console.log(currentUser)
    const handleClick = async () => {
        try {
            const response = await api.post('/favorites',
            {
            business_id: business.id,
            name: business.name,
            image_url: business.image_url,
            price: business.price,
            location_city: business.location.city,
            location_state: business.location.state,
            owner_id: currentUser.id
        },
        {headers: {'Authorization': `Bearer ${currentUser.access_token}`}}
        )
        console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h3>{business.name}</h3>
            <img src={business.image_url} alt={business.name} />
            <h4>{business.rating}</h4>
            <button onClick={handleClick}>Add to Favorites</button>
        </div>
    )
}

export default BusinessCard