import React, { useState } from 'react';

//Style
import '../Style.css'
import Axios from 'axios';

const People = props => {
    //Props
    const {
        data,
        setResponse,
    } = props;

    //Hooks
    const [films, setFilms] = useState(null);
    const [homeworld, setHomeworld] = useState(null);
    const [filmsShown, setFilmsShown] = useState(false);
    const [homeworldShown, setHomeworldShown] = useState(false);

    //Change Films
    const filmsUpdate = () => {
        //Set films
        setFilmsShown(!filmsShown);

        //If Films not cached, load
        if (!films) {
            //Promise all the films
            let promiseArr = [];

            data.films.forEach(element => {
                promiseArr.push(Axios.get(element.replace("http://", "https://")));
            });

            Promise.all(promiseArr).then(values => {
                setFilms(values.map(element => 
                    <div className="FilmShort" key={data.url + element.data.url}>
                        <p className="shortP">
                            <b className="clickable" onClick={() => setResponse(element.data.url, "films")}>Film {element.data.episode_id} - {element.data.title}</b>
                        </p>
                    </div>
                ));
            })
        }
    }

    //Change Films
    const homeWorldUpdate = () => {
        //Set films
        setHomeworldShown(!homeworldShown);


        console.log("DAFAK")
        //If Films not cached, load
        if (!homeworld) {
            Axios.get(data.homeworld.replace("http://", "https://")).then(response =>
                setHomeworld(
                    <div className="PlanetShort" key={data.url + response.data.url}>
                        <p className="shortP">
                            <b className="clickable" onClick={() => setResponse(response.data.url, "planets")}>{response.data.name}</b>
                        </p>
                    </div>
                )
            );
        }
            
    }
    
    //Return
    return (
        <div className="People">
            <h3 className="shortH3">{data.name}</h3>
            <p className="shortP"><b>Gender:</b> {data.gender}</p>
            <p className="shortP"><b>Birth:</b> {data.birth_year}</p>
            <div className="PeopleHomeworld">
                <button onClick={() => homeWorldUpdate()}>
                    <b>{homeworldShown ? "Hide Homeworld" : "Show Homeworld"}</b>
                </button>
                {homeworldShown ? homeworld : null}
            </div>
            <div className="PeopleFilms">
                <button onClick={() => filmsUpdate()}>
                    <b>{filmsShown ? "Hide Films" : "Show Films"}</b>
                </button>
                {filmsShown ? films : null}
            </div>
        </div>
    );
}

export default People;
