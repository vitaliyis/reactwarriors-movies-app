import React from 'react';

class MovieDetails extends React.Component {
  // state = {
  //   movie: {},
  //   isLoading: false
  // }
  //
  // componentDidMount() {
  //   this.setState({
  //     isLoading: true
  //   });
  //
  //   CallApi.get(`/movie/${this.props.match.params.id}`)
  //     .then(data => {
  //       console.log('data MovieDetail=> ', data)
  //       this.setState({
  //         movie: data,
  //         isLoading: false
  //       })
  //     })
  // }

  render() {
    const {movie} = this.props
    return (
      <div className="mt-3">
        <table className="table">
          <tbody>
          <tr>
            <th scope="row" style={{borderTop: 'none'}}>Статус</th>
            <td style={{borderTop: 'none'}}>{movie.status}</td>
          </tr>
          <tr>
            <th scope="row">Дата выхода</th>
            <td>{movie.release_date}</td>
          </tr>
          <tr>
            <th scope="row">Продолжительность</th>
            <td>{movie.runtime} минут</td>
          </tr>
          <tr>
            <th scope="row">Язык оригинала</th>
            <td>{movie.original_language}</td>
          </tr>
          <tr>
            <th scope="row">Страна</th>
            <td>{movie.production_countries ? movie.production_countries[0].name : null}</td>
          </tr>
          <tr>
            <th scope="row">Бюджет</th>
            <td>{movie.budget} $</td>
          </tr>
          <tr>
            <th scope="row">Сборы</th>
            <td>{movie.revenue} $</td>
          </tr>
          <tr>
            <th scope="row">Компания</th>

            <td>{movie.production_companies
              ? movie.production_companies.map(
                (item, index) => <p key={index} className="font-italic">"{item.name}"</p>)
              : null}
            </td>
          </tr>
          <tr>
            <th scope="row">Жанры</th>
            <td>{movie.genres
              ? movie.genres.map(
                (item, index) => <p key={index} className="text-uppercase">{item.name}</p>)
              : null}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieDetails