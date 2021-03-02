import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

import '../styles/global.css';

function MyApp ({ Component, pageProps }) {
	return (
		<AuthProvider usernameGithub={pageProps.usernameGithub}>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
