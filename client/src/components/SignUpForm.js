import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import api from '../api/posts'
import axios from 'axios'

function SignUpForm() {
   
    let navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()
    const [signUpForm, setSignUpForm] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [avatarImage, setAvatarImage] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

    

    const handleFormChange = (e) => setSignUpForm ({...signUpForm, [e.target.name]: e.target.value})
    
    const handleImageChange = (e) => {
        const reader = new FileReader()

            reader.onload = function(onLoadEvent) {
            setImageSrc(onLoadEvent.target.result)
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const handleImageSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", imageSrc)
        formData.append("upload_preset", "ppjkc2zh")

        console.log(imageSrc)
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/chenkhov/image/upload", formData)
            setAvatarImage(response.data.public_id)
            }
        catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (avatarImage) {
        handleSubmit()
        }
    }, [avatarImage])

    const handleSubmit = () => {
        if (signUpForm.password != signUpForm.confirmPassword) {
            alert("passwords don't match")
        }
        else {
  
        try{
            const response = api.post('users',{
                email: signUpForm.email,
                password: signUpForm.password,
                username: signUpForm.username,
                avatar: avatarImage
            })
            setCurrentUser(response.data)
            navigate('/profile', { replace: true })
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
}

return (    
    <div>        
        <h1> Sign Up </h1>
        <form onSubmit={handleImageSubmit}>
            <label>Email</label>
            <input
                type='text'
                name='email'
                value={signUpForm.email}
                onChange={handleFormChange}
            />
            <label>Password</label>
            <input
                type='password'
                name='password'
                value={signUpForm.password}
                onChange={handleFormChange}
            />
            <label>Confirm Password</label>
            <input
                type='password'
                name='confirmPassword'
                value={signUpForm.confirmPassword}
                onChange={handleFormChange}
            />
            <label>Username</label>
            <input
                type='text'
                name='username'
                value={signUpForm.username}
                onChange={handleFormChange}
            />
            <label>Upload Profile Picture</label>
            <input
                type='file'
                name='avatar'
                value={signUpForm.avatar}
                onChange={handleImageChange}
            />
            {imageSrc?
            <div>
            <img src={imageSrc} style={{width:'250px'}}/>
            <button type='submit' onClick={()=>{handleImageSubmit(imageSrc)}}>Sign Up</button>
            </div>
            :
            <button type='submit' onClick={handleSubmit}>Sign Up</button>}
            
    </form></div>
  )
}

export default SignUpForm