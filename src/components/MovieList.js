import React, { useState } from 'react'
import Movie from './Movie'
import InfiniteScroll from 'react-infinite-scroll-component';

const MovieList = ({movies, viewMovieInfo, getMovies, SEARCH_API, searchFor, nextPage}) => {

    const [pageNo, setPageNo] = useState(0)
   
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <InfiniteScroll dataLength = {movies.length}
                        next = {nextPage}
                        hasMore = {true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                            </p>
                        }
                        >
                        {movies.map((movie) => (
                            <Movie key = {movie.id} 
                                image = {movie.poster_path} 
                                release_date = {movie.release_date} 
                                title = {movie.title} 
                                vote_average ={movie.vote_average} 
                                viewMovieInfo = {viewMovieInfo} 
                                movieId = {movie.id} 
                            />
                        ))
                        }
                    </InfiniteScroll>
                        
                </div>
            </div>
        </div>
    )                 
}
export default MovieList


/* release_date title vote_average */