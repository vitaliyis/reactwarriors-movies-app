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

  getGenresId = (arr, id) => {
    if (arr.indexOf(String(id)) === -1) {
      return false
    }
    return true
  }

  componentDidMount() {
    this.getGenres()
  }

  // onChange = (event) => {
  //   console.log('event.target.value => ', event.target.value)
  //   let a = [...this.state.genresChecked]
  //   a.push(event.target.value)
  //   this.setState({
  //     genresChecked: a
  //   })
  // }

  render() {
    const { genres } = this.state
    const { onChangeGenres, genres_by } = this.props
    return (
      <div className="mt-2">
        {genres.map(genre => {
          return (
            <div className="form-check" key={genre.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={genre.id}
                name={genre.name}
                value={genre.id}
                onChange={onChangeGenres}
                checked={this.getGenresId(genres_by, genre.id)}
              />
              <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
            </div>
          )
        })}

      </div>

    )
  }
}