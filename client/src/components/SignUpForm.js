import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import api from '../api/posts'

function SignUpForm() {
   
    let navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()
    const [signUpForm, setSignUpForm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

    const handleChange = (e) => setSignUpForm ({...signUpForm, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await api.post('users',{
                email: signUpForm.email,
                password: signUpForm.password
            })
            console.log(signUpForm)
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

return (    
    <div>        
        <h1> Sign Up </h1>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
                type='text'
                name='email'
                value={signUpForm.email}
                onChange={handleChange}
            />
            <label>Password</label>
            <input
                type='text'
                name='password'
                value={signUpForm.password}
                onChange={handleChange}
            />
            {/* <label>First Name</label>
            <input
                type='text'
                name='name'
                value={loginForm.firstname}
                onChange={handleChange}
            />
            <label>Last Name</label>
            <input
                type='text'
                name='lastname'
                value={loginForm.lastname}
                onChange={handleChange}
            /> */}
            <button>Sign Up</button>
    </form></div>
  )
}

export default SignUpForm