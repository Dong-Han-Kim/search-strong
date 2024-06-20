import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { search } from './assets/searchWord';
import { text } from '@fortawesome/fontawesome-svg-core';

function App() {
	const [value, setValue] = useState('');
	const [result, setResult] = useState([]);
	const [searched, setSearched] = useState(false);

	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		setValue(inputValue);
		setResult([]);
		setSearched(false);
	};

	function findValue() {
		const inputValue = value.toLowerCase();
		const searchFilter = search.filter((word) => word.sentence.toLowerCase().includes(inputValue));
		setResult(searchFilter);
		setSearched(true);
	}

	function findStrong(resultItem, strongValue) {
		if (!strongValue) return resultItem;
		const lowResultItem = resultItem.toLowerCase();
		const lowStrongValue = strongValue.toLowerCase();
		const startIndex = lowResultItem.indexOf(lowStrongValue);

		if (startIndex === -1) {
			return resultItem;
		}

		const endIndex = startIndex + strongValue.length;
		const front = resultItem.slice(0, startIndex);
		const strongWords = resultItem.slice(startIndex, endIndex);
		const back = resultItem.slice(endIndex);
		return (
			<span>
				{front}
				<strong>{strongWords}</strong>
				{back}
			</span>
		);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		findValue();
	};

	return (
		<main className="main">
			<section className="search">
				<form onSubmit={handleSubmit}>
					<input type="text" value={value} onChange={handleInputChange} />
					<button onClick={findValue}>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</form>
			</section>

			<section className="result">
				{result.length > 0 && (
					<ul className="result_list">
						{result.map((item) => {
							return <li key={item.id}>{findStrong(item.sentence, value)}</li>;
						})}
					</ul>
				)}
				{searched && result.length === 0 && '검색 결과가 없습니다. 검색어를 확인해주세요.'}
			</section>
		</main>
	);
}

export default App;
