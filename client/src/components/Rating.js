import React, { useState } from 'react';
import EditStar from './EditStar';
import CommentForm from './CommentForm'
import api from '../api/posts';
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";

const Rating = ({ favorite }) => {

    const [gradeIndex, setGradeIndex] = useState();
    const [ratingComment, setRatingComment] = useState()
    const currentUser = useRecoilValue(currentUserState)
    
    const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    const activeStar = {
        fill: 'yellow'
    };

    const changeGradeIndex = ( index ) => {
        setGradeIndex(index);
    }

    const changeComment = ( comment ) => {
        setRatingComment(comment)
    }

    const handleSubmit = async () => {
        try {        
            const response = await api.patch(`favorites/${favorite.id}`, 
            {
                rating: gradeIndex,
                comment: ratingComment
            },
            {   headers: { Authorization: `Bearer ${currentUser.access_token}` },
                params: { id: currentUser.user }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
        <div className="container">
            <h1 className="result">{ GRADES[gradeIndex] ? GRADES[gradeIndex] : 'You didn\'t review yet'}</h1>
            <div className="stars">
                {
                    GRADES.map((grade, index) => (
                        <EditStar 
                            index={index} 
                            key={grade} 
                            changeGradeIndex={changeGradeIndex}
                            style={ gradeIndex >= index ? activeStar : {}}
                            favorite={favorite}
                        />
                    ))}
            </div>
        </div>
        <CommentForm 
            comment={ratingComment}
            changeComment={changeComment}
            />
            <button type="submit">Submit</button>
    </form>
    );
}

export default Rating;