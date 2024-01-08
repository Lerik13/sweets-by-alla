import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ param_keyword = '' }) => {
	const [keyword, setKeyword] = useState(param_keyword);

	const submitHandler = (e) => {
		if (keyword.trim()) {
			setKeyword('');
			document.querySelectorAll(".link-search").forEach(link => link.setAttribute('href', `/search/${keyword}`))
		} else {
			e.preventDefault();
		}
	}

	const keyUpHandler = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			document.querySelectorAll(".link-search").forEach(link => link.click())
		}
	}

	return (
		<div className='flex flex-row items-center'>
			<input
				className="p-2 border rounded border-veryLightGray w-[10rem] text-sm"
				name="search"
				type="text"
				placeholder="Search sweets..."
				required
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				onKeyUp={(e) => keyUpHandler(e)}
			/>
			<a href='/search' className="link-search ml-[6px]" onClick={submitHandler}>
				<FaSearch />
			</a>
		</div>
	)
}

export default SearchBox