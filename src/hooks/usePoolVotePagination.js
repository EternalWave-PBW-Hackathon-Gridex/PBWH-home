import React from "react";

function usePoolVotePagination(pageCount) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const maxPage = pageCount;

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentPage, maxPage };
}

export default usePoolVotePagination;
