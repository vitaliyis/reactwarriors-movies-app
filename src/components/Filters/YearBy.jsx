import React from 'react'
// import PropTypes from "prop-types"

export default class YearBy extends React.PureComponent {
  static defaultProps = {
    options :
      {
        begin: 1900,
        end: 2019
      }
  }

  getOptions(begin, end) {
    let yearList = []
    for (let i = end; i >= begin; i--) {
      yearList.push(<option key={i} value={i}>{i}</option>)
    }
    return yearList
  }

  // в этом методе решается когда обновлять компонент а когда нет
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.value !== this.props.value) {
  //     return true
  //   } else {
  //     return false
  //   }
  //
  // }

  render() {
    console.log('YearBy')
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
          <option value="">Выберите год</option>
          {this.getOptions(options.begin, options.end)}
        </select>
      </div>
      )
  }
}