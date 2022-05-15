//PAGINATION BAR COMPONENT
import "./CreatePagination.scss";

function CreatePagination({
  count,
  itemPerPage,
  setSkip,
  currentPage,
  setCurrentPage,
}) {
  //how much pages do we have?
  const pageNumber = Math.ceil(count / itemPerPage);
  // create array with all values from 1 to pageNumber
  let pagination = [];
  for (let i = 1; i <= pageNumber; i++) {
    pagination[i] = i;
  }
  //diplay pagination component
  return (
    <div className="pagination-bar">
      {pagination.map((item) => {
        // map on the array
        return (
          <div key={item}>
            {item === currentPage ? (
              <button
                className="actual-page"
                key={item}
                onClick={() => {
                  // when click on a number, change current page and skip to acutalize the request
                  setSkip((item - 1) * itemPerPage);
                  setCurrentPage(item);
                }}
              >
                {item}
              </button>
            ) : (currentPage - 1 <= item) & (item <= currentPage + 1) ||
              item === 1 ||
              item === pageNumber ? (
              <button
                key={item}
                onClick={() => {
                  // when click on a number, change current page and skip to acutalize the request
                  setSkip((item - 1) * itemPerPage);
                  setCurrentPage(item);
                }}
              >
                {item}
              </button>
            ) : item === currentPage - 2 || item === currentPage + 2 ? (
              //stylising pgination bar with ""..."" between current pages and extremities
              <p>...</p>
            ) : (
              // dont display all other buttons
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
