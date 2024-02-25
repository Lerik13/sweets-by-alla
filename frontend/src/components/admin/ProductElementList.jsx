const ProductElementList = ({ id, name, image }) => {

	return (
		<a href={`/product/${id}`}
			aria-label="Go to product page"
			className='h-[12rem] overflow-hidden flex flex-col'
		>
			<div className="overflow-hidden h-[12rem] lg:h-[14rem] xl:h-[20rem]">
				<img src={image} alt={name} width="300" height="300" className="object-cover w-full h-full hover:scale-110 transition-all duration-300 ease-out" />
			</div>
			<span className="font-medium pl-2 flex items-center h-[2rem] truncate">{name}</span>
		</a>
	)
}

export default ProductElementList;