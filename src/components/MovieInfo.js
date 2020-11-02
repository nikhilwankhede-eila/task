import React from 'react'

const MovieInfo = ({closeMovieInfo, currentMovie}) => {
    return (
        <div className = "container">
            <div className="row" onClick = {closeMovieInfo} style = {{cursor:"pointer", paddingTop : 50 }} >
                <i className = "fas fa-arrow-left arrow"></i>
                <span className = "white-text" style = {{marginLeft:10}}>Go Back</span>
            </div>

            <div className = "row">
                <div className="col s12 m4">
                    {currentMovie.poster_path ==null ?
                        <img src="https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg" alt="Card image"
                        style = {{width:"100%", height:300}}/> :
                        <img src= {`http://image.tmdb.org/t/p/w185${currentMovie.poster_path}`} alt="Card image"
                        style = {{width:"100%", height:300}}/>}
                </div>

                <div className="col s12 m8 white-text">
                    <p>{currentMovie.title}</p>
                    <br />
                    <p>{currentMovie.release_date.substring(5).split("-").concat(currentMovie.release_date.substring(0,4)).join("/")}</p>
                    <br />
                    <p>{currentMovie.overview}</p>
                </div>
                                
            </div>

                
        </div>
    )
}

export  default MovieInfo
