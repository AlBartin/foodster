import React, { useState } from 'react';
import Star from './Star';
import api from '../api/posts';
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atoms";

const RatingStars = ({ favorite }) => {

    const [gradeIndex, setGradeIndex] = useState();
    const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    const activeStar = {
        fill: 'yellow'
    };

    const changeGradeIndex = ( index ) => {
        setGradeIndex(index);
    }
    console.log(favorite)


    return (
        <div className="container">
            <h1 className="result">{ GRADES[gradeIndex] ? GRADES[gradeIndex] : 'You didn\'t review yet'}</h1>
            <div className="stars">
                {
                    GRADES.map((grade, index) => (
                        <Star 
                            index={index} 
                            key={grade} 
                            changeGradeIndex={changeGradeIndex}
                            style={ gradeIndex >= index ? activeStar : {}}
                            favorite={favorite}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default RatingStars;