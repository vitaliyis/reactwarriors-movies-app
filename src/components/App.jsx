import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        year_by: "",
        genres_by : []
      },
      page: 1,
      total_pages: ""
    }
  }

  onChangeFilters = event => {
    const newFilters = {...this.state.filters,
      [event.target.name]: event.target.value
    }
    this.setState({
      filters: newFilters
    })
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
    // let a = document.querySelectorAll('.form-check-input')
    //   a.forEach(item => {item.checked = false})
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        year_by: "",
        genres_by : []
      },
      page: 1,
      total_pages: ""
    })
  }

  onChangeGenres = (event) => {
    let a = [...this.state.filters.genres_by]   // записали предыдущие данные
    let target = a.indexOf(event.target.value)
    if ( target === -1) {
      a.push(event.target.value)
    } else {
      a.splice(target, 1)
    }

    this.setState({
      filters: {...this.state.filters, genres_by : a}
    })


  }

  render() {
    const {filters, page, total_pages} = this.state;
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
                  onChangeGenres={this.onChangeGenres}
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
    );
  }
}
