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

export const actionCreatorShowLoginModal = (payload) => {
  return {
    type: "SHOW_LOGIN_MODAL",
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