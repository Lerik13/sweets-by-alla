const Button = ({ text, onClickHandler }) => {
	return (
		<button
			onClick={onClickHandler}
			className="px-12 py-3.5 align-baseline bg-brightRed text-bgColor border rounded-full border-brightRed transition-all duration-500 ease-out"
		>
			{text}
		</button>
	)
}

export default Button;
