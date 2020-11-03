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
  const [allPage, setAllPage] = useState(1)
  const [searchPage, setSearchPage] = useState(1)

  const API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b4541729378510982ba7490b1bf63950&page=1";
  const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=b4541729378510982ba7490b1bf63950&query=";
  const IMG_API = "https://image.tmdb.org/t/p/w1280";  
  const API_KEY = "b4541729378510982ba7490b1bf63950"

  useEffect(() => { 
      getMovies(API);
    }, []);

  const getMovies = (api) => {
    fetch(api)
    .then((res) => res.json())
    .then((data) => {  
      setMovies(data ? data.results : []);
      console.log('hello')
      console.log(data)
    });
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchFor) {
      getMovies(SEARCH_API + searchFor);
    }  
  };

  const onChange = (e) => {
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

  const nextPage = () => {
    if (!searchFor) {
      fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b4541729378510982ba7490b1bf63950&page=${allPage+1}`)
      /*fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}${searchFor ?  '&query='+searchFor : ''}&page=${currentPage+1}`)*/
      .then((res) => res.json())
      .then(({results=[]}) => {
        setMovies( [ ...movies, ...results ]);
        setAllPage(allPage+1)          
      });
    }
    

    else {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=b4541729378510982ba7490b1bf63950&query=${searchFor}&page=${searchPage+1}`)
      /*fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}${searchFor ?  '&query='+searchFor : ''}&page=${currentPage+1}`)*/
        .then((res) => res.json())
        .then(({results=[]}) => {
          setMovies( [ ...movies, ...results ]);
          setSearchPage(searchPage+1)          
        });
      setSearchFor(searchFor)   
    }
     
  }

  

  const numberOfPages = Math.floor(totalResults / 20);

  return (
    <div className = "App">
        <Navbar />  
        <br />
        {currentMovie == null ? 
          <div>
            <Search handleSubmit = {handleSubmit} onChange = {onChange} movies = {movies} />
            <MovieList movies = {movies} viewMovieInfo = {viewMovieInfo} getMovies = {getMovies} nextPage = {nextPage}  
            searchFor = {searchFor} SEARCH_API = {SEARCH_API} />
          </div> :
          <MovieInfo closeMovieInfo = {closeMovieInfo} currentMovie = {currentMovie}/>}                
        <br/>
    </div>    
  );
}

export default App;
