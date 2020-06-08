import React, {useState} from 'react';

//Components
import Header from './components/header/Header'

//App.css
import './App.css';
import './components/Style.css'
import ObjectHandler from './components/objectHandler/ObjectHandler';

function App() {
	//Hook for the data loaded
	const [response, setResponse] = useState(null);

	const setObjectHandler = (response, type) => {
		setResponse(<ObjectHandler response={response} type={type}/>)
	}

	//Return the data
	return (
		<div className="App">
			<Header siteName={"Star Wars"} updateResponse={setObjectHandler}/>
			<div className="Content">
				{response ?
					response
				:
					<p><b>Search Something</b></p>
				}
			</div>
		</div>
	);
}

export default App;
