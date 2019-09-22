import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };

    let isLoader = false;
  }

  getMovies = (filters, page) => {
    // const sort_by = this.props.filters.sort_by
    const { sort_by, year_by, with_genres } = filters
    const qs = require('query-string');
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      page: page,
      sort_by: sort_by,
      primary_release_year: year_by,
      with_genres: with_genres
    }

    // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${year_by}&with_genres=${with_genres}`;
    const link = `${API_URL}/discover/movie?${qs.stringify(queryStringParams, {arrayFormat: 'comma'})}`;
    this.isLoader = true
    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.isLoader = false
        this.setState({
          movies: data.results
        });
        this.props.onChangeTotalPages(data.total_pages)
      });
  }

  componentDidMount() { // что то положить в html или в дом дерево, на этом этапе происходит работа с сервером
    this.getMovies(this.props.filters, this.props.page);  // передаются начальные данные
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate')
    if (this.props.filters !== prevProps.filters) {
      this.props.onChangePage(1)
      this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    }

    // if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
    //   this.props.onChangePage(1)
    //   this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    // }
    //
    // if (this.props.filters.year_by !== prevProps.filters.year_by) {
    //   this.props.onChangePage(1)
    //   this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    // }
    //
    // if (this.props.filters.with_genres !== prevProps.filters.with_genres) {
    //   this.props.onChangePage(1)
    //   this.getMovies(this.props.filters, 1)  // передаются данные которые отличаются от начальных
    // }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page)
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {this.isLoader ? (
          <div class="d-flex justify-content-center w-100">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) :
        movies.map(movie => {
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
