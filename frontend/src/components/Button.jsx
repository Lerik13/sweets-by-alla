const Button = ({ text, desc='', isSubmit=false, onClickHandler, disabled = false }) => {
	if (isSubmit) {
		return (
			<button
				type="submit"
				className="btn"
				aria-label={desc || text}
				disabled={disabled}
				aria-disabled={disabled}
			>
				{text}
			</button>
		)
	} else {
		return (
			<button
				onClick={onClickHandler}
				className="btn"
				aria-label={desc || text}
				disabled={disabled}
				aria-disabled={disabled}
			>
				{text}
			</button>
		)
	}
}

export default Button;
