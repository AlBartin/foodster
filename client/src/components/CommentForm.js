import React from 'react'


function CommentForm ({comment, changeComment}) {
  
    const editComment = (e) => {
        changeComment(e.target.value)        
    }
  
return (
    <div>
        <label>Comment: </label>
        <textarea
        placeholder='What was your experience here...'
        name="comment"
        rows="5" cols="60"
        onChange={editComment}></textarea>
    </div>
  )
}

export default CommentForm