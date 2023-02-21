import React from 'react';
import api from '../api/posts';
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";

const Star = (props) => {

    const currentUser = useRecoilValue(currentUserState)
    const favRating = props.index
    const id = props.favorite.id
    console.log(id)
    const changeGrade = async (e) => {
            try {
                props.changeGradeIndex(e.target.value)
                const ratingInt = parseInt(props.index)
                const response = await api.patch(`favorites/${id}`, 
                {
                    rating: props.index
                },
                {   headers: { Authorization: `Bearer ${currentUser.access_token}` },
                    params: { id: currentUser.user }
                });
            } catch (error) {
                console.log(error);
            }
        }

    return (
        <label className="star">
            <input
                type="radio"
                name="rating"
                id={props.grade}
                value={props.index}
                className="stars_radio-input"
                onClick={changeGrade}
            />
            <svg 
                width="58" 
                height="58" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#393939" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={props.style}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        </label>
    );
}

export default Star;