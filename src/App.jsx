import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { search } from './assets/searchWord';

function App() {
	const [value, setValue] = useState('');
	const [result, setResult] = useState([]);
	const [searched, setSearched] = useState(false);
	const [autoComplete, setAutoComplete] = useState([]);

	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		setValue(inputValue);
		setResult([]);
		setSearched(false);
		fliterAutoComplete(inputValue);
	};

	const fliterAutoComplete = (inputValue) => {
		if (!inputValue) return setAutoComplete([]);
		const fliterValue = search
			.filter((item) => item.sentence.toLowerCase().includes(inputValue))
			.map((item) => item.sentence);
		setAutoComplete(fliterValue);
	};

	function findValue() {
		const inputValue = value.toLowerCase();
		if (inputValue.length === 0) {
			setResult([]);
			setSearched(true);
			setAutoComplete([]);
		} else {
			const searchFilter = search.filter((word) => word.sentence.toLowerCase().includes(inputValue));
			setResult(searchFilter);
			setSearched(true);
			setAutoComplete([]);
		}
	}

	function findStrong(resultItem, strongValue) {
		if (!strongValue) return null;
		const lowResultItem = resultItem.toLowerCase();
		const lowStrongValue = strongValue.toLowerCase();
		const startIndex = lowResultItem.indexOf(lowStrongValue);

		if (startIndex === -1) {
			return null;
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
			<div className="main_content">
				<section className="search">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="검색어를 입력하세요."
							value={value}
							onChange={handleInputChange}
						/>
						<button onClick={findValue}>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</form>
					{autoComplete.length > 0 && (
						<div className="auto_complete">
							<p className="auto_description">검색 가능한 추천 목록</p>
							<ul className="result_list">
								{autoComplete.map((item, i) => {
									return <li key={i}>{findStrong(item, value)}</li>;
								})}
							</ul>
						</div>
					)}
				</section>

				<section className="result">
					{result.length > 0 && (
						<ul className="result_list">
							{result.map((item) => {
								return <li key={item.id}>{findStrong(item.sentence, value)}</li>;
							})}
						</ul>
					)}
					{searched && result.length === 0 && '검색 결과가 없습니다. 검색어와 띄어쓰기를 확인해주세요.'}
				</section>
			</div>
		</main>
	);
}

export default App;
