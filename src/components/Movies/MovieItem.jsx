import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import FavoriteIcon from "./FavoriteIcon"
import WatchlistIcon from "./WatchlistIcon"

class MovieItem extends React.Component {

  state = {
    favorite: this.props.item.favorite,
    watchlist: this.props.item.watchlist
  }

  toggleFavorite = (id, favorite) => {
    CallApi.post(`/account/${this.props.user.id}/favorite`, {
      params: {
        session_id: this.props.session_id
      },
      body: {
        "media_type": "movie",
        "media_id": id,
        "favorite": !favorite
      }
    })

    this.setState(prev => ({
      favorite: !prev.favorite
    }))
  }

  toggleWatchlist = (id, watchlist) => {
    CallApi.post(`/account/${this.props.user.id}/watchlist`, {
      params: {
        session_id: this.props.session_id
      },
      body: {
        "media_type": "movie",
        "media_id": id,
        "watchlist": !watchlist
      }
    })

    this.setState(prev => ({
      watchlist: !prev.watchlist
    }))
  }

  render() {
    const { item } = this.props;
    // console.log('user111', user)
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="card-text">Media_id: {item.id}</div>
            <div className="d-flex mt-3">
              <FavoriteIcon item={item}/>
              <WatchlistIcon item={item}/>
            </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieItem)
