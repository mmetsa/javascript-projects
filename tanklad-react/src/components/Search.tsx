import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = (props: { onChange: Function }) => {
    return (
        <div className="row input-group">
            <div className="col-10 form p-0">
                <input
                    type="search"
                    id="searchForm"
                    onChange={(e) => props.onChange(e)}
                    placeholder="Search for gas stations"
                    className="form-control"
                />
            </div>
            <button type="button" className="col-2 btn btn-primary btn-sm">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default Search;
