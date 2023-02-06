import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import FavoriteCard from "../components/FavoriteCard.js";
import api from "../api/posts";

function Favorites() {
	const currentUser = useRecoilValue(currentUserState);
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

	useEffect(() => {
		getFavorites();

	}, []);
    console.log(favorites.map((favorite) => {return favorite}))
	const renderedFavorites = favorites.map((favorite) => 
		 <FavoriteCard key={favorite.id} favorite={favorite} />
	);

	return (
		<div>
			<h1>Favorited Businesses</h1>
			{renderedFavorites}
		</div>
	);
}

export default Favorites;
