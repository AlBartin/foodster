import { useState } from "react";
import { useNavigate } from "react-router";
import Rating from "./Rating";
import Star from "./Star";

function FavoriteCard({ favorite, deleteFavorite, togglePopUp }) {
	const {id, name, image_url, location_city, location_state, rating, price, comment, business_id}=favorite
	const [ratingShow, setRatingShow] = useState(false);
	const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
	const gradeIndex = rating;
	const activeStar = {
		fill: "yellow",
	};

	const handleDelete = () => deleteFavorite(id)
	const handleRatingShow = () => setRatingShow(!ratingShow);
  	const handlePopUp = () => togglePopUp(business_id)

	return (
		<div >
			<h3>{name}</h3>
			{/* placed it on img to not interfere with other buttons */}
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
	);
}

export default FavoriteCard;
