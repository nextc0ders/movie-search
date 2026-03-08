import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [movie, setMovie] = useState([]);
	const [query, setQuery] = useState('');
	const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

	useEffect(() => {

		const url = query
			? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
			: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

		fetch(url)
			.then(res => res.json())
			.then(data => {
				if (data.results) {
					setMovie(data.results);
				}
			})
			.catch(err => console.error(err))
	}, [query, API_KEY]);

	return (
		<div className="app">

			<header>
				<h1 className="title">Movie Search</h1>
			</header>

			<input
				type="text"
				className="search-input"
				placeholder="Поиск фильмов..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<ul className="movie-list">
				{movie.map((m) => (
					<li key={m.id} className="movie-item">
						{m.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App