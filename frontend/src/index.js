import { createRoot } from 'react-dom/client'; 
import React from 'react';

import Vis from './components/Vis';

const App = () => {
	return <> 
		<h1>Vizualizacia linky</h1>
		<Vis/>
	</>
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>);
