import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./pagination";
import SecondPagination from "./second_pagination/Pagination";

const Table = () => {
  const [listItems, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [enterpageno, setEnterPageno] = useState("");

  const loadListItem = async() => {
   await axios
      .get(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${recordsPerPage}`
      )
      .then((response) => {
        const totalPages = Math.ceil(
          response.data.totalPassengers / recordsPerPage - 1
        ); // Calculate total records
        setListItem(response.data.data);
        setTotalPages(totalPages);
        setTotalRecords(response.data.totalPassengers);
      });
  };

  const onChangeRecordsPerPage = (event) => {
    setRecordsPerPage(parseInt(event.target.value));
    setPage(1);
  };

  const gotoPage = () => {
    if (!isNaN(parseInt(enterpageno))) {
      if (enterpageno > totalPages) {
        alert(`Data not found`);
      } else if (enterpageno <= totalPages) {
        setPage(parseInt(enterpageno));
      }
      setEnterPageno("");
    }
  };

  const onPageChanged = (page) => {
    setPage(page);
  };

  const inputPageChange = (e) => {
    if (!isNaN(parseInt(e.target.value))) {
      setEnterPageno(parseInt(e.target.value));
    }
  };
  console.log(totalPages);
  useEffect(() => {
    loadListItem();
  }, [recordsPerPage, page]);
  return (
    <>
      <div className="App">
        <h2>React Pagination</h2>
        <ul className="flex-container">
          {listItems.map((item, index) => {
            return (
              <li key={index} className="flex-item">
                <h4>Passenger: {item.name}</h4>
                <h4>Airline: {item.airline[0] && item.airline[0].name}</h4>
                <h4>Country: {item.airline[0] && item.airline[0].country}</h4>
              </li>
            );
          })}
        </ul>
        <ul className="showItems">
          <li>
            Go to Page{" "}
            <input
              type="text"
              value={enterpageno}
              onChange={(e) => {
                inputPageChange(e);
              }}
            />
            <button type="button" onClick={() => gotoPage()}>
              Go
            </button>
          </li>
        </ul>
        {listItems?.length > 0 ? (
          <>
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              recordsPerPage={recordsPerPage}
              totallenght={listItems?.length}
              totalRecords={totalRecords}
              maxVisibleButtons={3}
              onPageChanged={(e) => onPageChanged(e)}
              onChangeRecordsPerPage={(e) => onChangeRecordsPerPage(e)}
            />
          </>
        ) : (
          <li className="flex-item center">No Record Found</li>
        )}
      </div>
      <SecondPagination
        currentPage={page}
        totalCount={totalRecords}
        pageSize={recordsPerPage}
        onPageChange={(page) => onPageChanged(page)}
      />
    </>
  );
};

export default Table;
