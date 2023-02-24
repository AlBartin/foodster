import { useEffect, useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import FavoriteCard from "../components/FavoriteCard.js";
import BusinessDetail from "../components/BusinessDetail";
import api from "../api/posts";

function Favorites() {
	const currentUser = useRecoilValue(currentUserState);
    const [random, setRandom] = useState(null)
	const [favorites, setFavorites] = useState([]);
	const [priceFilter, setPriceFilter] = useState();
	const [popUp, setPopUp] = useState(false)
	const [businessId, setBusinessId] = useState()

	useEffect(() => {
		getFavorites();
	}, []);
 
	const getFavorites = async () => {
		try {
			const response = await api.get("favorites", {
				headers: { Authorization: `Bearer ${currentUser.access_token}` },
				params: { id: currentUser.user },
			});
			setFavorites(response.data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
		} catch (error) {
			console.log(error);
		}
	};

	const deleteFavorite = async (id) => {
		try {
			await api.delete(`favorites/${id}`, { headers: { Authorization: `Bearer ${currentUser.access_token}` } })
			setFavorites(favorites => favorites.filter( favorite => { return favorite.id !== id} ))
		} catch (error) {
			console.log(error);
		}
	}

    const handleClick = () => {
        const randNum = Math.floor(Math.random() * favorites.length);
        setRandom(favorites[randNum])
    }
    const handleBack = () => {
        setRandom(null)
    }
	const handleChange = (e) => {
		setPriceFilter(e.target.value);
	};
	const getFilteredList = () => {
		if (!priceFilter) {
			return favorites;
		}
		return favorites.filter((fav) => fav.price === priceFilter);
	};

	const filteredList = useMemo(getFilteredList, [priceFilter, favorites]);
	const togglePopUp = (id) => {
		setPopUp(!popUp)
		setBusinessId(id)
}
	const renderedFavorites = filteredList.map((favorite) => (
		<FavoriteCard key={favorite.id} favorite={favorite} deleteFavorite = {deleteFavorite} togglePopUp={togglePopUp} />
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
			case 'high' : toType = false; toAscending = true; break;
			case 'low' : toType = false; toAscending = false; break;
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
			{popUp ? (<BusinessDetail togglePopUp={togglePopUp} id={businessId}/>) : (
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
					<button onClick={handleClick}>Random Business</button>
					<button onClick={handleBack}>Back</button>
					{random ? (
						<FavoriteCard
							key={random.id}
							favorite={random}
							deleteFavorite={deleteFavorite}
							togglePopUp={togglePopUp}
						/>
					) : (renderedFavorites)
					}
				</div>
			)}
		</div>
	);
}

export default Favorites;
