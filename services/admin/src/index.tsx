import { sum } from '@packages/shared';

console.log('sum(1, 2) ==>', sum(1, 2));

import React from 'react';
import App from './components/App';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
