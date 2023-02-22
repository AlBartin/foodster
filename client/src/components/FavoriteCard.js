import { useState } from "react";
import Rating from "./Rating";
import Star from "./Star";

function FavoriteCard({ favorite, deleteFavorite }) {
	const [ratingChange, setRatingChange] = useState(favorite.rating);
	const [ratingShow, setRatingShow] = useState(false);
	const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
	const gradeIndex = favorite.rating;
	const index = favorite.rating;
	const activeStar = {
		fill: "yellow",
	};

	const handleDelete = () => {
		deleteFavorite(favorite.id)
	};
	const handleRatingShow = () => setRatingShow(!ratingShow);

	return (
		<div>
			<h3>{favorite.name}</h3>
			<img src={favorite.image_url} alt={favorite.name} />
			<h4>{favorite.price}</h4>
			<h4>
				{favorite.location_city},{favorite.location_state}
			</h4>
			{favorite.rating ? (
				<div>
					<div className="stars">
						{GRADES.map((grade, index) => (
							<Star
								rating={favorite.rating}
								style={
									gradeIndex != null && gradeIndex >= index
										? activeStar
										: {}
								}
							/>
						))}
					</div>
					<h4>Comment: {favorite.comment}</h4>
					<button onClick={handleRatingShow}>
						{ratingShow ? "Close" : "Edit Rating"}
					</button>
				</div>
			) : (
				<div>
					<button onClick={handleRatingShow}>
						{ratingShow ? "Close" : "Add Rating"}
					</button>
				</div>
			)}
			{ratingShow ? <h4>Rating: {<Rating favorite={favorite} />}</h4> : null}
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
}

export default FavoriteCard;
