import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC"

const MoviesList = ({movies, isLoading}) => (
    <div className="row">
      {isLoading ? (
          <div className="d-flex justify-content-center w-100">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) :
        movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
    </div>
  );

MoviesList.defaultProps = {
  movies: [],
  // isLoading: true
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
}

export default MoviesHOC(MoviesList)
