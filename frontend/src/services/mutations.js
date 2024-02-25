import { useMutation } from "@tanstack/react-query";
import { login, logout } from "./api";
import { client, userInfo } from "./store";

export function useLogin() {

	return useMutation(
		{
			mutationFn: (data) => login(data),

			onError: (err) => {
				if (err?.response?.data?.message) {
					err.message = err.response.data.message;
				}
				//throw new Error(err);
			},

			onSuccess: ({ data }) => {
				userInfo.set(data);
				localStorage.setItem('userInfo', JSON.stringify(data))
			},
		},
		client
	);
}

export function useLogout() {

	return useMutation(
		{
			mutationFn: () => logout(),

			onSuccess: () => {
				userInfo.set(null);
				localStorage.clear();
			},
		},
		client
	);
}