import React from "react";
import CallApi from "../../api/api";
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
//
// const session_id = cookies.get("session_id")

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
        this.setState({
          movies: data.results,
          isLoading: false
        });
        this.props.onChangeTotalPages(data.total_pages)
      });
  }

  componentDidMount() { // что то положить в html или в дом дерево, на этом этапе происходит работа с сервером
    this.getMovies(this.props.filters, this.props.page);  // передаются начальные данные
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
