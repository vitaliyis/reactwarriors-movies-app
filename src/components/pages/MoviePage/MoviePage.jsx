import React from 'react';
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon"
import WatchlistIcon from "../../Movies/WatchlistIcon"
import Tabs from "./Tabs";

class MoviePage extends React.Component{

  state = {
    movie: {}
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`)
      .then(data => {
        // console.log('data => ', data)
        this.setState({
          movie: data
        })
      })
  }

  render() {
    const { movie } = this.state

    return (
      <div className="container mt-4">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img"
                alt=""
                style={{maxWidth: "540px"}}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{movie.original_title}</h3>
                <p className="card-text movie-page-card-text">{movie.overview}</p>
                <div className="d-flex mt-3">
                  <FavoriteIcon item={movie} style={{fontSize: "2.5rem"}}/>
                  <WatchlistIcon item={movie} style={{fontSize: "2.5rem"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs movieId={movie.id}/>
      </div>

    );
  }
};

export default MoviePage

