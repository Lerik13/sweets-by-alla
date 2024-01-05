import { useState } from 'react';
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import { client, categoryy, pageNumber, productsList } from "./store";
import { getProducts } from '../api/products';
import ProductElement from './ProductElement';
import Loader from './Loader';
import Button from './Button';

export function ProductList({ param_category }) {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
		
	if (isFirstLoad) {
		if (param_category) {
			categoryy.set(param_category);
		} else {
			categoryy.set('cake');
		}
		setIsFirstLoad(false);
	}
	const category = useStore(categoryy);
	
	const page = useStore(pageNumber) || 1;
	const storeProducts = useStore(productsList);

	const productsQuery = useProduct(category, page);
	
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

	const style_inactive = 'flex justify-center h-10 px-6 border-b border-veryLightGray';
	const style_active = 'flex justify-center h-10 px-6 border-b text-brightRed border-brightRed';

	return (
		<div className="flex flex-col space-y-10">
			<div className="w-max mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-3 col-auto items-center overflow-hidden transition md:text-base font-semibold">
				<button
					id="link-cake"
					onClick={() => changeCategory("cake")}
					className={category==="cake" ? `${style_active}` : `${style_inactive}`}
				>
					Cakes
				</button>
				<button
					id="link-cupcake"
					onClick={() => changeCategory("cupcake")}
					className={category==='cupcake' ? `${style_active}` : `${style_inactive}`}
				>
					Cupcakes
				</button>
				<button
					id="link-cake-pop"
					onClick={() => changeCategory("cake pop")}
					className={category==="cake pop" ? `${style_active}` : `${style_inactive}`}
				>
					Cake pops
				</button>
				<button
					id="link-gluten-free"
					onClick={() => changeCategory("gluten-free dessert")}
					className={category==='gluten-free dessert' ? `${style_active}` : `${style_inactive}`}
				>
					Gluten-free desserts
				</button>
			</div>
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
							<Button text="Load more" onClickHandler={loadMore} />
						</div>
					)}
				</div>
			)}
		</div>
	)
}

const useProduct = (category, pageNumber) => {
	return useQuery(
		{
			queryKey: ["products", category, pageNumber],
			queryFn: () => getProducts(category, pageNumber),
		},
		client
	)
}