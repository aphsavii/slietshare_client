import { PropTypes } from "prop-types";
const QsSearch = ({  setSearchText, disabled=false }) => {
  return (
    <div className="qs-search">
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-lightGray bg-white h-10 md:h-12 px-5 pr-16 rounded-lg text-sm focus:outline-primary focus:border-none w-72 md:w-96 "
          type="search"
          name="search"
          placeholder="Search"
          // value={searchText.trim()}
          onChange={(e) => setSearchText(e.target.value.trim())}
          autoComplete="off"
        />
        <button  className="absolute right-0 top-0 mt-5 mr-4"  disabled={disabled}>
          <svg
                className="text-primary h-4 w-4 md:h-5 md:w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      <p className="italic text-gray-300 text-xs md:text-sm text-center mt-1" >Note: You can search by Subject Code or Subject Name </p>
    </div>
  );
};

QsSearch.propTypes = {
  // searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default QsSearch;
