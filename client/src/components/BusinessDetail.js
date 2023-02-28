import { detailPopUpState, detailBusinessState, detailLocationState } from "../recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";

function BusinessDetail({ business }) {
	const [popUp, setPopUp] = useRecoilState(detailPopUpState);
	const location = useRecoilValue(detailLocationState)

	const handlePopUp = () => {
		setPopUp(!popUp)
	}
	console.log(location)
	return (
		<div >
			{ business == null ?
			<h1>loading...</h1> :
			<div>
			<h1 onClick={handlePopUp}>{business.name}</h1> 
			<p>{location[0]}</p>
			<p>{location[1]}</p>
			{/* <img src={business.photos[0]} /> */}

			</div>
		}
		</div>
	);
}

export default BusinessDetail;
