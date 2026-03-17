import { useEffect, useState } from 'react';
import './App.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

function App() {
	const [page, setPage] = useState(1);
	const [movie, setMovie] = useState([]);
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');
	const [contentType, setContentType] = useState('movie');

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
			? `https://api.themoviedb.org/3/search/${contentType}?api_key=${API_KEY}&query=${debouncedQuery}&page=${page}`
			: `https://api.themoviedb.org/3/${contentType}/popular?api_key=${API_KEY}&page=${page}`;

		fetch(url)
			.then(res => res.json())
			.then(data => {
				if (data.results) {
					setMovie(data.results);
				}
			})
			.catch(err => console.error(err))
	}, [debouncedQuery, page, contentType, API_KEY]);

	return (
		<>
			<header className='header'>
				{/* TODO
					нужно сгенерировать логотип и сделать роутинг на главную страницу
				*/}
				<div className="logo title">Movie Search</div>
				<nav className="nav">
					<div className="dropdown">
						<button className="dropbtn">
							{contentType === 'movie' ? 'Фильмы' : 'Сериалы'} ▼
						</button>
						<div className="division"></div>
						<div className="dropdown-content">
							
							<a href="#" onClick={() => {
									setContentType('movie');
									setPage(1);
									setQuery('');
							}}>Фильмы</a>

							<a href="#" onClick={() => {
									setContentType('tv');
									setPage(1);
									setQuery('');
							}}>Сериалы</a>

						</div>
					</div>
				</nav>

				<div className="dropdown">
					<button className="dropbtn">🌐</button>
					<div className="division"></div>
					<div className="dropdown-content lang">
						<a href="#" onClick={() => {
									
							}}>EN</a>

							<a href="#" onClick={() => {
									
							}}>RU</a>
					</div>
				</div>

			</header>

			<div className="app-container">
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
							<h3>{m.title || m.name}</h3>
							<img
								src={m.poster_path ? IMG_URL + m.poster_path : "https://placehold.co/200x300"}
								alt={m.title || m.name}
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
		</>
	)
}

export default App