import React, {useState, useEffect} from 'react'
import './App.css';
import Navbar from './components/Navbar'
import Search from './components/Search'
import MovieList from './components/MovieList'
import MovieInfo from './components/MovieInfo'
import Pagination from './components/Pagination'


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchFor, setSearchFor] = useState('')
  const [currentMovie, setCurrentMovie] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b4541729378510982ba7490b1bf63950&page=1";
  const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=b4541729378510982ba7490b1bf63950&query=";
  const IMG_API = "https://image.tmdb.org/t/p/w1280";  
  const API_KEY = "b4541729378510982ba7490b1bf63950"


  useEffect(() => {
    fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchFor) {
      fetch(SEARCH_API + searchFor)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          console.log(data.total_results)
          setMovies(data.results);
          setTotalResults(data.total_results)          
        });      
    }    
  } 

  const onChange = (e) => {
    console.log(e.target.value)
    setSearchFor(e.target.value)
  }

  const viewMovieInfo = (id) => {
      const filteredMovie = movies.filter(movie => movie.id ==id)
      const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
      setCurrentMovie(newCurrentMovie)
  }

  const closeMovieInfo = () => {
      setCurrentMovie(null)
  }

  const nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchFor}&page=${pageNumber}`)
    .then((res) => res.json())
    .then((data) => {
      setMovies(data.results);
      setCurrentPage(pageNumber)          
    });
  }

  const numberOfPages = Math.floor(totalResults / 20);

  return (
    <div className = "App">
        <Navbar />  
        <br />
        {currentMovie == null ? 
          <div>
            <Search handleSubmit = {handleSubmit} onChange = {onChange} />
            <MovieList movies = {movies} viewMovieInfo = {viewMovieInfo} />
          </div> :
          <MovieInfo closeMovieInfo = {closeMovieInfo} currentMovie = {currentMovie}/>}
          { totalResults > 20 ? <Pagination pages = {numberOfPages} nextPage = {nextPage} currentPage = {currentPage}/> : '' }
          
        <br/>
    </div>
    
  );
}

export default App;
