import { createRoot } from 'react-dom/client'; 
import React from 'react';
import Dashboard from './components/Dashboard'

const App = () => {
	debugger
	return <> 
		<h1>Vizualizacia linky - admin panel</h1>
		<Dashboard/>
	</>
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>);
