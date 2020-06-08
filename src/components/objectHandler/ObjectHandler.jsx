import React, {useState, useEffect} from 'react';
import {cloneDeep} from 'lodash';

//Style
import '../Style.css';
import Axios from 'axios';
import People from '../objects/People';
import Planet from '../objects/Planet';
import Film from '../objects/Film';


//Header
const ObjectHandler = props => {
    //Props
    const {
        response,
        type,
    } = props;

    //Hooks
    const [listOfObjects, setListOfObjects] = useState(null);

    //Component did mount
    useEffect(() => {
        setQuery(response, type)
        // eslint-disable-next-line
    }, [response, type])

    const setQuery = (response, type) => {
        //Search assign
        let search = response.data.results ? response.data.results : response.data;

        //Transform single element to Array
        if (!search.length) {
            search = Array.from([cloneDeep(search)]);
        }

        //Map the response
        setListOfObjects(search.map((element) => {
            let result = null;
            switch(type) {
                case 'people':
                    result =
                    <People
                        key={"People" + element.url}
                        data={element}
                        setResponse={newQuery}
                    />;
                    break;
                case 'films':
                    result =
                    <Film
                        key={"Film" + element.url}
                        data={element}
                        setResponse={newQuery}
                    />;
                    break;
                case 'planets':
                    result =
                    <Planet
                        key={"Planet" + element.url}
                        data={element}
                        setResponse={newQuery}
                    />;
                    break;
                default:
                    result = null;
            }
            return result;
        }));
    }

    //New query
    const newQuery = (query, type) => {
        Axios.get(query, {}).then(response => {
            setQuery(response, type)
        });
    }
    

    //Return
    return (
        <div className="ObjectHandler">
            {listOfObjects}
        </div>
    );
}

export default ObjectHandler;