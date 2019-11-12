import React from 'react'
import FavoriteIcon from "../../Movies/FavoriteIcon"
import WatchlistIcon from "../../Movies/WatchlistIcon"
import Image from "../../UI/Image";

const MoviePreview = (props) => {
  const { movie } = props
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <Image
            path={movie.poster_path}
            className="card-img movie-preview-img-width"
            alt=""
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{movie.original_title}</h3>
            <p className="card-text movie-page-card-text">{movie.overview}</p>
            <div className="d-flex mt-3">
              <FavoriteIcon item={movie} style={{fontSize: "2.5rem"}}/>
              <WatchlistIcon item={movie} style={{fontSize: "2.5rem"}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePreview