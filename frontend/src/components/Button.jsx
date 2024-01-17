const Button = ({ text, onClickHandler }) => {
	return (
		<button
			onClick={onClickHandler}
			className="btn"
			ariaLabel={text}
		>
			{text}
		</button>
	)
}

export default Button;
