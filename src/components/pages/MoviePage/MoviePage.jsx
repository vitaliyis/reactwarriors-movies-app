import React from 'react';
import CallApi from "../../../api/api";
import Tabs from "./Tabs/Tabs";
import MovieDetails from "./Tabs/MovieDetails";
import MovieVideos from "./Tabs/MovieVideos";
import MovieCredits from "./Tabs/MovieCredits";
import {Switch, Route, Redirect} from "react-router-dom";
import {Row, Col } from "reactstrap";
import MoviePreview from "./MoviePreview";
import Spinner from "../../UI/Spinner";

class MoviePage extends React.Component{

  state = {
    movie: {},
    isLoading: false
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    CallApi.get(`/movie/${this.props.match.params.id}`)
      .then(data => {
        // console.log('data => ', data)
        this.setState({
          movie: data,
          isLoading: false
        })
      })
  }

  render() {
    const { movie, isLoading } = this.state

    return (
      <div className="container mt-4">
        {isLoading ? <Spinner/>
          :
          <div>
            <MoviePreview
              movie={movie}
            />
            <Tabs />
            <Row>
              <Col sm="12">
                <Switch>
                  <Route path="/movie/:id/details"
                         render={() =>
                           <MovieDetails
                             movie={movie}
                             isLoading={isLoading}
                           />}/>
                  <Route path="/movie/:id/videos" component={MovieVideos}/>
                  <Route path="/movie/:id/credits" component={MovieCredits}/>
                  <Redirect to={`/movie/${this.props.match.params.id}/details`}/>
                </Switch>
              </Col>
            </Row>
          </div>

        }

      </div>

    );
  }
};

export default MoviePage

