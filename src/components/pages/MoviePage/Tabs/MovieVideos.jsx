import React from 'react';
import CallApi from "../../../../api/api";
import Spinner from "../../../UI/Spinner";

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
        // console.log('data MovieVideos=> ', data.results)
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
        {isLoading ? <Spinner/>
          :
          <div>
            {movies.length ? movies.map((item, index) => {
              return (
                <div className="embed-responsive embed-responsive-21by9 mb-3" key={index}>
                  <iframe
                    className="embed-responsive-item"
                    // width={490}
                    // height={320}
                    src={`https://www.youtube.com/embed/${item.key}`}
                    frameBorder={0}
                    allowFullScreen
                  ></iframe>
                </div>

              )
            }) : <p>Not found video</p>}
          </div>

      }
      </div>
    )
  }
}

export default MovieVideos