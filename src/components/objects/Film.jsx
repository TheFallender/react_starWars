import React from 'react';

//Style
import '../Style.css'

const Film = props => {
    //Props
    const {
        data,
    } = props;

    //Return
    return (
        <div className="Film">
            <h3 className="shortH3">{data.title}</h3>
            <p className="shortP"><b>Episode:</b> {data.episode_id}</p>
        </div>
    );
}

export default Film;
