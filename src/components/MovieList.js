import React from 'react'
import Movie from './Movie'

const MovieList = ({movies, viewMovieInfo}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    {movies.map((movie) => {
                        return (
                            <Movie key = {movie.id} image = {movie.poster_path} release_date = {movie.release_date} title = {movie.title} vote_average ={movie.vote_average} viewMovieInfo = {viewMovieInfo} movieId = {movie.id} />
                        )
                    })
                    }    
                </div>
            </div>
        </div>
    )                 
}
export default MovieList


/* release_date title vote_average */