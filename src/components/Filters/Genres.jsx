import React from "react";
import PropTypes from "prop-types"
import GenresHOC from "./GenresHOC"

const Genres = ({genres, with_genres, onChangeGenres, getGenresId}) => (
  <div className="mt-2">
    <label>Жанры:</label>
    {genres.map(genre => {
      return (
        <div className="form-check" key={genre.id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={genre.id}
            name={genre.name}
            value={genre.id}
            onChange={onChangeGenres}
            checked={getGenresId(with_genres, genre.id)}
          />
          <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
        </div>
      )
    })}

  </div>
)

// Genres.defaultProps = {
//   genres: [],
//   with_genres: []
// }

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func,
  getGenresId: PropTypes.func
}

export default GenresHOC(Genres)