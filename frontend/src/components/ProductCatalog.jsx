import { Fragment, useState } from 'react';
import { useProductsForCatalog } from "../services/queries";
import ProductElement from './ProductElement';
import Loader from './Loader';
import Button from './Button';

export function ProductCatalog({ param_category = 'cake' }) {
	const [category, setCategory] = useState(param_category);

	const productsQuery = useProductsForCatalog(category);

	const style_inactive = 'flex justify-center h-10 px-6 border-b border-veryLightGray';
	const style_active = 'flex justify-center h-10 px-6 border-b text-brightRed border-brightRed';

	return (
		<div className="flex flex-col space-y-10">
			<div className="w-max mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-3 col-auto items-center overflow-hidden transition md:text-base font-semibold">
				<button
					id="link-cake"
					aria-label="Show Cakes"
					onClick={() => setCategory("cake")}
					className={category==="cake" ? `${style_active}` : `${style_inactive}`}
				>
					Cakes
				</button>
				<button
					id="link-cupcake"
					aria-label="Show Cupcakes"
					onClick={() => setCategory("cupcake")}
					className={category==='cupcake' ? `${style_active}` : `${style_inactive}`}
				>
					Cupcakes
				</button>
				<button
					id="link-cake-pop"
					aria-label="Show Cake Pops"
					onClick={() => setCategory("cake pop")}
					className={category==="cake pop" ? `${style_active}` : `${style_inactive}`}
				>
					Cake pops
				</button>
				<button
					id="link-gluten-free"
					aria-label="Show Gluten Free Desserts"
					onClick={() => setCategory("gluten-free dessert")}
					className={category==='gluten-free dessert' ? `${style_active}` : `${style_inactive}`}
				>
					Gluten-free desserts
				</button>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
				{productsQuery.data?.pages.map((group, index) => (
					<Fragment key={index}>
						{group.map((product) => (
							<ProductElement id={product._id} name={product.name} image={product.image} key={product._id} />
						))}
					</Fragment>
				))}
			</div>

			{(productsQuery?.fetchStatus === 'fetching' || productsQuery?.status === 'loading') && (
				<Loader />
			)}

			<div className='mt-5 flex justify-center'>
				<Button
					text= "Load More"
					desc="Load more products"
					onClickHandler={() => productsQuery.fetchNextPage()}
					disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
				/>
			</div>
			
		</div>
	)
}
