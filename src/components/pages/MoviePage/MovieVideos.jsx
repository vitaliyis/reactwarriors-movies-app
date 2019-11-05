import React from 'react';
import CallApi from "../../../api/api";

class MovieVideos extends React.Component {
  state = {
    movies: [],
    isLoading: false
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    CallApi.get(`/movie/${this.props.match.params.id}/videos`)
      .then(data => {
        console.log('data MovieVideos=> ', data.results)
        this.setState({
          movies: data.results,
          isLoading: false
        })
      })
  }

  render() {
    const {movies, isLoading} = this.state
    return (
      <div className="mt-3">
      {isLoading ? (
            <div className="d-flex justify-content-center w-100">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) :
          <table className="table">
            <thead>
            <tr>
              <th scope="col" style={{borderTop: 'none'}}>#</th>
              <th scope="col" style={{borderTop: 'none'}}>Type</th>
              <th scope="col" style={{borderTop: 'none'}}>Name</th>
            </tr>
            </thead>
            <tbody>
            {movies.length ? movies.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.type}</td>
                  <td>{item.name}</td>
                </tr>
              )
            }) : null}

            </tbody>
          </table>
      }
      </div>
    )
  }
}

export default MovieVideos