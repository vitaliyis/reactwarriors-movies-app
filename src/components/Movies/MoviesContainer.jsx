import React, { Component } from "react";
import MoviesList from "./MoviesList";
import { API_URL, API_KEY_3 } from "../../api/api";
import qs from 'query-string';

export default class MoviesContainer extends Component {
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
      api_key: API_KEY_3,
      language: "ru-RU",
      page: page,
      sort_by: sort_by,
      primary_release_year: year_by,
      with_genres: with_genres
    }

    // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${year_by}&with_genres=${with_genres}`;
    const link = `${API_URL}/discover/movie?${qs.stringify(queryStringParams, {arrayFormat: 'comma'})}`;
    this.setState({
      isLoading: true
    });

    fetch(link)
      .then(response => response.json())
      .then(data => {
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
      <MoviesList
        movies={movies}
        isLoading={isLoading}
      />
    );
  }
}
