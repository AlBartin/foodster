import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";
import api from "../api/posts.js";
import { useState } from "react";

function BusinessCard({ business }) {
	const [collection, setCollection] = useState(null);
	const currentUser = useRecoilValue(currentUserState);

    const handleChange = (e) => setCollection(e.target.value)
 
	const handleClick = async () => {
		try {
			const response = await api.post(
				"/favorites",
				{
					business_id: business.id,
					name: business.name,
					image_url: business.image_url,
					price: business.price,
					collection: collection,
					location_city: business.location.city,
					location_state: business.location.state,
					owner_id: currentUser.id,
				},
				{ headers: { Authorization: `Bearer ${currentUser.access_token}` } }
			);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h3>{business.name}</h3>
			<img src={business.image_url} alt={business.name} />
			<h4>{business.rating}</h4>
			<select onChange={handleChange}>
                <option value="">-</option>
				<option value="Food">Food</option>
				<option value="Bars">Bars</option>
				<option value="Health & Beauty">Health & Beauty</option>
				{/* <option value="other">Other</option> */}
			</select>
			<button onClick={handleClick}> {collection ? `Add to ${collection} Collection`: "Add to Favorites"}</button>
		</div>
	);
}

export default BusinessCard;
