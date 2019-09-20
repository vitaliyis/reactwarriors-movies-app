import React from "react";
import SortBy from "./SortBy";
import YearBy from "./YearBy";
import Pagination from "./Pagination";
import GenresBy from "./GenresBy";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year_by, genres_by },
      page,
      onChangeFilters,
      onChangePage,
      totalPages,
      onResetFilters,
      onChangeGenres
    } = this.props
    return (
      <form className="mb-3">
        <SortBy
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}
        />
        <YearBy
          year_by={year_by}
          onChangeFilters={onChangeFilters}
        />
        <Pagination
          page={page}
          onChangePage={onChangePage}
          totalPages={totalPages}
        />
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={onResetFilters}
        >
          Сбросить фильтры
        </button>
        <GenresBy
          genres_by={genres_by}
          onChangeGenres={onChangeGenres}
        />
      </form>
    );
  }
}
