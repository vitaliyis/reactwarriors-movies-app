import React from "react";
import {API_KEY_3, API_URL} from "../../api/api";

export default class GenresBy extends React.Component {
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
  // genres.includes(String(id))

  onChangeGenres = (event) => {
    const newGenresBy = event.target.checked
      ? [...this.props.with_genres, event.target.value]
      : this.props.with_genres.filter(genre => String(genre) !== event.target.value)
    // let a = [...this.props.with_genres]   // записали предыдущие данные
    // let target = a.indexOf(event.target.value)
    // if ( target === -1) {
    //   a.push(event.target.value)
    // } else {
    //   a.splice(target, 1)
    // }

    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: newGenresBy
      }
    })
    // this.setState({
    //   filters: {...this.state.filters, with_genres : a}
    // })
  }

  componentDidMount() {
    this.getGenres()
  }

  render() {
    const { genres } = this.state
    const { with_genres } = this.props
    return (
      <div className="mt-2">
        <label>Жанры:</label>
        {genres.map(genre => {
          return (
            <div className="form-check" key={genre.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={genre.id}
                name={genre.name}
                value={genre.id}
                onChange={this.onChangeGenres}
                checked={this.getGenresId(with_genres, genre.id)}
              />
              <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
            </div>
          )
        })}

      </div>

    )
  }
}