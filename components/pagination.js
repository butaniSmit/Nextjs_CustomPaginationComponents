import React, { Component } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  recordsPerPage,
  totallenght,
  totalRecords,
  maxVisibleButtons,
  onPageChanged,
  onChangeRecordsPerPage,
}) => {
  const perPageArr = [10, 20, 30, 40, 50];
  const isInFirstPage = () => {
    return currentPage === 1;
  };
  const isInLastPage = () => {
    if (totalPages === 0) {
      return true;
    }
    return currentPage === totalPages;
  };
  const startPage = () => {
    // When on the first page
    if (currentPage === 1) {
      return 1;
    }
    // When on the last page
    if (totalPages < maxVisibleButtons) {
      return 1;
    }
    if (currentPage === totalPages) {
      return totalPages - maxVisibleButtons + 1;
    }
    // When in between
    return currentPage - 1;
  };
  const endPage = () => {
    if (totalPages === 0) {
      return 1;
    }
    if (totalPages < maxVisibleButtons) {
      return totalPages;
    }
    return Math.min(startPage() + maxVisibleButtons - 1, totalPages);
  };

  const onClickFirstPage = () => {
    if (isInFirstPage()) {
      return false;
    }
    onPageChanged(1);
  };
  const onClickPreviousPage = () => {
    if (isInFirstPage()) {
      return false;
    }
    onPageChanged(currentPage - 1);
  };
  const onClickPage = (page) => {
    onPageChanged(page);
  };
  const onClickNextPage = () => {
    if (isInLastPage()) {
      return false;
    }
    onPageChanged(currentPage + 1);
  };
  const onClickLastPage = () => {
    if (isInLastPage()) {
      return false;
    }
    onPageChanged(totalPages);
  };
  const isPageActive = (page) => {
    return currentPage === page;
  };
  var pages = [];
  for (let i = startPage(); i <= endPage(); i++) {
    pages.push(
      <li key={i} className="pagination-item">
        <button
          onClick={() => {
            onClickPage(i);
          }}
          className={isPageActive(i) ? "active" : ""}
        >
          {i}
        </button>
      </li>
    );
  }
  return (
    <>
      <div className="showing">
        showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
        {(currentPage - 1) * recordsPerPage + totallenght} of {totalRecords}{" "}
        entries
        <div className="showitem">
          Show Items:
          <select
            onChange={(e) => {
              onChangeRecordsPerPage(e);
            }}
          >
            {perPageArr?.map((items, index) => {
              return <option value={items}>{items}</option>;
            })}
          </select>
        </div>
      </div>

      <ul className="pagination">
        <li className="pagination-item">
          <button
            onClick={() => onClickFirstPage()}
            className={isInFirstPage() ? "disabled" : ""}
            disabled={isInFirstPage()}
          >
            First
          </button>
        </li>
        <li className="pagination-item">
          <button
            onClick={() => onClickPreviousPage()}
            className={isInFirstPage() ? "disabled" : ""}
            disabled={isInFirstPage()}
          >
            «
          </button>
        </li>
        {pages}
        <li className="pagination-item">
          <button
            onClick={() => onClickNextPage()}
            className={isInLastPage() ? "disabled" : ""}
            disabled={isInLastPage()}
          >
            »
          </button>
        </li>
        <li className="pagination-item">
          <button
            onClick={() => onClickLastPage()}
            className={isInLastPage() ? "disabled" : ""}
            disabled={isInLastPage()}
          >
            Last
          </button>
        </li>
      </ul>
    </>
  );
};
export default Pagination;
