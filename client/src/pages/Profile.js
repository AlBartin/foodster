import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import Logout from '../components/Logout'
import api from '../api/posts'

function Profile() {
    const [postForm, setPostForm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const currentUser = useRecoilValue(currentUserState)


    const handleChange = (e) => setPostForm ({...postForm, [e.target.name]: e.target.value})
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await api.post('posts',{
                title: postForm.title,
                content: postForm.content
            },
            {headers: {
              'Authorization': `Bearer ${currentUser.access_token}`
            }
        })
        }
        catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response')
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized')
            } else {
                setErrorMessage('Login Failed')
            }
            // errRef.current.focus()
        }
    }

    return (
    <div>
        <h1>Profile</h1>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type='text'
                name='title'
                value={postForm.title}
                onChange={handleChange}
            />
            <label>Content</label>
            <input
                type='text'
                name='content'
                value={postForm.content}
                onChange={handleChange}
            />
            <button>Create Post</button>
        </form>
        <Logout />
    </div>
  )
}

export default Profile