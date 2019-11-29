import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  showLoginModal: false,
  moviesFavorite: [],
  moviesWatchlist: []
}

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      cookies.set("user_id", action.payload.user.id)
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000
      })
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id
      }
    // case "SHOW_LOGIN_MODAL":
    //   return {
    //     ...state,
    //     showLoginModal: action.payload.showLoginModal
    //   }
    case "SHOW_LOGIN_MODAL":
      return {
        ...state,
        showLoginModal: !state.showLoginModal
      }
    case "LOGOUT":
      cookies.remove("session_id")
      cookies.remove("user_id")
      return {
        ...state,
        session_id: null,
        user: null,
        moviesFavorite: [],
        moviesWatchlist: []
      }
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

export default reducerAuth
