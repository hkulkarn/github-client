import React, { useState, useMemo } from 'react';
import ReactModal from 'react-modal';
import iterateobject from '../iterateobject';
import SingleEvent from './SingleEvent';

const ListEvents = ({ events }) => {
	const [eventType, setEventType] = useState('');
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeEvent, setActiveEvent] = useState();

	const filterEvents = () => {
		return events.filter((event) => event.type === eventType);
	};

	const getEvents = useMemo(() => {
		if (!events) return;
		const options = Object.keys(
			events.reduce(
				(prev, curr) => ({
					...prev,
					[curr.type]: 0,
				}),
				{}
			)
		);
		setEventType(options[0]);
		return options;
		// eslint-disable-next-line
	}, [events]);
	return (
		<>
			<div style={{ margin: '10px 0' }}>
				<select
					onChange={(e) => {
						setEventType(e.target.value);
					}}
					value={eventType}
					name='eventType'
					style={{ padding: '10px' }}
				>
					{getEvents.map((event) => (
						<option value={event}>{event}</option>
					))}
				</select>
			</div>

			{filterEvents(events).map((event) => (
				<div
					onClick={(e) => {
						setActiveEvent(event);
						setModalOpen(true);
					}}
				>
					<SingleEvent event={event} key={event.id} />
				</div>
			))}

			<ReactModal
				isOpen={isModalOpen}
				onRequestClose={() => setModalOpen(false)}
				contentLabel='Example Modal'
			>
				<button onClick={() => setModalOpen(false)}>close</button>
				{activeEvent && iterateobject(activeEvent.payload)}
			</ReactModal>
		</>
	);
};

export default ListEvents;
