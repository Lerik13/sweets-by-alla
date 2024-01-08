import axios from "axios"
import { BASE_URL, PRODUCTS_URL, CATEGORY_URL } from '../constants';

export function getProducts(category, pageNumber, keyword) {
	return axios
		.get(BASE_URL + PRODUCTS_URL, { params: { category, pageNumber, keyword } })  //{ params: { _sort: "name" } }
		.then(res => { return res.data; }) //console.log(res.data);
}

export function getCategories() {
	return axios
		.get(BASE_URL + CATEGORY_URL)
		.then(res => { return res.data; })
}
