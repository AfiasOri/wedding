import React from 'react';
import { Container, Header, Icon, Divider } from 'semantic-ui-react';

import Search from 'components/Search';
import Table from 'components/Table';
const seed = require('seed.json');

export default () => (
	<Container>
		<Divider hidden />
		<a href="/">
			<Header as="h1" textAlign="center" color="teal" icon>
				<Icon name="dollar sign" circular />
				Wedding
			</Header>
		</a>
		<Search items={seed} />
		<Header color="violet" textAlign="center">
			כל המוזמנים
		</Header>
		<Table items={seed} color="violet" />
	</Container>
);
