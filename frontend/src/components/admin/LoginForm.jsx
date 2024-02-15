import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Loader from '../Loader';
import { useLogin } from '../../services/mutations';
import { isLoggedIn } from "../../services/utils";

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const inputRef = useRef();
	const loginMutation = useLogin();

	useEffect(() => {
		if (isLoggedIn()) {
			if (window) {
				window.location.href = "/admin";
			}
		}
		inputRef.current.focus();
	}, [])

	useEffect(() => {
		if (loginMutation.isError) {
			toast.error(loginMutation.error.message)
		}

		if (loginMutation.isSuccess) {
			if (window) {
				window.location.href = "/admin";
			}
		}
	}, [loginMutation.status])
	

	const submitHandler = (e) => {
		e.preventDefault();
	
		loginMutation.mutate({ email, password });
	}

	return (<>
		{loginMutation.isLoading && <Loader />}
		{loginMutation.isError && (
			<p className="w-full text-left bg-red-600 text-white p-2 mt-5">
				{loginMutation.error.message}
			</p>
		)}

		<form
			name="form-login"
			id="form-login"
			className="mt-6"
			onSubmit={submitHandler}
		>
			<div className="input-wrapper">
				<input
					ref={inputRef}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="login"
					name="login"
					className="form-input"
					placeholder="E-mail"
					autoComplete="email"
					required
				/>
				<label htmlFor="login" className="form-label">
					E-mail
				</label>
			</div>
			<div className="input-wrapper">
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					id="password"
					name="password"
					className="form-input"
					placeholder="Password"
					autoComplete="current-password"
					required
				/>
				<label htmlFor="password" className="form-label">
					Password
				</label>
			</div>
			<div className="flex justify-center mt-2 border-0 border-blue-500">
				<Button text="Login" desc="Login to admin dashboard" isSubmit={true} disabled={loginMutation.isLoading} />
			</div>
		</form>

		<ToastContainer />
	</>)
}

export default LoginForm;

