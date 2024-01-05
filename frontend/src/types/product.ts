export type Category = {
	name: string;
	description?: string;
	order: number;
};

export interface Product {
	_id: number;
	name: string;
	image: string;
	images?: string[];
	category: string;
	description?: string;
	ingredients?: string;
	rating: number;
	order: number;
};

export type ProductType = {
	products: Product[];
	page: number;
	pages: number;
};