import CallApi from "../api/api";

export const actionCreatorUpdateAuth = (payload) => {
  return {
    type: "UPDATE_AUTH",
    payload
  }
}

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT"
  }
}

export const actionCreatorToggleLoginModal = (payload) => {
  return {
    type: "TOGGLE_LOGIN_MODAL",
    payload
  }
}

export const actionCreatorMoviesFavorite = (payload) => {
  return {
    type: "MOVIES_FAVORITE",
    payload
  }
}

export const actionCreatorMoviesWatchlist = (payload) => {
  return {
    type: "MOVIES_WATCHLIST",
    payload
  }
}

export const getUserThunkCreator = ({session_id}) => (dispatch) => {
  if (session_id) {
    CallApi.get("/account", {
      params: {
        session_id
      }
    }).then(user => {
      dispatch(actionCreatorUpdateAuth({user, session_id}))     // занесли данные о user в state
      dispatch(getFavoriteThunkCreator({session_id, id: user.id}))
      dispatch(getWatchlistThunkCreator({session_id, id: user.id}))
    }).catch(err => console.log('err =>', err))
  }
}

export const getFavoriteThunkCreator = ({session_id, id}) => dispatch => {
  if (session_id){
    CallApi.get(`/account/${id}/favorite/movies`, {
      params: {
        session_id: session_id
      }
    })
      .then(data => {
        dispatch(actionCreatorMoviesFavorite({moviesFavorite: data.results}))
      })
  }
}

export const getWatchlistThunkCreator = ({session_id, id}) => dispatch => {
  if (session_id){
    CallApi.get(`/account/${id}/watchlist/movies`, {
      params: {
        session_id: session_id
      }
    })
      .then(data => {
        dispatch(actionCreatorMoviesWatchlist({moviesWatchlist: data.results}))
      })
  }
}