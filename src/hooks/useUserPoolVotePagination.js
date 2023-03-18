import React from "react";

function useUserPoolVotePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = React.useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [currentPage, data]);

  const allData = React.useMemo(() => {
    return data;
  }, [data]);

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

  return { next, prev, jump, allData, currentData, currentPage, maxPage };
}

export default useUserPoolVotePagination;
