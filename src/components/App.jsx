import React from "react";
import Header from "./Header/Header";
import {API_KEY_3, API_URL, fetchApi} from "../api/api";
import Cookies from 'universal-cookie';
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage"
import MoviePage from "./pages/MoviePage/MoviePage"
import { BrowserRouter, Route } from 'react-router-dom'

const cookies = new Cookies();

export const AppContext = React.createContext()
// console.log(AppContext)

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      user: null,
      session_id: null,
      showLoginModal: false,
      moviesFavorite: [],
      moviesWatchlist: []
    }
  }

  toggleLoginModal = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  }

  updateUser = user => {
    cookies.set("user_id", user.id)
    this.setState({
      user
    });
  }

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    })
    this.setState({
      session_id
    });
  }

  onLogOut = () => {
    cookies.remove("session_id")
    this.setState({
      session_id: null,
      user: null,
      moviesFavorite: [],
      moviesWatchlist: []
    })
    // this.toggleLoginModal()
  }

  getFavorite = (session_id, id) => {
    if (session_id){
      CallApi.get(`/account/${id}/favorite/movies`, {
        params: {
          session_id: session_id
        }
      })
        .then(data => {
          this.setState({
            moviesFavorite: data.results
          })
          // this.getMoviesResult()
        })
    }
  }

  getWatchlist = (session_id, id) => {
    if (session_id){
      CallApi.get(`/account/${id}/watchlist/movies`, {
        params: {
          session_id: session_id
        }
      })
        .then(data => {
          this.setState({
            moviesWatchlist: data.results
          })
        })
    }
  }

  componentDidMount() {
    const session_id = cookies.get("session_id")
    if (session_id) {
      fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
        .then(user => {
          this.updateUser(user)
          this.updateSessionId(session_id)
          this.getFavorite(session_id, user.id)
          this.getWatchlist(session_id, user.id)
        })
    }
  }

  render() {
    const {
      user,
      session_id,
      showLoginModal,
      moviesFavorite,
      moviesWatchlist
    } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider value={{
          user,
          session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          showLoginModal,
          toggleLoginModal: this.toggleLoginModal,
          getFavorite: this.getFavorite,
          getWatchlist: this.getWatchlist,
          moviesFavorite,
          moviesWatchlist
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
