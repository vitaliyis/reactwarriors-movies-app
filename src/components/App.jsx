import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import {API_KEY_3, API_URL, fetchApi} from "../api/api";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "popularity.desc",
        year_by: "",
        with_genres : []
      },
      page: 1,
      total_pages: ""
    }
  }

  updateUser = user => {
    this.setState({
      user
    });
  }

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    })
    this.setState({
      session_id
    });
  }

  onChangeFilters = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState(state => ({
      filters: {
        ...state.filters,
        [name]: value
      }
    }))
  }

  onChangePage = page => {
    this.setState({
      page
    })
  }

  onChangeTotalPages = totalPages => {
    this.setState({
      total_pages: totalPages
    })
  }

  onResetFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        year_by: "",
        with_genres : []
      },
      page: 1,
      total_pages: ""
    })
  }

  componentDidMount() {
    const session_id = cookies.get("session_id")
    if (session_id) {
      fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
        .then(user => {
          this.updateUser(user)
        })
    }
  }


  render() {
    const {filters, page, total_pages, user} = this.state;
    return (
      <div>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
        />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    page={page}
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    onChangePage={this.onChangePage}
                    totalPages={total_pages}
                    onResetFilters={this.onResetFilters}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                page={page}
                onChangePage={this.onChangePage}
                onChangeTotalPages={this.onChangeTotalPages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
