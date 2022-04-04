import React, { useState, useEffect } from 'react';
import { Input, Header } from 'semantic-ui-react';
import useDebounce from 'hooks/useDebounce';

import Table from 'components/Table';

export default ({ items }) => {
	const initialState = { loading: false, value: '', results: [] };
	const [state, setState] = useState(initialState);
	const debouncedValue = useDebounce(state.value, 500);

	useEffect(() => {
		let results;
		if (debouncedValue) {
			setState(prev => ({ ...prev, loading: true }));
			results = [...items.filter(el => el.name.includes(state.value))];
			if (results.length) setState(prev => ({ ...prev, loading: false, results: results }));
		} else {
			setState(prev => ({ ...prev, results: [] }));
		}
	}, [debouncedValue, items]);

	return (
		<>
			<Input
				fluid
				loading={state.loading}
				icon="search"
				iconPosition="left"
				placeholder="חפש מוזמנים"
				value={state.value}
				onChange={e => setState({ ...state, value: e.target.value })}
			/>

			{state.results.length ? (
				<>
					<Header color="purple" textAlign="center">
						תוצאות
					</Header>
					<Table items={state.results} color="purple" />
				</>
			) : null}
		</>
	);
};
