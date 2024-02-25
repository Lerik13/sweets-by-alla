import { Fragment, useState } from 'react';
import { useCategories, useProductsForSearch } from "../services/queries";
import ProductElement from './ProductElement';
import SearchBox from './SearchBox';
import Loader from './Loader';
import Button from './Button';

export function ProductSearchResult({ param_category = '', param_keyword = '' }) {
	const [category, setCategory] = useState(param_category);
	const [keyword_, setKeyword_] = useState(param_keyword);
	const [keyword, setKeyword] = useState(param_keyword);
	
	const categoriesQuery = useCategories();
	const categories = categoriesQuery?.data || [];

	const productsQuery = useProductsForSearch(category, keyword);

	const selectCategoryHandle = (e) => {
		setCategory(e.target.value);
	}

	//const style_inactive = 'flex justify-center h-10 px-6 border-b border-veryLightGray';
	//const style_active = 'flex justify-center h-10 px-6 border-b text-brightRed border-brightRed';

	const keyUpHandler = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitHandler(e);
		}
	}

	const submitHandler = (e) => {
		setKeyword(keyword_.trim());
	}

	return (
		<div className="flex flex-col space-y-10">
			<div className="flex flex-col md:flex-row gap-4 items-center mt-10">
				<div className="flex items-center gap-2">
					<span>choose Category:</span>
					<select
						name="select-category"
						className="select-box p-2 border border-veryLightGray rounded"
						onChange={selectCategoryHandle}
						value={category}
					>
						<option value="">All sweets</option>
						{categories.map(c => (
							<option key={c._id} value={c.name} className="">{c.name}</option>
						))}
					</select>
				</div>
				<div className="flex items-center gap-2">
					<span>Search:</span>
					{/* <SearchBox param_keyword={keyword}  /> */}

					<div className='flex flex-row items-center'>
						<input
							className="p-2 border rounded border-veryLightGray w-[10rem] text-sm"
							name="search"
							type="text"
							placeholder="Search sweets..."
							required
							value={keyword_}
							onChange={(e) => setKeyword_(e.target.value)}
							onKeyUp={(e) => keyUpHandler(e)}
						/>
						<button
							aria-label="Search product"
							className="link-search ml-[6px]"
							onClick={submitHandler}
						>
							<img src="/search.svg" alt='Search' width='20px' />
						</button>
					</div>
				</div>
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
