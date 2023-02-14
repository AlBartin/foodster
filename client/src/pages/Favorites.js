import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import FavoriteCard from "../components/FavoriteCard.js";
import api from "../api/posts";

function Favorites() {
	const currentUser = useRecoilValue(currentUserState);
    const [random, setRandom] = useState(null)
	const [favorites, setFavorites] = useState([]);

	console.log(currentUser);

	const getFavorites = async () => {
		try {
			const response = await api.get("favorites", {
				headers: { Authorization: `Bearer ${currentUser.access_token}`}, params: { id: currentUser.user}}
			);

			setFavorites(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const renderedFavorites = favorites.map((favorite) => 
		 <FavoriteCard key={favorite.id} favorite={favorite} />
	);

    const handleClick = () => {
        const randNum = Math.floor(Math.random() * favorites.length);
        setRandom(favorites[randNum])
    }

    const handleBack = () => {
        setRandom(null)
    }

	useEffect(() => {
		getFavorites();

	}, []);


	return (
		<div>
			<h1>Favorited Businesses</h1>
            <button onClick={handleClick}>Random Business</button>
            <button onClick={handleBack}>Back</button>
			{random ? <FavoriteCard key={random.id} favorite={random} /> : renderedFavorites }
		</div>
	);
}

export default Favorites;
