import axios from "axios"
import { BASE_URL, PRODUCTS_URL } from '../constants';

export function getProducts(category, pageNumber) {
	return axios
		.get(BASE_URL + PRODUCTS_URL, { params: { category, pageNumber } })  //{ params: { _sort: "name" } }
		.then(res => { return res.data; }) //console.log(res.data);
}
