// import { useState } from "react";

function CreatePagination({
  count,
  itemPerPage,
  setSkip,
  currentPage,
  setCurrentPage,
}) {
  const pageNumber = Math.ceil(count / itemPerPage);
  let pagination = [];

  for (let i = 1; i <= pageNumber; i++) {
    pagination[i] = i;
  }

  return (
    <div style={{ display: "flex" }}>
      {pagination.map((item) => {
        return (
          <div key={item}>
            {(currentPage - 2 <= item) & (item <= currentPage + 2) ||
            item === 1 ||
            item === pageNumber ? (
              <button
                key={item}
                onClick={() => {
                  setSkip((item - 1) * itemPerPage);
                  setCurrentPage(item);
                }}
              >
                {item}
              </button>
            ) : item === currentPage - 3 || item === currentPage + 3 ? (
              <p>...</p>
            ) : (
              <button
                key={item}
                style={{ display: "none" }}
                onClick={() => {
                  setSkip((item - 1) * itemPerPage);
                  setCurrentPage(item);
                }}
              >
                {item}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CreatePagination;
