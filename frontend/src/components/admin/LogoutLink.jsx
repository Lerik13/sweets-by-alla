import { useEffect } from 'react';
import Button from '../Button';
import { useLogout } from '../../services/mutations';
import { ImExit } from "react-icons/im";

const LogoutBtn = () => {
	const logoutMutation = useLogout();

	const submitHandler = (e) => {
		e.preventDefault();
		logoutMutation.mutate();
	}

	useEffect(() => {
		if (logoutMutation.isError) {
			//toast.error(logoutMutation.error.message)
		}

		if (logoutMutation.isSuccess) {
			if (window) {
				window.location.href = "/login";
			}
		}
	}, [logoutMutation.status])

	return (
		<a 
			href="#"
			onClick={submitHandler}
			aria-label="Logout from admin dashboard"
			className="flex gap-2 pb-2 border-b-2 border-bgColor hover:border-brightRed duration-500 ease-out transition-all"
		>
			Logout <ImExit className="mt-[2px]" />
		</a>
	)
}

export default LogoutBtn