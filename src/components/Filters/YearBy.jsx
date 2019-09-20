import React from 'react'
// import PropTypes from "prop-types"

export default class YearBy extends React.Component {
  static defaultProps = {
    options :
      {
        begin: 1900,
        end: 2019
      }

  }

  getOptions(begin, end) {
    let a = []
    for (let i = end; i >= begin; i--) {
      a.push(<option key={i} value={i}>{i}</option>)
    }
    return a
  }

  render() {
    const { year_by, onChangeFilters, options } = this.props
    return (
      <div className="form-group">
        <label htmlFor="year_by">Год</label>
        <select
          name="year_by"
          id="year_by"
          className="form-control"
          value={year_by}
          onChange={onChangeFilters}
        >
          <option value="">Ничего</option>
          {this.getOptions(options.begin, options.end)}
        </select>
      </div>
      )
  }
}