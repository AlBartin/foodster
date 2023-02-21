import { useEffect, useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import FavoriteCard from "../components/FavoriteCard.js";
import api from "../api/posts";

function Favorites() {
	const currentUser = useRecoilValue(currentUserState);
	const [favorites, setFavorites] = useState([]);
	const [priceFilter, setPriceFilter] = useState();
	const [sortedFavs, setSortedFavs] = useState(favorites)

	useEffect(() => {
		getFavorites();
	}, []);

	const getFavorites = async () => {
		try {
			const response = await api.get("favorites", {
				headers: { Authorization: `Bearer ${currentUser.access_token}` },
				params: { id: currentUser.user },
			});
			setFavorites(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getFilteredList = () => {
		if (!priceFilter) {
			return favorites;
		}
		return favorites.filter((fav) => fav.price === priceFilter);
	};
	const filteredList = useMemo(getFilteredList, [priceFilter, favorites]);

	const handleChange = (e) => {
		setPriceFilter(e.target.value);
	};

	const renderedFavorites = filteredList.map((favorite) => (
		<FavoriteCard key={favorite.id} favorite={favorite} />
	));

	const compare = (a, b, ascendingOrder) => {
		if (a < b) {
		  return ascendingOrder ? -1 : 1;
		}
		if (a > b) {
		  return ascendingOrder ? 1 : -1;
		}
		return 0;
	  }
	const handleSort = (value) => {
		if(value == 'none'){
			setFavorites([...favorites])
		} else {
		  let toType, toAscending
		  switch(value){
			case 'ascending' : toType = true; toAscending = true; break;
			case 'descending' : toType = true; toAscending = false; break;
			// case 'high' : toType = false; toAscending = true; break;
			// case 'low' : toType = false; toAscending = false; break;
		  }
		  let current = [...favorites]
		  current.sort((a, b) => toType ?
				 compare(a.name, b.name, toAscending) 
				 : 
				 compare(a.price, b.price, toAscending))
		  setFavorites([...current])
		}
	  }

	return (
		<div>
			<h1>Favorite Businesses</h1>

		<label> 
			Sort By:
			<select onChange={(e) => handleSort(e.target.value)}>
				<option value="none">Default</option>
				<option value="ascending">Alphabetically, A-Z</option>
				<option value="descending">Alphabetically, Z-A</option>
				{/* <option value="high">Low to high</option>
				<option value="low">High to low</option> */}
			</select>
			</label>
			<label>
				Filter By Price:
				<select value={priceFilter} onChange={handleChange}>
					<option value="$">$</option>
					<option value="$$">$$</option>
					<option value="$$$">$$$</option>
					<option value={""}>all</option>
				</select>
			</label>

			{renderedFavorites}
		</div>
	);
}

export default Favorites;
