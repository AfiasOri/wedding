import React, { useReducer, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

const cmpr = (a, b, col) => (a[col] < b[col] ? -1 : a[col] > b[col] ? 1 : 0);

const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_SORT':
			if (state.column === action.column) {
				return {
					...state,
					data: state.data.reverse(),
					direction: state.direction === 'ascending' ? 'descending' : 'ascending',
				};
			}

			return {
				column: action.column,
				data: [...state.data.sort((a, b) => cmpr(a, b, action.column))],
				direction: 'ascending',
			};

		case 'NEW_ITEMS':
			return { ...state, data: action.data };
		default:
			throw new Error();
	}
};

export default ({ items, color }) => {
	const initialState = { column: null, data: items, direction: null };
	const [state, dispatch] = useReducer(reducer, initialState);
	const { column, data, direction } = state;

	useEffect(() => {
		dispatch({ type: 'NEW_ITEMS', data: items });
	}, [items]);

	return (
		<Table striped celled sortable color={color}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell
						textAlign="center"
						sorted={column === '#' ? direction : null}
						onClick={() => dispatch({ type: 'CHANGE_SORT', column: '#' })}>
						#
					</Table.HeaderCell>

					<Table.HeaderCell
						textAlign="center"
						sorted={column === 'name' ? direction : null}
						onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}>
						מוזמנים
					</Table.HeaderCell>

					<Table.HeaderCell
						textAlign="center"
						sorted={column === 'guests' ? direction : null}
						onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'guests' })}>
						כמות סועדים
					</Table.HeaderCell>

					<Table.HeaderCell
						textAlign="center"
						sorted={column === 'side' ? direction : null}
						onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'side' })}>
						צד
					</Table.HeaderCell>

					<Table.HeaderCell
						textAlign="center"
						sorted={column === 'gift' ? direction : null}
						onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'gift' })}>
						סכום מתנה
					</Table.HeaderCell>

					<Table.HeaderCell textAlign="center">ממוצע לסועד</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{data.map(({ name, guests, side, gift }, i) => {
					const formattedGift = gift.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '₪';
					const formattedAverage = guests
						? (gift / guests).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '₪'
						: formattedGift;

					return (
						<Table.Row key={i}>
							<Table.Cell textAlign="center">{i + 1}</Table.Cell>
							<Table.Cell textAlign="center">{name}</Table.Cell>
							<Table.Cell textAlign="center">{guests}</Table.Cell>
							<Table.Cell textAlign="center">{side || '-'}</Table.Cell>
							<Table.Cell textAlign="center">{formattedGift}</Table.Cell>
							<Table.Cell textAlign="center">{formattedAverage}</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>

			<Table.Footer>
				<Table.Row>
					<Table.HeaderCell colSpan="6" textAlign="center">
						Totals
					</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.Cell textAlign="center">{items.length}</Table.Cell>
					<Table.Cell textAlign="center">-</Table.Cell>
					<Table.Cell textAlign="center">
						{items.reduce((a, c) => a + c.guests, 0)}
					</Table.Cell>
					<Table.Cell textAlign="center">-</Table.Cell>
					<Table.Cell textAlign="center">
						{items
							.reduce((a, c) => a + c.gift, 0)
							.toFixed(2)
							.replace(/\d(?=(\d{3})+\.)/g, '$&,')}
						₪
					</Table.Cell>
					<Table.Cell textAlign="center">
						{(
							items.reduce((a, c) => a + c.gift, 0) /
							items.reduce((a, c) => a + c.guests, 0)
						)
							.toFixed(2)
							.replace(/\d(?=(\d{3})+\.)/g, '$&,')}
						₪
					</Table.Cell>
				</Table.Row>
			</Table.Footer>
		</Table>
	);
};
