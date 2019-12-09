import React from "react";
import Header from "./Header/Header";
import Cookies from 'universal-cookie';
import MoviesPage from "./pages/MoviesPage/MoviesPage"
import MoviePage from "./pages/MoviePage/MoviePage"
import { BrowserRouter, Route } from 'react-router-dom'
import {
  actionCreatorLogOut,
  actionCreatorToggleLoginModal,
  actionCreatorUpdateAuth,
  getFavoriteThunkCreator,
  getUserThunkCreator,
  getWatchlistThunkCreator
} from "../actions/actions";
import { connect } from "react-redux"

const cookies = new Cookies();

export const AppContext = React.createContext()

class App extends React.Component {
  // constructor() {
  //   super()
  //
  //   this.state = {
  //     user: null,
  //     session_id: null,
  //     showLoginModal: false,
  //     moviesFavorite: [],
  //     moviesWatchlist: []
  //   }
  // }

  // toggleLoginModal = () => {
    // this.setState(prevState => ({
    //   showLoginModal: !prevState.showLoginModal
    // }));
  // }

  // toggleLoginModal = () => {
  //   console.log('this.props.store.getState().showLoginModal', this.props.store.getState().showLoginModal)
  //   this.props.store.dispatch(
  //     actionCreatorShowLoginModal({
  //       showLoginModal: !this.props.store.getState().showLoginModal
  //     })
  //   )
  // }

  // updateAuth = (user, session_id) => {
  //   this.props.store.dispatch(
  //     actionCreatorUpdateAuth({
  //       user,
  //       session_id
  //     })
  //   )
  // }

  // updateUser = user => {
  //   cookies.set("user_id", user.id)
  //   this.setState({
  //     user
  //   });
  // }
  //
  // updateSessionId = session_id => {
  //   cookies.set("session_id", session_id, {
  //     path: "/",
  //     maxAge: 2592000
  //   })
  //   this.setState({
  //     session_id
  //   });
  // }

  // onLogOut = () => {
  //   this.props.store.dispatch(actionCreatorLogOut())
  //
  //
  //   // cookies.remove("session_id")
  //   // this.setState({
  //   //   session_id: null,
  //   //   user: null,
  //   //   moviesFavorite: [],
  //   //   moviesWatchlist: []
  //   // })
  //   // // this.toggleLoginModal()
  // }

  // getFavorite = (session_id, id) => {
  //   if (session_id){
  //     CallApi.get(`/account/${id}/favorite/movies`, {
  //       params: {
  //         session_id: session_id
  //       }
  //     })
  //       .then(data => {
  //         this.props.updateMoviesFavorite(data.results)
  //       })
  //   }
  // }

  // getWatchlist = (session_id, id) => {
  //   if (session_id){
  //     CallApi.get(`/account/${id}/watchlist/movies`, {
  //       params: {
  //         session_id: session_id
  //       }
  //     })
  //       .then(data => {
  //         this.props.updateMoviesWatchlist(data.results)
  //       })
  //   }
  // }

  componentDidMount() {
    this.props.getUser(this.props.session_id)
    // const {session_id} = this.props
    //
    // if (session_id) {
    //   CallApi.get("/account", {
    //     params: {
    //       session_id
    //     }
    //   }).then(user => {
    //       this.props.updateAuth(user, session_id)     // занесли данные о user в state
    //       this.getFavorite(session_id, user.id)   // server favorite -> state
    //       this.getWatchlist(session_id, user.id)  // server watchlist -> state
    //     })
    // }



    // const session_id = cookies.get("session_id")
    // if (session_id) {
    //   fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
    //     .then(user => {
    //       this.updateUser(user)     // занесли данные о user в state
    //       this.updateSessionId(session_id)    // session_id -> state
    //       this.getFavorite(session_id, user.id)   // server favorite -> state
    //       this.getWatchlist(session_id, user.id)  // server watchlist -> state
    //     })
    // }
  }

  render() {
    console.log('this.props => ', this.props)
    const {
      user,
      session_id,
      showLoginModal,
      moviesFavorite,
      moviesWatchlist,
      updateAuth,
      onLogOut,
      toggleLoginModal
    } = this.props;
    return (
      <BrowserRouter>
        <AppContext.Provider value={{
          user,
          session_id,
          showLoginModal,
          moviesFavorite,
          moviesWatchlist,
          updateUser: updateAuth,
          // updateSessionId: this.updateSessionId,
          onLogOut: onLogOut,
          toggleLoginModal: toggleLoginModal,
          getFavorite: this.props.getFavorite,
          getWatchlist: this.props.getWatchlist
        }}>
          <div>
            <Header
              user={user}
            />
            <Route exact path="/" component={MoviesPage}/>
            <Route path="/movie/:id" component={MoviePage}/>
            {/*
            "/" - MoviesPage
            "/movie" - Movie
            "/movie/1" - Movie with id = 1
          */}
          </div>
        </AppContext.Provider>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = (state) => {
  console.log('state=> ', state)
  return {
    user: state.reducerAuth.user,
    session_id: state.reducerAuth.session_id,
    showLoginModal: state.reducerAuth.showLoginModal,
    moviesFavorite: state.reducerAuth.moviesFavorite,
    moviesWatchlist: state.reducerAuth.moviesWatchlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (user, session_id) => dispatch(actionCreatorUpdateAuth({
      user,
      session_id
    })),
    onLogOut: () => dispatch(actionCreatorLogOut()),
    toggleLoginModal: () => dispatch(actionCreatorToggleLoginModal()),
    getFavorite: (session_id, id) => dispatch(getFavoriteThunkCreator({session_id, id})),
    getWatchlist: (session_id, id) => dispatch(getWatchlistThunkCreator({session_id, id})),
    getUser: (session_id) => dispatch(getUserThunkCreator({
      session_id
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
