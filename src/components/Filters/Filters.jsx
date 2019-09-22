import React from "react";
import SortBy from "./SortBy";
import YearBy from "./YearBy";
import Pagination from "./Pagination";
import GenresBy from "./GenresBy";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year_by, with_genres },
      page,
      onChangeFilters,
      onChangePage,
      totalPages,
      onResetFilters,
    } = this.props
    return (
      <form className="mb-3">
        <button
          type="button"
          className="btn btn-danger mb-2 mt-2"
          onClick={onResetFilters}
        >
          Сбросить фильтры
        </button>
        <SortBy
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}
        />
        <YearBy
          year_by={year_by}
          onChangeFilters={onChangeFilters}
        />
        <GenresBy
          with_genres={with_genres}
          onChangeFilters={onChangeFilters}
        />
        <Pagination
          page={page}
          onChangePage={onChangePage}
          totalPages={totalPages}
        />
      </form>
    );
  }
}
