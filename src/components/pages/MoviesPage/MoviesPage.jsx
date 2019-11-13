import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";


export default class MoviesPage extends React.Component {
  constructor() {
    super()

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        year_by: "",
        with_genres : []
      },
      page: 1,
      total_pages: "",
    }
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

  render() {
    const {
      filters,
      page,
      total_pages
    } = this.state;
    return (
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
              // user={user}
              // session_id={session_id}
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              onChangeTotalPages={this.onChangeTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
