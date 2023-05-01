import { createRoot } from 'react-dom/client'; 
import React from 'react';
import { Input } from '@lib/bundle'


const App = () => {
	return <> 
		<h1>Vizualizacia linky - admin panel</h1>
		<Input/>
	</>
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>);
