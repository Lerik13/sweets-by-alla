import { useState } from 'react';
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import { client, categoryy, pageNumber, keywordSearch, productsList } from "./store";
import { getProducts, getCategories } from '../api/products';
import ProductElement from './ProductElement';
import SearchBox from './SearchBox';
import Loader from './Loader';
import Button from './Button';

export function ProductList({ param_category = 'cake', param_keyword = '' }) {
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	if (isFirstLoad) {
		categoryy.set(param_category);
		keywordSearch.set(param_keyword);
		setIsFirstLoad(false);
	}

	const category = useStore(categoryy) || "";
	const page = useStore(pageNumber) || 1;
	const keyword = useStore(keywordSearch) || "";
	const storeProducts = useStore(productsList);

	const categoriesQuery = useCategory();
	const categories = categoriesQuery?.data || [];

	const productsQuery = useProduct(category, page, keyword);
	const products = productsQuery?.data?.products || [];
	const pages = productsQuery?.data?.pages || 1;

	const allProducts = [...storeProducts];
	products.map(p => allProducts.push({'_id': p._id, 'name': p.name, 'image': p.image}))

	function loadMore() {
		if (page < pages) {
			pageNumber.set(page + 1);
			productsList.set(allProducts);
		}
		
	}

	const changeCategory = (category) => {
		pageNumber.set(1);
		categoryy.set(category);
		productsList.set([]);
	}

	const selectCategoryHandle = (e) => {
		changeCategory(e.target.value);
	}

	const style_inactive = 'flex justify-center h-10 px-6 border-b border-veryLightGray';
	const style_active = 'flex justify-center h-10 px-6 border-b text-brightRed border-brightRed';

	return (
	<div className="flex flex-col space-y-10">
		{(keyword !== '') ? (
			<div className="flex flex-col md:flex-row gap-4 items-center mt-10">
				<div className="flex items-center gap-2">
					<span>choose Category:</span>
					<select name="select-category" className="p-2 border border-veryLightGray rounded" onChange={selectCategoryHandle}>
						<option value="">All sweets</option>
						{categories.map(c => (
							<option key={c._id} value={c.name} className="">{c.name}</option>
						))}
					</select>
				</div>
				<div className="flex items-center gap-2">
					<span>Search:</span>
					<SearchBox param_keyword={keyword} />
				</div>
			</div>
		) : (
			<div className="w-max mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-3 col-auto items-center overflow-hidden transition md:text-base font-semibold">
				<button
					id="link-cake"
					ariaLabel="Show Cakes"
					onClick={() => changeCategory("cake")}
					className={category==="cake" ? `${style_active}` : `${style_inactive}`}
				>
					Cakes
				</button>
				<button
					id="link-cupcake"
					ariaLabel="Show Cupcakes"
					onClick={() => changeCategory("cupcake")}
					className={category==='cupcake' ? `${style_active}` : `${style_inactive}`}
				>
					Cupcakes
				</button>
				<button
					id="link-cake-pop"
					ariaLabel="Show Cake Pops"
					onClick={() => changeCategory("cake pop")}
					className={category==="cake pop" ? `${style_active}` : `${style_inactive}`}
				>
					Cake pops
				</button>
				<button
					id="link-gluten-free"
					ariaLabel="Show Gluten Free Desserts"
					onClick={() => changeCategory("gluten-free dessert")}
					className={category==='gluten-free dessert' ? `${style_active}` : `${style_inactive}`}
				>
					Gluten-free desserts
				</button>
			</div>
		)}

		{(productsQuery?.fetchStatus === 'fetching' || productsQuery?.status === 'loading') ? (
			<Loader />
		) : (
			<div className="">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
					{products && (
						allProducts.map((product) => (
							<ProductElement id={product._id} name={product.name} image={product.image} key={product._id} />
						))
					)}
				</div>
				{ (page < pages) && (
					<div className='mt-5 flex justify-center'>
						<Button text="Load more" desc="Load more products" onClickHandler={loadMore} />
					</div>
				)}
			</div>
		)}
	</div>
	)
}

const useProduct = (category, pageNumber, keyword) => {
	return useQuery(
		{
			queryKey: ["products", category, pageNumber, keyword],
			queryFn: () => getProducts(category, pageNumber, keyword),
		},
		client
	)
}

const useCategory = () => {
	return useQuery(
		{
			queryKey: ["categories"],
			queryFn: () => getCategories(),
		},
		client
	)
}
