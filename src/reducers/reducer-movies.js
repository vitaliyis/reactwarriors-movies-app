const initialState = {
  moviesFavorite: [],
  moviesWatchlist: []
}

const reducerMovies = (state = initialState, action) => {
  switch(action.type) {
    case "MOVIES_FAVORITE":
      return {
        ...state,
        moviesFavorite: action.payload.moviesFavorite
      }
    case "MOVIES_WATCHLIST":
      return {
        ...state,
        moviesWatchlist: action.payload.moviesWatchlist
      }
    default:
      return state
  }
}

export default reducerMovies