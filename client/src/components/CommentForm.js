import React from 'react'


function CommentForm ({comment, changeComment}) {
  
    const editComment = (e) => {
        changeComment(e.target.value)        
    }
  
return (
    <div>
        <label>Comment: </label>
        <textarea
        name="comment"
        rows="5" cols="60"
        onChange={editComment}>What was your experience here...</textarea>
    </div>
  )
}

export default CommentForm