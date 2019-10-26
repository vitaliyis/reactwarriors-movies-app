import React from 'react'
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";
import Icon from '@material-ui/core/Icon';

class FavoriteIcon extends React.Component {

  // Женя вопрос по этой переменной: сделать ее в классе или вынести за класс или вообще
  // надо по другому делать?
  markFavorite = false;

  toggleFavorite = () => {
    if (this.props.session_id) {
      CallApi.post(`/account/${this.props.user.id}/favorite`, {
        params: {
          session_id: this.props.session_id
        },
        body: {
          "media_type": "movie",
          "media_id": this.props.item.id,
          "favorite": !this.markFavorite
        }
      }).then(() => {
        this.props.getFavorite(this.props.session_id, this.props.user.id)
      })

    } else {
      this.props.toggleLoginModal()
    }
  }

  getOneFavorite = () => {
    return this.props.moviesFavorite.some((item) => {
      return item.id === this.props.item.id
    })
  }

  render() {
    this.markFavorite = this.getOneFavorite()
    return (
      <Icon onClick={this.toggleFavorite}>
        { this.markFavorite ? "favorite" : "favorite_border"}
      </Icon>
    )
  }
}

export default AppContextHOC(FavoriteIcon)