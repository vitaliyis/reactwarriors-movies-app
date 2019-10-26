import React from 'react'
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import Icon from '@material-ui/core/Icon';

class WatchlistIcon extends React.Component {

  // Женя вопрос по этой переменной: сделать ее в классе или вынести за класс или вообще
  // надо по другому делать?
  markWatchlist = false;

  toggleWatchlist = () => {
    if (this.props.session_id) {
      CallApi.post(`/account/${this.props.user.id}/watchlist`, {
        params: {
          session_id: this.props.session_id
        },
        body: {
          "media_type": "movie",
          "media_id": this.props.item.id,
          "watchlist": !this.markWatchlist
        }
      }).then(() => {
        this.props.getWatchlist(this.props.session_id, this.props.user.id)
      })

    } else {
      this.props.toggleLoginModal()
    }
  }

  getOneWatchlist = () => {
    return this.props.moviesWatchlist.some((item) => {
      return item.id === this.props.item.id
    })
  }

  render() {
    this.markWatchlist = this.getOneWatchlist()
    return (
      <Icon onClick={this.toggleWatchlist}>
        { this.markWatchlist ? "bookmark" : "bookmark_border"}
      </Icon>
    )
  }
}

export default AppContextHOC(WatchlistIcon)