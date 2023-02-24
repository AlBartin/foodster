import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { currentUserState, currentAuthState } from "../recoil/atoms";
import api from "../api/posts";

function LoginForm() {
	let navigate = useNavigate();
	const userRef = useRef();
	const errRef = useRef();
	const [loginForm, setLoginForm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const [currentAuth, setCurrentAuth] = useRecoilState(currentAuthState);

	// useEffect(() => {
	//     userRef.current.focus()
	// }, [])

	// useEffect(() => {
	//     setErrorMessage('')
	// }, [currentUser, pass])

	const handleChange = (e) =>
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	console.log(loginForm);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post(
				"login",
				{
					username: loginForm.username,
					password: loginForm.password,
				},
				{
					headers: {
						"content-type": "multipart/form-data",
					},
				}
			);
			setCurrentUser(response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
			navigate("/businesses", { replace: true });
		} catch (err) {
			if (!err?.response) {
				setErrorMessage("No Server Response");
			} else if (err.response?.status === 400) {
				setErrorMessage("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrorMessage("Unauthorized");
			} else {
				setErrorMessage("Login Failed");
			}
			// errRef.current.focus()
		}
	};

	return (
		<div>
			<h1> Sign In </h1>
			<form onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					type="text"
					name="username"
					value={loginForm.username}
					onChange={handleChange}
				/>
				<label>Password</label>
				<input
					type="text"
					name="password"
					value={loginForm.password}
					onChange={handleChange}
				/>
				<button>Sign In</button>
			</form>
		</div>
	);
}

export default LoginForm;
