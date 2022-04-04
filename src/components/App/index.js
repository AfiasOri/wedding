import React, { useState } from 'react';
import { Container, Header, Icon, Divider, Button, Segment } from 'semantic-ui-react';

import Search from 'components/Search';
import Table from 'components/Table';

const brit = require('seed/brit.json');
const wedding = require('seed/wedding.json');
const maya = require('seed/maya.json');

export default () => {
	const [event, setEvent] = useState('wedding');
	const eventParams = {
		wedding: {
			color: 'violet',
			data: wedding,
		},
		brit: {
			color: 'teal',
			data: brit,
		},
		maya: {
			color: 'orange',
			data: maya,
		}
	};

	return (
		<Container>
			<Divider hidden />
			<Header as="h1" textAlign="center" color="olive" icon>
				<Icon name="dollar sign" circular />
				JUBBOT
			</Header>
			<Divider hidden />
			<Segment textAlign="center">
				<Button color={eventParams.maya.color} onClick={() => setEvent('maya')}>
					מאיה
				</Button>
				<Button color={eventParams.brit.color} onClick={() => setEvent('brit')}>
					ברית
				</Button>
				<Button color={eventParams.wedding.color} onClick={() => setEvent('wedding')}>
					חתונה
				</Button>
			</Segment>
			<Divider hidden />
			<Search items={eventParams[event].data} />
			<Header color={eventParams[event].color} textAlign="center">
				כל המוזמנים
			</Header>
			<Table items={eventParams[event].data} color={eventParams[event].color} />
		</Container>
	);
};
