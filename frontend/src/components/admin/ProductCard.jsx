
const ProductCard = ({ product }) => {
	console.log("ProductCard")
	console.log(product)

	const submitHandler = (e) => {
		e.preventDefault();
	}

	return (
		<form
			className="border border-blue-900 p-2"
			name="form-edit-product"
			id="form-edit-product"
			onSubmit={submitHandler}
		>
			<h2 className="font-serif text-4xl lg:text-5xl text-center md:text-left">
					{product.name}
			</h2>
			<div className="grid grid-cols-2 border border-blue-500">
				<div className="">Name of product:</div>
				<div>
					<input
						className=""
						type="text"
					/>
				</div>
			</div>
		</form>
	)
}

export default ProductCard