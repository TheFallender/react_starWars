import React from 'react';

//Style
import '../Style.css'

const Planet = props => {
    //Props
    const {
        data,
    } = props;

    //Return
    return (
        <div className="Planet">
            <h3 className="shortH3">{data.name}</h3>
            <p className="shortP"><b>Population:</b> {data.population}</p>
            <p className="shortP"><b>Terrain:</b> {data.terrain}</p>
            <p className="shortP"><b>Orbital period:</b>{data.orbital_period}</p>
        </div>
    );
}

export default Planet;
