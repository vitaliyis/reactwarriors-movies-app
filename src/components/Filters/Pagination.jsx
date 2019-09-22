import React from 'react'

export default class Pagination extends React.Component {
  render() {
    const { page, onChangePage, totalPages } = this.props
    return (
      <div className="mt-3">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-success"
            disabled={page === 1}
            onClick={() => onChangePage(page - 1)}
          >Назад
          </button>
          <button
            type="button"
            className="btn btn-success"
            disabled={page === totalPages}
            onClick={() => onChangePage(page + 1)}
          >Вперед
          </button>
        </div>
        <div className="mt-2">
          <label>Старницы: </label>
          <span className="ml-3 mr-3">{page}</span>
          {totalPages ? (<React.Fragment>
            из
            <span className="ml-3">{totalPages}</span>
          </React.Fragment>) : null}

        </div>

      </div>

    )
  }
}