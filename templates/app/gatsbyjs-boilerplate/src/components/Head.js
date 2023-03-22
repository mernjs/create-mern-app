import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
	return (
		<>
			<Helmet>
				<title>{title} Create MERN App</title>
				<meta name="description" content="Create MERN App provide boilerplates for building Web App, Mobile App, Desktop App, Chrome Extension & NPM Package Development in JavaScript." />
			</Helmet>
		</>
	)
}

export default Head;