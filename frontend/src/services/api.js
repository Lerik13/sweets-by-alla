import axios from "axios";
import { BASE_URL, PRODUCTS_URL, CATEGORY_URL, USERS_URL } from '../constants';

export function getProductDetails (id) {
	return axios
		.get(BASE_URL + PRODUCTS_URL + id )
		//.get(BASE_URL + PRODUCTS_URL, { params: { id } })
		.then(res => { console.log(res.data); return res.data; }) //console.log(res.data);
}

export function getProducts (pageParam, category = '', keyword = '', sortBy = null) {
	return axios
		.get(BASE_URL + PRODUCTS_URL, { params: { page: pageParam + 1 , category, keyword, sortBy } })
		.then(res => { return res.data; }) //console.log(res.data);
}

export function getCategories() {
	return axios
		.get(BASE_URL + CATEGORY_URL)
		.then(res => { return res.data; })
}

export function login(data) {
	return axios
		.post(BASE_URL + USERS_URL + '/auth', data)
}

export function logout() {
	return axios
		.post(BASE_URL + USERS_URL + '/logout')
}