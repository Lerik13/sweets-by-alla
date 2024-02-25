import { Fragment, useState } from 'react';
import { useCategories, useProductsForSearch, useProduct } from "../../services/queries";
import ProductElementList from './ProductElementList';
import SearchBox from '../SearchBox';
import Loader from '../Loader';
import Button from '../Button';
import ProductCard from './ProductCard';
import { FaRegEdit } from "react-icons/fa";
import '../../styles/popup.css';
//import { RiDeleteBin2Fill } from "react-icons/ri";


const ProductList = () => {
	const [category, setCategory] = useState("");
	const [keyword_, setKeyword_] = useState("");
	const [keyword, setKeyword] = useState("");
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [sortBy, setSortBy] = useState("order");

	const categoriesQuery = useCategories();
	const categories = categoriesQuery?.data || [];

	const productsQuery = useProductsForSearch(category, keyword, sortBy);
	const productQuery = useProduct(selectedProductId);


	const keyUpHandler = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitHandler(e);
		}
	}

	const submitHandler = (e) => {
		setKeyword(keyword_.trim());
	}

	const selectProductHandler = (e, id) => {
		e.preventDefault();
		//console.log("select Product: "+id)
		setSelectedProductId(id);
		togglePopup();
		//console.log(productQuery.data)
	}

	const togglePopup = () => {
		document.getElementById('popup-container').classList.toggle('invisible');
		document.getElementById('popup-bg').classList.toggle('opacity-0');
		document.getElementById('popup-bg').classList.toggle('opacity-50');
		document.getElementById('popup').classList.toggle('translate-x-full');
	}
	
	return (
		<div className="relative w-full flex flex-row gap-5 border border-red-500">
			<div className="w-full flex flex-col space-y-10 border border-blue-500">
				<div className="flex flex-col md:flex-row gap-4 items-center mt-10">
					<div className="flex items-center gap-2">
						<span>choose Category:</span>
						<select
							name="select-category"
							className="select-box p-2 border border-veryLightGray rounded"
							onChange={(e) => setCategory(e.target.value)}
							value={category}
						>
							<option value="">All sweets</option>
							{categories.map(c => (
								<option key={c._id} value={c.name} className="">{c.name}</option>
							))}
						</select>
					</div>

					<select
						name="sort-by"
						className="select-box p-2 border border-veryLightGray rounded"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value="order">Sort by Category & Order number</option>
						<option value="name">Sort by Name</option>
						<option value="id">Sort by input order</option>
					</select>

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
			
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
					{productsQuery.data?.pages.map((group, index) => (
						<Fragment key={index}>
							{group.map((product) => (
								/* <ProductElementList id={product._id} name={product.name} image={product.image} key={product._id} /> */
							<div key={product._id} className='flex items-center overflow-hidden gap-2 border border-red-500'>
								<div className="flex flex-initial overflow-hidden h-[8rem] w-[8rem] border border-blue-900">
									<img src={product.image} alt={product.name} width="300" height="300" className="object-cover w-full h-full" />
								</div>
								<div className="flex flex-auto flex-wrap font-medium pl-2 items-center border border-blue-900">
									{product.name}
								</div>
								<div className="border border-blue-900">
									<button
										className="text-xl h-fit p-4 border rounded mr-4 "
										aria-label="Edit product"
										onClick={ (e) => selectProductHandler(e, product._id) }
									>
										<FaRegEdit />
									</button>
								</div>
								
							</div>

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

			<div id="popup-container" className="fixed inset-0 w-full h-full invisible z-50">
				<div id="popup-bg" className="absolute inset-0 w-full h-full bg-navColor opacity-0 z-0 duration-500 ease-out transition-all flex align-middle" onClick={togglePopup}>
				</div>
				{/*<button id="btn-popup-close" aria-label="Close popup window" className="btn-close hover:border focus:border" onClick={togglePopup}>
					<span className="btn-close-left"></span><span className="btn-close-right"></span>
					overflow-scroll
				</button>*/}
					<div id="popup" className="absolute top-[2rem] md:top-[5rem] right-[1rem] md:right-[5rem] left-[1rem] md:left-[5rem] w-auto  h-auto flex flex-col justify-between  space-y-10 bg-bgColor translate-x-full duration-500 ease-out transition-all ">
						{(productQuery?.fetchStatus === 'fetching' || productQuery?.status === 'loading')
						? (
							<Loader />
						) : (productQuery && productQuery?.data)
						? (
							<ProductCard product={productQuery.data} />
						) : (
							<p>Choose product</p>
						)}
					</div>
			</div>
			{/*
			<div className="absolute inset-0 mx-auto flex flex-col border border-blue-500">
				{(productQuery?.fetchStatus === 'fetching' || productQuery?.status === 'loading')
				? (
					<Loader />
				) : (productQuery && productQuery?.data)
				? (
					<ProductCard product={productQuery.data} />
				) : (
					<p>Choose product</p>
				)}
				</div>
			*/}			
		</div>
	)
}

export default ProductList