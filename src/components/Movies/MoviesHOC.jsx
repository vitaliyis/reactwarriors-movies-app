import React from "react";
import CallApi from "../../api/api";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const session_id = cookies.get("session_id")
const user_id = cookies.get("user_id")

export default Component =>
  class MoviesHOC extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      isLoading: false
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, year_by, with_genres } = filters
    let moviesFavorite = []
    let moviesWatchlist = []
    const queryStringParams = {
      language: "ru-RU",
      page: page,
      sort_by: sort_by,
      primary_release_year: year_by,
      with_genres: with_genres
    }

    this.setState({
      isLoading: true
    });

    CallApi.get("/discover/movie", {
      params: queryStringParams
    })
      .then(async data => {
        if (session_id){
          await CallApi.get(`/account/${user_id}/favorite/movies`, {
            params: {
              session_id: session_id
            }
          })
            .then(data => {
              moviesFavorite = data.results.concat()
              console.log('moviesFavorite =>', moviesFavorite)
            })

          await CallApi.get(`/account/${user_id}/watchlist/movies`, {
            params: {
              session_id: session_id
            }
          })
            .then(data => {
              moviesWatchlist = data.results.concat()
              console.log('moviesWatchlist =>', moviesWatchlist)
            })
        }

        // this.setState({
        //   movies: data.results,
        //   isLoading: false
        // });
        this.props.onChangeTotalPages(data.total_pages)

        // добавил свойство favorite к фильмам
        let moviesResultFavorite = data.results.map(item => {
          for (let i = 0; i < moviesFavorite.length; i++){
            if (item.id === moviesFavorite[i].id) {
              item.favorite = true
              return item
            }
          }
          if (item.favorite) {
            return item
          } else {
            item.favorite = false
            return item
          }
        })

        // добавил свойство watchlist к фильмам
        // получил список фильмов со свойствами favorite и watchlist
        let moviesResult = moviesResultFavorite.map(item => {
          for (let i = 0; i < moviesWatchlist.length; i++){
            if (item.id === moviesWatchlist[i].id) {
              item.watchlist = true
              return item
            }
          }
          if (item.watchlist) {
            return item
          } else {
            item.watchlist = false
            return item
          }
        })


        console.log('moviesResult', moviesResult)
        this.setState({
          movies: moviesResult,
          isLoading: false
        });

      });
  }

  async componentDidMount() { // что то положить в html или в дом дерево, на этом этапе происходит работа с сервером
    this.getMovies(this.props.filters, this.props.page);  // передаются начальные данные



    // if (session_id){
    //   const moviesFavorite = await CallApi.get(`/account/${user_id}/favorite/movies`, {
    //     params: {
    //       session_id: session_id
    //     }
    //   })
    //   console.log('moviesFavorite =>', moviesFavorite.results)
    // }

  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.props.onChangePage(1)
      this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page)
    }
  }

  render() {
    const { movies, isLoading } = this.state;
    return (
      <Component
        movies={movies}
        isLoading={isLoading}
      />
    );
  }
}
