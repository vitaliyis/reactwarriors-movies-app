import React from 'react';
import CallApi from "../../../../api/api";
import DefaultAvatar from "../../../../images/shadow.png"
import Image from "../../../UI/Image";
import Spinner from "../../../UI/Spinner";

class MovieCredits extends React.Component {
  state = {
    actors: [],
    isLoading: false
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    CallApi.get(`/movie/${this.props.match.params.id}/credits`)
      .then(data => {
        // console.log('data MovieCredits=> ', data.cast)
        this.setState({
          actors: data.cast,
          isLoading: false
        })
      })
  }

  render() {
    const {actors, isLoading} = this.state
    return (
      <div className="mt-3">
      {
        isLoading ? <Spinner/>
          :
          <div className="d-flex flex-wrap">
            {actors.length ? actors.map((item, index) => {
              return (
                <div className="card" style={{width: '9.8rem'}} key={index}>
                  {/*<img src={item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : DefaultAvatar}*/}
                       {/*className="card-img-top img-actors-avatar" alt=""/>*/}
                  <Image
                    path={item.profile_path}
                    defaultAvatar={DefaultAvatar}
                    className="card-img-top img-actors-avatar"
                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-text">
                      <span className="font-weight-bold d-block">{item.name}</span>
                      <span className="d-block">{item.character}</span>
                    </p>
                  </div>
                </div>
              )
            }) : null}

          </div>
      }
      </div>
    )
  }
}

export default MovieCredits