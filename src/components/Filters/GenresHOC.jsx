import React from "react";
import {API_KEY_3, API_URL} from "../../api/api";
// import Genres from "./Genres"

export default Component => class GenresHOC extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  }

  getGenresId = (genres, id) => genres.indexOf(String(id)) !== -1

  onChangeGenres = (event) => {
    const newGenresBy = event.target.checked
      ? [...this.props.with_genres, event.target.value]
      : this.props.with_genres.filter(genre => String(genre) !== event.target.value)

    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: newGenresBy
      }
    })
  }

  componentDidMount() {
    this.getGenres()
  }

  render() {
    const { genres } = this.state
    const { with_genres } = this.props
    return (
      <Component
        genres={genres}
        with_genres={with_genres}
        onChangeGenres={this.onChangeGenres}
        getGenresId={this.getGenresId}
      />
    )
  }
}