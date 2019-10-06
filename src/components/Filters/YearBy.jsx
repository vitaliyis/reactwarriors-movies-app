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

  getYearList = (begin, end) => {   //возвращает массив годов в диапозоне
      let yearList = []
      for (let i = end; i >= begin; i--) {
      yearList.push(i)
      }
      return yearList
  }

  // getOptions(begin, end) {
  //   let yearList = []
  //   for (let i = end; i >= begin; i--) {
  //     yearList.push(<option key={i} value={i}>{i}</option>)
  //   }
  //   return yearList
  // }

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
    const { year_by, onChangeFilters, options } = this.props
    const yearList = this.getYearList(options.begin, options.end)
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
          {yearList.map(year => (
            <option key={year} value={year}>{year}</option>
            ))
          }
        </select>
      </div>
      )
  }
}