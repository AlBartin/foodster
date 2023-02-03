import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import FavoriteCard from '../components/FavoriteCard.js'
import api from '../api/posts'

function Favorites() {

    const currentUser = useRecoilValue(currentUserState)
    const [favorites, setFavorites] = useState([])

    console.log(currentUser)

    const getFavorites = () => {
        try {
            const response = api.get('favorites',
            {headers: {'Authorization': `Bearer ${currentUser.access_token}`}})
            setFavorites(response.data)
            }
        catch(error) {
            console.log(error)
            }
        }

    useEffect(() => {
        getFavorites()
        }, [])

    const renderedFavorites = favorites.map((favorite) => {<FavoriteCard key={favorites.id} favorite={favorite}/>})

  return (
    <div>
        <h1>Favorited Businesses</h1>
        {renderedFavorites}
    </div>
  )
}

export default Favorites