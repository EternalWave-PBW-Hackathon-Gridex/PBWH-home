import React from "react";
import { Pagination } from "@mui/material";

function usePagination(pageCount, handlePageCallback) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const maxPage = pageCount;

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  };

  const handlePagination = (e, p) => {
    jump(p);
    if (typeof handlePageCallback === "function") handlePageCallback();
  };

  const component = React.useMemo(() => {
    return (
      <Pagination
        className=" flex justify-center items-center"
        count={pageCount}
        size="large"
        page={currentPage}
        onChange={handlePagination}
        sx={{
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#aa00ff",
            color: "black"
          },
          "& .MuiPaginationItem-root": {
            color: "white"
          }
        }}
      />
    );
  }, [pageCount, currentPage]);

  return { next, prev, jump, currentPage, maxPage, component };
}

export default usePagination;
