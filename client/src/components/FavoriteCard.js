import { useState } from "react";
import api from "../api/posts";
import Rating from "./Rating";
import Star from "./Star";
import BusinessDetail from "./BusinessDetail";
import { detailBusinessState, detailPopUpState, detailLocationState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

function FavoriteCard({ favorite, deleteFavorite }) {
	const {id, name, image_url, location_city, location_state, rating, price, comment, business_id}=favorite
	const [ratingShow, setRatingShow] = useState(false);
	const [business, setBusiness] = useRecoilState(detailBusinessState);
	const [popUp, setPopUp] = useRecoilState(detailPopUpState);
	const [locationDetail, setLocationDetail] = useRecoilState(detailLocationState);

	const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
	const gradeIndex = rating;
	const activeStar = {
		fill: "yellow",
	};

	const handleDelete = () => deleteFavorite(id)
	const handleRatingShow = () => setRatingShow(!ratingShow);
  	const handlePopUp = async () => {
	
		setPopUp(true)
			try {
				const response = await api.get(`businesses/${business_id}`, {
					params: { id: business_id },
				});
				console.log(response.data);
				setBusiness(response.data);
				setLocationDetail(response.data.location.display_address)
			} catch (error) {
				console.log(error);
			}
	}
		
	return (
		<div >
			<div>
			<h3>{name}</h3>
			<img onClick={handlePopUp} src={image_url} alt={name} />
			<h4>{price}</h4>
			<h4>
				{location_city},{location_state}
			</h4>
			{rating ? (
				<div>
					<div className="stars">
						{GRADES.map((grade, index) => (
							<Star
								key={grade}
								rating={rating}
								style={
									gradeIndex != null && gradeIndex >= index
										? activeStar
										: {}
								}
							/>
						))}
					</div>
					<h4>Comment: {comment}</h4>
					<button onClick={handleRatingShow}>
						{ratingShow ? "Close" : "Edit Rating"}
					</button>
				</div>
			) : (
				<div>
					<button onClick={handleRatingShow}>{ratingShow ? "Close" : "Add Rating"}</button>
				</div>
			)}
			{ratingShow ? <h4>Rating: {<Rating favorite={favorite} />}</h4> : null}
			<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
}

export default FavoriteCard;
