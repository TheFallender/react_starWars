import React, {useState, useEffect} from 'react';
import axiosAPI from '../../apis/axiosAPI';

//Style
import '../Style.css';


//Login JSX
const Search = props => {
    //Hooks for managing the state of the typed text
    const [typedSearch, setTypedSearch] = useState("");
    const [searchType, setSearchType] = useState("films");

    //Handler to call the Query
    const submitHandler = (event) => {
        //Prevent page change
        event.preventDefault();

        //Lazy request the query
        axiosAPI.get(`/${searchType}/`, {
            params: {
                search: typedSearch
            }
        }).then(response => {
            props.updateResponse(response, searchType);
        });

        //Prevent page change
        return false;
    }

    useEffect(() => {
        axiosAPI.get(`/${searchType}/`, {
            params: {
                search: typedSearch
            }
        }).then(response => {
            props.updateResponse(response, searchType);
        });
        // eslint-disable-next-line 
    }, [])

    //Return
    return (
        <div className="Search">
            <form className="SearchForm" onSubmit={(event) => submitHandler(event)}>
                <label>Search:</label>
                <input
                    className="SearchInput"
                    type="text"
                    placeholder="Something"
                    value={typedSearch}
                    onChange={(e) => setTypedSearch(e.target.value)}/>
                <select onChange={(e) => setSearchType(e.target.value)}>
                    <option value="films">Films</option>
                    <option value="people">People</option>
                    <option value="planets">Planets</option>
                </select>
                <button className="SearchButton clickable" type="submit">Submit</button>
                <input type="submit" hidden/>
            </form>
        </div>
    );
}



export default Search;