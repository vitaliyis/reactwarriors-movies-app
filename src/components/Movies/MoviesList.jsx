import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  getMovies = (filters, page) => {
    // const sort_by = this.props.filters.sort_by
    const { sort_by, year_by, genres_by } = filters

    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${year_by}&with_genres=${genres_by}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.onChangeTotalPages(data.total_pages)
      });
  }

  componentDidMount() { // что то положить в html или в дом дерево, на этом этапе происходит работа с сервером
    // const sort_by = this.props.filters.sort_by
    // const {
    //    filters: {sort_by }
    //  } = this.props
    //
    // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    // fetch(link)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({
    //       movies: data.results
    //     });
    //   });
    this.getMovies(this.props.filters, this.props.page);  // передаются начальные данные
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate')
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.props.onChangePage(1)
      this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page)
    }

    if (this.props.filters.year_by !== prevProps.filters.year_by) {
      this.props.onChangePage(1)
      this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    }

    if (this.props.filters.genres_by !== prevProps.filters.genres_by) {
      this.props.onChangePage(1)
      this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
