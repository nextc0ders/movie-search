import { useEffect, useState } from 'react';
import './App.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

function App() {
	const [page, setPage] = useState(1);
	const [movie, setMovie] = useState([]);
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');

	const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
			setPage(1);
		}, 500)

		return () => clearTimeout(handler);
	}, [query]);


	useEffect(() => {
		const url = debouncedQuery
			? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}&page=${page}`
			: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

		fetch(url)
			.then(res => res.json())
			.then(data => {
				if (data.results) {
					setMovie(data.results);
				}
			})
			.catch(err => console.error(err))
	}, [debouncedQuery, page, API_KEY]);

	return (
		<div className="app-container">

			<header>
				{/* TODO
					нужно сгенерировать логотип и сделать роутинг на главную страницу
				*/}
				<h1 className="title">Movie Search</h1>
			</header>

			{/* TODO
				нужно сделать очистку поиска
			*/}
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
						<h3>{m.title}</h3>
						<img
							src={m.poster_path ? IMG_URL + m.poster_path : "https://placehold.co/200x300"}
							alt={m.title}
						/>
					</li>
				))}
			</ul>

			<div className="pagination">
				<button
					disabled={page === 1}
					onClick={() => setPage(prev => prev - 1)}
				>
					Назад
				</button>

				<span>Старница {page}</span>

				<button
					onClick={() => setPage(prev => prev + 1)}
				>
					Вперед
				</button>
			</div>

		</div>
	)
}

export default App